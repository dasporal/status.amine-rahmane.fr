-- name: InsertStatusCheck :exec
INSERT INTO status_checks (website_id, status_code, response_time, status, details)
VALUES ($1, $2, $3, $4, $5);

-- name: GetRecentStatusChecks :many
SELECT check_id, timestamp, status_code, response_time, status, details
FROM status_checks
WHERE website_id = $1
AND timestamp >= NOW() - '1 day'::INTERVAL
ORDER BY timestamp DESC;
