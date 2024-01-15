package controllers

import (
	"log"

	"xBuilder/config"
	"xBuilder/models"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
)

type Types struct{}

func (a Types) GetTypes(c *fiber.Ctx) error {
	// return c.JSON()
	_, database, ctx := config.GetMongoDBClient()

	typesColl := database.Collection("Types")

	agglockup := bson.M{
		"$lookup": bson.M{
			"from":         "Behaviors",
			"localField":   "behaviorsIds",
			"foreignField": "_id",
			"as":           "behaviors",
		},
	}

	cursor, err := typesColl.Aggregate(ctx, []bson.M{agglockup})
	if err != nil {
		log.Fatal(err)
	}

	var types []models.Type

	for cursor.Next(ctx) {
		var result models.Type
		err := cursor.Decode(&result)
		if err != nil {
			log.Fatal(err)
		}
		types = append(types, result)
	}

	defer cursor.Close(ctx)

	return c.JSON(types)
}
