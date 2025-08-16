FROM golang:alpine AS builder
LABEL authors="katagiri"

ENV GOOS linux

ENV CGO_ENABLED 0

RUN apk update --no-cache && apk add --no-cache tzdata

WORKDIR /MyApp

ADD go.mod .

ADD go.sum .

RUN go mod download

COPY . .

RUN go build -ldflags="-s -w" -o api ./backend/cmd/main.go

EXPOSE 8080

CMD ["./api"]