
-- INKLOOM AI DATABASE

CREATE DATABASE IF NOT EXISTS inkloom_ai
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE inkloom_ai;


-- 1. SUBMISSIONS TABLE

CREATE TABLE IF NOT EXISTS submissions (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    title VARCHAR(180) NOT NULL,
    category VARCHAR(60) NOT NULL,
    owner VARCHAR(120) NOT NULL,
    content LONGTEXT NULL,

    status ENUM(
        'pending',
        'review',
        'approved',
        'revision'
    ) NOT NULL DEFAULT 'pending',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    INDEX idx_submissions_status (status),
    INDEX idx_submissions_created_at (created_at),
    INDEX idx_submissions_updated_at (updated_at),
    INDEX idx_submissions_owner (owner),
    INDEX idx_submissions_category (category)

) ENGINE=InnoDB;


-- 2. BRAND RULES TABLE

CREATE TABLE IF NOT EXISTS brand_rules (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(180) NOT NULL,
    description TEXT NOT NULL,

    active TINYINT(1) NOT NULL DEFAULT 1,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    INDEX idx_brand_rules_active (active),
    INDEX idx_brand_rules_created_at (created_at)

) ENGINE=InnoDB;


-- 3. ANALYSES TABLE

CREATE TABLE IF NOT EXISTS analyses (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,

    submission_id INT UNSIGNED NULL,

    score TINYINT UNSIGNED NOT NULL,

    finding_count INT UNSIGNED NOT NULL DEFAULT 0,

    result_json JSON NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    CONSTRAINT fk_analyses_submission
        FOREIGN KEY (submission_id)
        REFERENCES submissions(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,

    INDEX idx_analyses_submission_id (submission_id),
    INDEX idx_analyses_created_at (created_at),

    CONSTRAINT chk_analyses_score
        CHECK (score BETWEEN 0 AND 100)

) ENGINE=InnoDB;
