package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
)

const (
	port      = "8080"
	
)

func main() {
	directory := os.Getenv("FOLDER_PATH")

	// if not env, set to local by default
	if directory == ""{
		directory = "./public"
	}
	fmt.Printf("directory path will be %s\n", directory)
	http.Handle("/", http.FileServer(http.Dir(directory)))

	log.Fatal(http.ListenAndServe(":"+port, nil))
}
