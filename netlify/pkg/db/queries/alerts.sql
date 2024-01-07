-- name: InsertAlert :exec
INSERT INTO alerts (website_id, type, message, resolved)
VALUES ($1, $2, $3, $4);

-- name: ResolveAlert :exec
UPDATE alerts
SET resolved = TRUE
WHERE alert_id = $1;
