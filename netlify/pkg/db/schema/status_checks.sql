CREATE TABLE status_checks (
    check_id SERIAL PRIMARY KEY,
    website_id INTEGER NOT NULL REFERENCES websites(website_id),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status_code INTEGER,
    response_time INTEGER, -- in milliseconds
    status VARCHAR(50),
    details TEXT,
    CONSTRAINT fk_website
      FOREIGN KEY(website_id)
        REFERENCES websites(website_id)
);
