package main

import (
	"MyApp/internal/storage"
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

	i := 0

	for i < 10000 {
		i++
	}
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
