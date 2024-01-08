package main

import (
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/dasporal/status.amine-rahmane.fr/pkg/monitoring"
)

func handler(request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	monitoring.PingWebsites()

	return &events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       "Function called and websites pinged",
	}, nil
}

func main() {
	lambda.Start(handler)
}
