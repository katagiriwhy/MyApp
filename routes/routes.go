package routes

import "github.com/gin-gonic/gin"

func NewRoutes() *gin.Engine {
	router := gin.Default()

	api := router.Group("/api")
	{

	}

	return router
}
