-- Ariful Islam portfolio — MySQL schema
-- Run once against the target database (u818052381_portfolio_db) to create tables.

SET NAMES utf8mb4;
SET time_zone = '+00:00';

-- ─── users ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
    id            INT UNSIGNED       NOT NULL AUTO_INCREMENT,
    name          VARCHAR(120)       NOT NULL,
    email         VARCHAR(190)       NOT NULL,
    password_hash VARCHAR(255)       NOT NULL,
    created_at    TIMESTAMP          NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── sessions ───────────────────────────────────────────────────────
-- Stores active login tokens (bin2hex(random_bytes(32)) → 64 hex chars).
-- Rows are validated on every protected request against expires_at.
CREATE TABLE IF NOT EXISTS sessions (
    token       CHAR(64)     NOT NULL,
    user_id     INT UNSIGNED NOT NULL,
    created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expires_at  DATETIME     NOT NULL,
    PRIMARY KEY (token),
    KEY idx_sessions_user (user_id),
    KEY idx_sessions_expires (expires_at),
    CONSTRAINT fk_sessions_user
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=ascii COLLATE=ascii_general_ci;
