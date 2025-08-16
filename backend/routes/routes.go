package routes

import (
	"MyApp/backend/internal/controllers"
	"github.com/gin-gonic/gin"
)

func corsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}

func NewRoutes(con *controllers.UserController) *gin.Engine {
	router := gin.Default()
	router.Use(corsMiddleware())

	api := router.Group("/api")
	{
		api.GET("/login", con.Login)
		api.POST("/register", con.Register)
		api.DELETE("/delete", con.Delete)
	}

	return router
}
