package routes

import (
	"xBuilder/config"

	"github.com/gofiber/fiber/v2"
)

var api fiber.Router

func InitRoutes() {
	api = config.App.Group("/api")

	initSwagger()
	initClient()
	initAuth()
	initTypes()
}
