-- Initialize the database with basic setup
CREATE DATABASE IF NOT EXISTS springdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE springdb;

-- Create a basic users table for demonstration
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert some sample data
INSERT IGNORE INTO users (username, email) VALUES 
('admin', 'admin@techtok.com'),
('user1', 'user1@example.com');