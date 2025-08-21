package controllers

import (
	"MyApp/backend/internal/domain/models"
	"MyApp/backend/internal/lib/jwt"
	"MyApp/backend/internal/storage"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

type UserController struct {
	db *storage.Storage
}

func NewUserController(db *storage.Storage) *UserController {
	return &UserController{db}
}

func (con *UserController) Register(c *gin.Context) {
	var body struct {
		FirstName string `json:"first_name" binding:"required"`
		LastName  string `json:"last_name" binding:"required"`
		Email     string `json:"email" binding:"required"`
		Password  string `json:"password" binding:"required"`
		BirthDate string `json:"birth_date" binding:"required"`
	}

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to read body: " + err.Error()})
		return
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), bcrypt.DefaultCost)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to generate password: " + err.Error()})
		return
	}
	//TODO: parse time from json
	date, err := time.Parse("2006-01-02", body.BirthDate)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to parse date: " + err.Error()})
		return
	}

	user := models.User{Email: body.Email, PassHash: hash, FirstName: body.FirstName, LastName: body.LastName, BirthDate: date}

	// TODO: finish token

	_, err = jwt.NewToken(user, time.Minute*60)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to create token: " + err.Error()})
		return
	}

	err = con.db.Create(c, &user)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to create user: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"email": user.Email,
	})
}

func (con *UserController) Delete(c *gin.Context) {
	var body struct {
		Email string `json:"email" binding:"required"`
	}
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to read body: " + err.Error()})
		return
	}

	err := con.db.DeleteUserByEmail(c, body.Email)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to delete user: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Пользователь: " + body.Email + " успешно удален",
	})

}

func (con *UserController) Login(c *gin.Context) {
	var body struct {
		Email    string `json:"email" binding:"required"`
		Password string `json:"password" binding:"required"`
	}

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to read body: " + err.Error()})
		return
	}

	user, err := con.db.GetByEmail(c, body.Email)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to find user: " + err.Error()})
		return
	}

	err = bcrypt.CompareHashAndPassword(user.PassHash, []byte(body.Password))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Password is incorrect: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Welcome " + user.Email,
	})
}
