<?php
/**
 * MySQL configuration & PDO connection factory.
 *
 * NOTE: DB_PASS is intentionally left empty here — set it locally on the
 * production server (do NOT commit the real password to git).
 */

declare(strict_types=1);

// ─── Credentials ────────────────────────────────────────────────────
define('DB_HOST', 'localhost');
define('DB_NAME', 'u818052381_portfolio_db');
define('DB_USER', 'u818052381_portfolio_db');
define('DB_PASS', ''); // TODO: set real password on the server
define('DB_CHARSET', 'utf8mb4');
// ─────────────────────────────────────────────────────────────────────

/**
 * Return a shared PDO instance, throwing PDOException on failure.
 */
function db(): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $dsn = sprintf(
        'mysql:host=%s;dbname=%s;charset=%s',
        DB_HOST,
        DB_NAME,
        DB_CHARSET
    );

    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];

    $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
    return $pdo;
}
