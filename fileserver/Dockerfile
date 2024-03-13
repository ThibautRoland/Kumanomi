FROM golang:1.22

WORKDIR /app

COPY ./fileserver/go.mod .
COPY ./fileserver/*.go .
RUN go mod download

# Build
RUN CGO_ENABLED=0 GOOS=linux go build -o /fileserver

EXPOSE 8080

# Run
CMD ["/fileserver"]