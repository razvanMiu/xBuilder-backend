package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Type struct {
	ID          primitive.ObjectID `json:"_id" bson:"_id"`
	Title       string             `json:"title" bson:"title"`
	Description string             `json:"description" bson:"description"`
	Behaviors   []Behavior         `json:"behaviors" bson:"behaviors"`
}
