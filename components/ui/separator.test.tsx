import { render, screen } from "@testing-library/react"
import { Separator } from "./separator"

describe("Separator Component", () => {
  it("renders with default props", () => {
    render(<Separator data-testid="sep" />)
    const sep = screen.getByTestId("sep")

    expect(sep).toBeInTheDocument()
    expect(sep).toHaveAttribute("data-slot", "separator")
    expect(sep).toHaveAttribute("data-orientation", "horizontal")
  })

  it("accepts orientation prop", () => {
    render(<Separator orientation="vertical" data-testid="sep-vertical" />)
    const sep = screen.getByTestId("sep-vertical")

    expect(sep).toHaveAttribute("data-orientation", "vertical")
  })

  it("accepts decorative prop", () => {
    render(<Separator decorative={false} data-testid="sep-decorative" />)
    const sep = screen.getByTestId("sep-decorative")

    expect(sep).toHaveAttribute("decorative", "false")
  })

  it("merges custom className", () => {
    render(<Separator className="custom-class" data-testid="sep-class" />)
    const sep = screen.getByTestId("sep-class")

    expect(sep).toHaveClass("custom-class")
  })
})