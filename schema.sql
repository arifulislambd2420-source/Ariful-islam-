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
