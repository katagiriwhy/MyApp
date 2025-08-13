FROM golang:1.24.2
LABEL authors="katagiri"

WORKDIR /MyApp

COPY backend/go.mod go.sum ./

RUN go mod download

COPY . .

RUN go mod tidy

RUN go build -o api ./cmd/main.go

EXPOSE 8080

CMD ["./api"]