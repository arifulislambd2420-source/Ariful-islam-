<?php
/**
 * POST /api/login.php
 * Body (JSON): { email, password }
 * Response:    { success: true, token: "…", name: "…" }
 *              { success: false, message: "…" }
 *
 * NOTE: token is generated with random_bytes(32) but NOT persisted server-side
 * yet (no sessions table exists). It's fine for the frontend to store it in
 * localStorage as a login flag, but any future endpoint that needs to *verify*
 * a token will require a `sessions` table + a lookup step.
 */

declare(strict_types=1);

require __DIR__ . '/_bootstrap.php';

require_method('POST');

$body     = read_json_body();
$email    = trim((string) ($body['email']    ?? ''));
$password = (string)        ($body['password'] ?? '');

// ─── Validation ─────────────────────────────────────────────────────
if ($email === '' || $password === '') {
    json_response([
        'success' => false,
        'message' => 'ইমেইল ও পাসওয়ার্ড — দুটোই দিতে হবে।',
    ], 400);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_response([
        'success' => false,
        'message' => 'সঠিক ইমেইল দিন।',
    ], 400);
}

// ─── Look up + verify ───────────────────────────────────────────────
try {
    $pdo  = db();
    $stmt = $pdo->prepare(
        'SELECT id, name, password_hash FROM users WHERE email = ? LIMIT 1'
    );
    $stmt->execute([$email]);
    $user = $stmt->fetch();
} catch (PDOException $e) {
    json_response([
        'success' => false,
        'message' => 'ডাটাবেস এরর — কিছুক্ষণ পর আবার চেষ্টা করুন।',
    ], 500);
}

// Constant-time-ish response: don't leak whether the email exists.
if (!$user || !password_verify($password, $user['password_hash'])) {
    json_response([
        'success' => false,
        'message' => 'ইমেইল অথবা পাসওয়ার্ড ভুল।',
    ], 401);
}

// ─── Issue session token ────────────────────────────────────────────
try {
    $token = bin2hex(random_bytes(32));
} catch (Exception $e) {
    json_response([
        'success' => false,
        'message' => 'টোকেন তৈরি করা যায়নি।',
    ], 500);
}

json_response([
    'success' => true,
    'token'   => $token,
    'name'    => $user['name'],
]);
