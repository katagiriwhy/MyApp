package jwt

import (
	"MyApp/internal/domain/models"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

func NewToken(user models.User, duration time.Duration) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)

	claims := token.Claims.(jwt.MapClaims)

	claims["uid"] = user.ID
	claims["exp"] = time.Now().Add(duration).Unix()
	claims["email"] = user.Email

	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		return "", err
	}
	return tokenString, nil
}
