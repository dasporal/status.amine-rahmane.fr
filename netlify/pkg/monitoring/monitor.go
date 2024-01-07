package monitoring

import (
	"context"
	"log"
	"net/http"
	"time"

	"github.com/dasporal/status.amine-rahmane.fr/pkg/db"
	"github.com/dasporal/status.amine-rahmane.fr/pkg/db/sqlc"
	"github.com/jackc/pgx/v5/pgtype"
)

func PingWebsites() {
	log.Println("-------------- Monitoring package initialized --------------")
	ctx := context.Background()

	database, err := db.NewDB()
	if err != nil {
		log.Println(err)
	}
	defer database.Conn.Close(ctx)

	websites, err := database.GetAllWebsites(ctx)
	for _, website := range websites {
		var status, duration = ping(website)
		handleStatus(status, website, duration.Milliseconds())
		log.Println()
	}
}

func handleStatus(status *http.Response, website sqlc.Website, duration int64) {
	log.Println("Handling status:", website.Url)
	ctx := context.Background()
	database, err := db.NewDB()
	if err != nil {
		log.Println(err)
	}
	defer database.Conn.Close(ctx)

	statusCheck := sqlc.StatusCheck{
		StatusCode: pgtype.Int4{Int32: int32(status.StatusCode), Valid: true},
		ResponseTime: duration,
		Status: pgtype.Text{String: status.Status, Valid: true},
	}

	err = database.InsertStatusCheck(ctx, website, statusCheck)
	if err != nil {
		log.Fatal(err)
	}
}

func ping(website sqlc.Website) (resp *http.Response, duration time.Duration) {
	log.Println("Pinging:", website.Url)
	
	var start time.Time

  start = time.Now()
	resp, err := http.Get(website.Url)
	
	if err != nil {
      log.Fatal(err)
  }

	duration = time.Since(start)
	log.Printf("Total time for response: %vms\n", duration.Milliseconds())

	return resp, duration
}

