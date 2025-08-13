package routes

import (
	"MyApp/backend/internal/controllers"
	"github.com/gin-gonic/gin"
)

func NewRoutes(con *controllers.UserController) *gin.Engine {
	router := gin.Default()

	api := router.Group("/api")
	{
		api.GET("/login", con.Login)
		api.POST("/register", con.Register)
		api.DELETE("/delete", con.Delete)
	}

	return router
}
