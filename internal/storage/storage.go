package storage

import (
	"MyApp/internal/domain/models"
	"context"
	"errors"
	"fmt"
	"os"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type UserRepository interface {
	GetByID(ctx context.Context, id int) (*models.User, error)
	GetByEmail(ctx context.Context, email string) (*models.User, error)
	Create(ctx context.Context, user *models.User) error
	DeleteUserByEmail(ctx context.Context, email string) error
}

type Storage struct {
	db *pgxpool.Pool
}

func (s *Storage) GetByEmail(ctx context.Context, email string) (*models.User, error) {
	const query = "SELECT id, email, password from users WHERE email = $1"

	var user models.User

	err := s.db.QueryRow(ctx, query, email).Scan(&user.ID, &user.Email, &user.PassHash)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, fmt.Errorf("user with this email is not found")
		}
	}
	return &user, nil
}

func (s *Storage) GetByID(ctx context.Context, id int) (*models.User, error) {

	const query = "SELECT id, email, password from users WHERE id = $1"

	var user models.User

	err := s.db.QueryRow(ctx, query, id).Scan(&user.ID, &user.Email, &user.PassHash)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, fmt.Errorf("user is not found: %w", err)
		}
	}

	return &user, nil
}

func (s *Storage) Create(ctx context.Context, user *models.User) error {
	const query = "INSERT INTO users (id, email, password) VALUES ($1, $2, $3)"

	_, err := s.db.Exec(ctx, query, user.ID, user.Email, user.PassHash)

	if err != nil {
		return err
	}

	return nil
}

func (s *Storage) DeleteUserByEmail(ctx context.Context, email string) error {
	const query = "DELETE FROM users WHERE email = $1"

	_, err := s.db.Exec(ctx, query, email)

	if err != nil {
		return err
	}

	return nil
}

func NewStorage(connection string) *Storage {

	pool, err := pgxpool.New(context.Background(), connection)
	if err != nil {
		panic(err)
	}

	if err := pool.Ping(context.Background()); err != nil {
		panic(err)
	}

	sqlFile, err := os.ReadFile(os.Getenv("SQL_FILE_PATH"))
	if err != nil {
		panic(err)
	}

	_, err = pool.Exec(context.Background(), string(sqlFile))
	if err != nil {
		panic(err)
	}

	return &Storage{db: pool}
}

func (s *Storage) Close() {
	s.db.Close()
}
