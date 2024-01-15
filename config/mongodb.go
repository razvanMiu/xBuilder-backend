package config

import (
	"context"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	client *mongo.Client
	db     *mongo.Database
	ctx    context.Context
)

func GetMongoDBClient() (*mongo.Client, *mongo.Database, context.Context) {
	return client, db, ctx
}

func initMongoDB() {
	uri := os.Getenv("MONGODB_URI")
	if uri == "" {
		log.Fatal("You must set your 'MONGODB_URI' environment variable. See\n\t https://www.mongodb.com/docs/drivers/go/current/usage-examples/#environment-variable")
	}
	var err error
	// Requires the MongoDB Go Driver
	// https://go.mongodb.org/mongo-driver
	ctx = context.TODO()
	// Connect to MongoDB
	client, err = mongo.Connect(ctx, options.Client().ApplyURI(os.Getenv("MONGODB_URI")))
	if err != nil {
		log.Fatal(err)
	}
	db = client.Database("xBuilderApp")
}
