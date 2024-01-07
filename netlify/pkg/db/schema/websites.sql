CREATE TABLE websites (
    website_id SERIAL PRIMARY KEY,
    url VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    check_interval INTEGER DEFAULT 60 -- in minutes
);
