// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.25.0
// source: alerts.sql

package sqlc

import (
	"context"

	"github.com/jackc/pgx/v5/pgtype"
)

const insertAlert = `-- name: InsertAlert :exec
INSERT INTO alerts (website_id, type, message, resolved)
VALUES ($1, $2, $3, $4)
`

type InsertAlertParams struct {
	WebsiteID int32
	Type      pgtype.Text
	Message   pgtype.Text
	Resolved  pgtype.Bool
}

func (q *Queries) InsertAlert(ctx context.Context, arg InsertAlertParams) error {
	_, err := q.db.Exec(ctx, insertAlert,
		arg.WebsiteID,
		arg.Type,
		arg.Message,
		arg.Resolved,
	)
	return err
}

const resolveAlert = `-- name: ResolveAlert :exec
UPDATE alerts
SET resolved = TRUE
WHERE alert_id = $1
`

func (q *Queries) ResolveAlert(ctx context.Context, alertID int32) error {
	_, err := q.db.Exec(ctx, resolveAlert, alertID)
	return err
}
