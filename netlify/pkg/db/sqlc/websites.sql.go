// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.25.0
// source: websites.sql

package sqlc

import (
	"context"

	"github.com/jackc/pgx/v5/pgtype"
)

const getAllWebsites = `-- name: GetAllWebsites :many
SELECT website_id, url, name, check_interval
FROM websites
`

func (q *Queries) GetAllWebsites(ctx context.Context) ([]Website, error) {
	rows, err := q.db.Query(ctx, getAllWebsites)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Website
	for rows.Next() {
		var i Website
		if err := rows.Scan(
			&i.WebsiteID,
			&i.Url,
			&i.Name,
			&i.CheckInterval,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const insertWebsite = `-- name: InsertWebsite :one
INSERT INTO websites (url, name, check_interval)
VALUES ($1, $2, $3)
RETURNING website_id, url, name, check_interval
`

type InsertWebsiteParams struct {
	Url           string
	Name          pgtype.Text
	CheckInterval pgtype.Int4
}

func (q *Queries) InsertWebsite(ctx context.Context, arg InsertWebsiteParams) (Website, error) {
	row := q.db.QueryRow(ctx, insertWebsite, arg.Url, arg.Name, arg.CheckInterval)
	var i Website
	err := row.Scan(
		&i.WebsiteID,
		&i.Url,
		&i.Name,
		&i.CheckInterval,
	)
	return i, err
}