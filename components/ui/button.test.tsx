import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Button } from "./button"
import { Slot } from "@radix-ui/react-slot"

describe("Button Component", () => {
  it("renders with default props", () => {
    render(<Button>Click Me</Button>)

    const btn = screen.getByText("Click Me")
    expect(btn).toBeInTheDocument()
    expect(btn).toHaveAttribute("data-variant", "default")
    expect(btn).toHaveAttribute("data-size", "default")
    expect(btn.tagName).toBe("BUTTON")
  })

  it("applies variant and size props", () => {
    render(
      <Button variant="destructive" size="sm">
        Delete
      </Button>
    )

    const btn = screen.getByText("Delete")
    expect(btn).toHaveAttribute("data-variant", "destructive")
    expect(btn).toHaveAttribute("data-size", "sm")
  })

  it("fires onClick event", async () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click</Button>)

    const btn = screen.getByText("Click")
    await userEvent.click(btn)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it("renders as child when asChild is true", () => {
    render(
      <Button asChild>
        <Slot>Custom Slot</Slot>
      </Button>
    )

    const slot = screen.getByText("Custom Slot")
    expect(slot).toBeInTheDocument()
    expect(slot.tagName).toBe("DIV") // Radix Slot renders as a div by default
  })
})