-- name: InsertWebsite :one
INSERT INTO websites (url, name, check_interval)
VALUES ($1, $2, $3)
RETURNING website_id, url, name, check_interval;

-- name: GetAllWebsites :many
SELECT website_id, url, name, check_interval
FROM websites;