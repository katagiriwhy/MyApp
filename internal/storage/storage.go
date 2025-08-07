package storage

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"
)

type Storage struct {
	db *pgxpool.Pool
}

func NewStorage(connection string) *Storage {

	pool, err := pgxpool.New(context.Background(), connection)
	if err != nil {
		panic(err)
	}

	if err := pool.Ping(context.Background()); err != nil {
		panic(err)
	}

	return &Storage{db: pool}
}

func (s *Storage) Close() {
	s.db.Close()
}
