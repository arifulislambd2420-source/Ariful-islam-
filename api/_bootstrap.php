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
