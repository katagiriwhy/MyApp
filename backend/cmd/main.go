package main

import (
	"backend/internal/controllers"
	"backend/internal/storage"
	"backend/routes"
	"log/slog"
	"os"
)

const (
	envLocal = "local"
	envProd  = "prod"
)

func main() {
	log := setupLogger(os.Getenv("ENV"))

	log.Info("Started application")

	db := storage.NewStorage(os.Getenv("DATABASE_URL"))

	userController := controllers.NewUserController(db)

	router := routes.NewRoutes(userController)

	router.Run(os.Getenv("PORT"))

	defer db.Close()

}

func setupLogger(env string) *slog.Logger {
	var log *slog.Logger

	switch env {
	case envLocal:
		log = slog.New(slog.NewTextHandler(os.Stdout, &slog.HandlerOptions{Level: slog.LevelDebug}))
	case envProd:
		log = slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{Level: slog.LevelDebug}))
	}

	return log
}
