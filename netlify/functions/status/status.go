// This function is called to retrieve the logs of the day

package main

import (
	"context"
	"encoding/json"
	"log"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/dasporal/status.amine-rahmane.fr/pkg/db"
	"github.com/dasporal/status.amine-rahmane.fr/pkg/db/sqlc"
)

type Data struct {
	WebsiteID    int32
	StatusChecks []sqlc.GetRecentStatusChecksRow
}

func handler(request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	var status, err = []Data{}, error(nil)
	ctx := context.Background()

	database, err := db.NewDB()
	if err != nil {
		log.Fatal(err)
	}
	defer database.Conn.Close(ctx)

	websites, err := database.GetAllWebsites(ctx)
	for _, website := range websites {
		recentStatusChecks, err := database.GetRecentStatusChecks(ctx, website.WebsiteID)
		if err != nil {
			log.Println("Error retrieving status checks:", err)
			continue
		}

		data := Data{WebsiteID: website.WebsiteID, StatusChecks: recentStatusChecks}

		status = append(status, data)
	}

	jsonData, err := json.Marshal(status)
	if err != nil {
		log.Fatal(err)
		return nil, err
	}
	jsonString := string(jsonData)

	return &events.APIGatewayProxyResponse{
		StatusCode: 200,
		Headers:    map[string]string{"Content-Type": "application/json"},
		Body:       jsonString,
	}, nil
}

func main() {
	lambda.Start(handler)
}

func first(n []sqlc.GetRecentStatusChecksRow, _ error) []sqlc.GetRecentStatusChecksRow {
	return n
}
