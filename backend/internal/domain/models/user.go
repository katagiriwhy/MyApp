package models

import "time"

type User struct {
	ID        int64     `json:"id"`
	FirstName string    `json:"first_name"`
	LastName  string    `json:"last_name"`
	Email     string    `json:"email"`
	PassHash  []byte    `json:"-"`
	BirthDate time.Time `json:"birth_date"`
}
