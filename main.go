package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/template/html/v2"
)

func main() {
	app := fiber.New(fiber.Config{
		Views: html.New("./views", ".html"),
	})
	app.Static("/", "./scripts")
	app.Get("/", func(c *fiber.Ctx) error {
		return c.Render("index", fiber.Map{
			"Title": "Hello, World!",
		})
	})

	app.Get("/df", func(c *fiber.Ctx) error {
		return c.Render("bs", fiber.Map{
			"Title": "Hello, World!",
		})
	})

	app.Listen(":3000")
}
