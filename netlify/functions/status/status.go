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
	Website struct{
		ID   int32  `json:"website_id"`
		Name string `json:"website_name"`
		URL	string `json:"website_url"`
	}
	StatusCheck sqlc.GetRecentStatusChecksRow
	AverageResponseTime int32 `json:"average_response_time"`
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
	if err != nil {
		log.Fatal(err)
	}

	for _, website := range websites {
		var averageResponseTime int32 = 0
		recentStatusChecks, err := database.GetRecentStatusChecks(ctx, website.WebsiteID)
		if err != nil {
			log.Println("Error retrieving status checks:", err)
			continue
		}
		for _, statusCheck := range recentStatusChecks {
			averageResponseTime += statusCheck.ResponseTime.Int32
		}
		averageResponseTime = averageResponseTime / int32(len(recentStatusChecks))


		data := Data{
			Website: struct {
				ID   int32  `json:"website_id"`
				Name string `json:"website_name"`
				URL  string `json:"website_url"`
			}{
				ID:   website.WebsiteID,
				Name: website.Name.String,
				URL:  website.Url,
			},
			StatusCheck: recentStatusChecks[0], AverageResponseTime: averageResponseTime}

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
