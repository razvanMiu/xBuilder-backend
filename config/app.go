package config

import (
	"github.com/gofiber/fiber/v2"
)

var App *fiber.App

func InitConfig() {
	loadEnv()
	initMongoDB()
	initSettings()
	initApp()
}

func initApp() {
	App = fiber.New()
}
