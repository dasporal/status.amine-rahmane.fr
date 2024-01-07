package db

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/dasporal/status.amine-rahmane.fr/pkg/db/sqlc"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
)

type DB struct {
	Conn    *pgx.Conn
	Queries *sqlc.Queries
}

func NewDB() (*DB, error) {
	ctx := context.Background()

	databaseUrl := fmt.Sprintf("postgres://%s:%s@%s/%s",
		os.Getenv("SUPABASE_DB_USER"),
		os.Getenv("SUPABASE_DB_PASSWORD"),
		os.Getenv("SUPABASE_URL"),
		os.Getenv("SUPABASE_DB_NAME"),
	)

	dbpool, err := pgx.Connect(ctx, databaseUrl)
	if err != nil {
		return nil, fmt.Errorf("unable to connect to database: %v", err)
	}

	return &DB{
		Conn:    dbpool,
		Queries: sqlc.New(dbpool),
	}, nil
}

func (db *DB) GetAllWebsites(ctx context.Context) ([]sqlc.Website, error) {
	log.Println("### Querying all websites ###")
	return db.Queries.GetAllWebsites(ctx)
}

func (db *DB) InsertStatusCheck(ctx context.Context, website sqlc.Website, statusCheck sqlc.StatusCheck) error {
	log.Printf("Inserting status for: %s", website.Url)
	return db.Queries.InsertStatusCheck(ctx, sqlc.InsertStatusCheckParams{
		WebsiteID:    website.WebsiteID,
		StatusCode:   pgtype.Int4(statusCheck.StatusCode),
		ResponseTime: statusCheck.ResponseTime,
		Status:       pgtype.Text(statusCheck.Status),
		Details:      pgtype.Text(statusCheck.Details),
	})
}

func (db *DB) GetRecentStatusChecks(ctx context.Context, websiteID int32) ([]sqlc.GetRecentStatusChecksRow, error) {
	log.Printf("Getting status for: %d", websiteID)
	return db.Queries.GetRecentStatusChecks(ctx, websiteID)
}
