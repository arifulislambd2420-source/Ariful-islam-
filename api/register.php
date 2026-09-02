<?php
/**
 * POST /api/register.php
 * Body (JSON): { name, email, password }
 * Response:    { success: true }
 *              { success: false, message: "..." }
 */

declare(strict_types=1);

require __DIR__ . '/_bootstrap.php';

require_method('POST');

$body     = read_json_body();
$name     = trim((string) ($body['name']     ?? ''));
$email    = trim((string) ($body['email']    ?? ''));
$password = (string)        ($body['password'] ?? '');

// ─── Validation ─────────────────────────────────────────────────────
if ($name === '' || $email === '' || $password === '') {
    json_response([
        'success' => false,
        'message' => 'নাম, ইমেইল ও পাসওয়ার্ড — তিনটাই দিতে হবে।',
    ], 400);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_response([
        'success' => false,
        'message' => 'সঠিক ইমেইল দিন।',
    ], 400);
}

if (strlen($password) < 6) {
    json_response([
        'success' => false,
        'message' => 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।',
    ], 400);
}

if (mb_strlen($name) > 120 || strlen($email) > 190) {
    json_response([
        'success' => false,
        'message' => 'নাম বা ইমেইল অনেক বড়।',
    ], 400);
}

// ─── Insert ─────────────────────────────────────────────────────────
try {
    $pdo = db();

    // Uniqueness pre-check (surfaces a friendly message before hitting the
    // UNIQUE index — the index still catches races)
    $stmt = $pdo->prepare('SELECT 1 FROM users WHERE email = ? LIMIT 1');
    $stmt->execute([$email]);
    if ($stmt->fetchColumn()) {
        json_response([
            'success' => false,
            'message' => 'এই ইমেইল দিয়ে আগে অ্যাকাউন্ট তৈরি হয়েছে।',
        ], 409);
    }

    $hash = password_hash($password, PASSWORD_DEFAULT);
    if ($hash === false) {
        json_response([
            'success' => false,
            'message' => 'সার্ভার এরর — password hash তৈরি করা যায়নি।',
        ], 500);
    }

    $stmt = $pdo->prepare(
        'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)'
    );
    $stmt->execute([$name, $email, $hash]);

    json_response(['success' => true]);
} catch (PDOException $e) {
    // 23000 = integrity constraint violation (race → duplicate email)
    if ($e->getCode() === '23000') {
        json_response([
            'success' => false,
            'message' => 'এই ইমেইল দিয়ে আগে অ্যাকাউন্ট তৈরি হয়েছে।',
        ], 409);
    }
    json_response([
        'success' => false,
        'message' => 'ডাটাবেস এরর — কিছুক্ষণ পর আবার চেষ্টা করুন।',
    ], 500);
}
