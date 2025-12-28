ALTER TABLE tech_articles ADD COLUMN qiita_id VARCHAR(64);
ALTER TABLE tech_articles ADD COLUMN updated_at TIMESTAMP;
ALTER TABLE tech_articles ADD COLUMN stocks_count INTEGER NOT NULL DEFAULT 0;
ALTER TABLE tech_articles ADD COLUMN random_key DOUBLE PRECISION;

UPDATE tech_articles
SET random_key = random()
WHERE random_key IS NULL;

ALTER TABLE tech_articles ALTER COLUMN random_key SET NOT NULL;
ALTER TABLE tech_articles ALTER COLUMN random_key SET DEFAULT random();

CREATE UNIQUE INDEX idx_tech_articles_qiita_id ON tech_articles(qiita_id);
CREATE INDEX idx_tech_articles_published_at ON tech_articles(published_at);
CREATE INDEX idx_tech_articles_updated_at ON tech_articles(updated_at);
CREATE INDEX idx_tech_articles_stocks_count ON tech_articles(stocks_count);
CREATE INDEX idx_tech_articles_random_key ON tech_articles(random_key);
