package routes

import (
	"xBuilder/config"
)

func initClient() {
	config.App.Static("/_go/static", "public")
}
