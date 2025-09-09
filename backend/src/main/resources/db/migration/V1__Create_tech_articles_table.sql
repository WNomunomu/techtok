CREATE TABLE tech_articles (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    summary TEXT NOT NULL,
    author VARCHAR(100) NOT NULL,
    source_url VARCHAR(1000) NOT NULL UNIQUE,
    published_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_tech_articles_created_at ON tech_articles(created_at);