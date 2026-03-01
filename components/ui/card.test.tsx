import { render, screen } from "@testing-library/react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardAction, CardFooter } from "./card"

describe("Card Component", () => {
  it("renders Card with all slots", () => {
    render(
      <Card data-testid="card">
        <CardHeader>Header</CardHeader>
        <CardTitle>Title</CardTitle>
        <CardDescription>Description</CardDescription>
        <CardContent>Content</CardContent>
        <CardAction>Action</CardAction>
        <CardFooter>Footer</CardFooter>
      </Card>
    )

    // Card wrapper
    expect(screen.getByTestId("card")).toBeInTheDocument()

    // Check all slots
    expect(screen.getByText("Header")).toHaveAttribute("data-slot", "card-header")
    expect(screen.getByText("Title")).toHaveAttribute("data-slot", "card-title")
    expect(screen.getByText("Description")).toHaveAttribute("data-slot", "card-description")
    expect(screen.getByText("Content")).toHaveAttribute("data-slot", "card-content")
    expect(screen.getByText("Action")).toHaveAttribute("data-slot", "card-action")
    expect(screen.getByText("Footer")).toHaveAttribute("data-slot", "card-footer")
  })

  it("merges custom className", () => {
    render(<Card className="custom-class">Test</Card>)
    const card = screen.getByText("Test")
    expect(card).toHaveClass("custom-class")
  })
})