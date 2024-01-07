// This function is called to retrieve the logs of the day

package main

import (
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

func handler(request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	return &events.APIGatewayProxyResponse{
    StatusCode:        200,
    Body:              "Function called and I will return the logs of the day",
  }, nil
}

func main() {
  lambda.Start(handler)
}