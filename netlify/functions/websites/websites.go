// This function is called to retrieve the logs of the day

package main

import (
	"context"
	"encoding/json"
	"log"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/dasporal/status.amine-rahmane.fr/pkg/db"
)

func handler(request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	ctx := context.Background()

	database, err := db.NewDB()
	if err != nil {
		log.Fatal(err)
	}
	defer database.Conn.Close(ctx)

	websites, err := database.GetAllWebsites(ctx)

	jsonData, err := json.Marshal(websites)
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
