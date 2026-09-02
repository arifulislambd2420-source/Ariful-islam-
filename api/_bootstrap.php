<?php
/**
 * Shared bootstrap for every /api/*.php endpoint.
 * - Applies CORS headers (open origin — tighten in production).
 * - Handles the OPTIONS preflight.
 * - Provides JSON request / response helpers.
 * - Loads DB config.
 */

declare(strict_types=1);

require __DIR__ . '/config.php';

// ─── CORS ───────────────────────────────────────────────────────────
// TODO: replace '*' with the deployed frontend origin
// (e.g. 'https://arifulislambd.com') once the domain is fixed.
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Max-Age: 86400');
header('Vary: Origin');

// Preflight — respond and stop.
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    http_response_code(204);
    exit;
}

header('Content-Type: application/json; charset=utf-8');

/**
 * Decode a JSON request body into an associative array.
 * Falls back to $_POST for form-encoded submissions.
 */
function read_json_body(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false || $raw === '') {
        return $_POST;
    }
    $decoded = json_decode($raw, true);
    return is_array($decoded) ? $decoded : $_POST;
}

/**
 * Emit a JSON response and terminate.
 */
function json_response(array $payload, int $status = 200): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

/**
 * Only allow the given HTTP method; otherwise respond 405 and stop.
 */
function require_method(string $method): void
{
    if (strtoupper($_SERVER['REQUEST_METHOD'] ?? '') !== strtoupper($method)) {
        json_response(
            ['success' => false, 'message' => 'Method not allowed'],
            405
        );
    }
}

/**
 * Read the Bearer token from the Authorization header, tolerating the
 * various forms Apache / FastCGI expose it under.
 */
function read_bearer_token(): ?string
{
    $candidates = [
        $_SERVER['HTTP_AUTHORIZATION']          ?? null,
        $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? null,
    ];

    if (function_exists('getallheaders')) {
        $headers = getallheaders();
        if (is_array($headers)) {
            foreach ($headers as $k => $v) {
                if (strcasecmp($k, 'Authorization') === 0) {
                    $candidates[] = $v;
                }
            }
        }
    }

    foreach ($candidates as $raw) {
        if (!is_string($raw) || $raw === '') continue;
        if (preg_match('/^Bearer\s+([A-Za-z0-9._~\-]+)$/i', trim($raw), $m)) {
            return $m[1];
        }
    }
    return null;
}

/**
 * Require a valid, unexpired session token on the incoming request.
 * On success returns the row: ['id' => int, 'name' => string, 'email' => string].
 * On failure emits 401 and terminates — never returns.
 */
function require_auth(): array
{
    $token = read_bearer_token();
    if ($token === null || strlen($token) !== 64) {
        json_response(
            ['success' => false, 'message' => 'অনুমোদিত নন। সঠিক টোকেন দিন।'],
            401
        );
    }

    try {
        $stmt = db()->prepare(
            'SELECT u.id, u.name, u.email
             FROM sessions s
             JOIN users u ON u.id = s.user_id
             WHERE s.token = ? AND s.expires_at > NOW()
             LIMIT 1'
        );
        $stmt->execute([$token]);
        $row = $stmt->fetch();
    } catch (PDOException $e) {
        json_response(
            ['success' => false, 'message' => 'ডাটাবেস এরর।'],
            500
        );
    }

    if (!$row) {
        json_response(
            ['success' => false, 'message' => 'টোকেন অবৈধ বা মেয়াদ শেষ।'],
            401
        );
    }

    return [
        'id'    => (int) $row['id'],
        'name'  => (string) $row['name'],
        'email' => (string) $row['email'],
    ];
}
