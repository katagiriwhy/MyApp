package models

import "time"

type Lesson struct {
	ID        int64     `json:"id"`
	TutorID   int64     `json:"tutor_id"`
	StudentID int64     `json:"student_id"`
	StartTime time.Time `json:"start_time"`
	EndTime   time.Time `json:"end_time"`
	IsGroup   bool      `json:"is_group"`
	Title     string    `json:"title"`
}
