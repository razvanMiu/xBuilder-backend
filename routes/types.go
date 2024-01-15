package routes

import (
	"xBuilder/controllers"
)

func initTypes() {
	types := controllers.Types{}
	router := api.Group("/types")

	router.Get("/", types.GetTypes)
}
