CREATE TABLE alerts (
    alert_id SERIAL PRIMARY KEY,
    website_id INTEGER NOT NULL REFERENCES websites(website_id),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    type VARCHAR(100),
    message TEXT,
    resolved BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_website
      FOREIGN KEY(website_id)
        REFERENCES websites(website_id)
);