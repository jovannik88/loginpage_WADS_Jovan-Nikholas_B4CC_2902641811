import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Input } from "./input"

describe("Input Component", () => {
  it("renders with default props", () => {
    render(<Input placeholder="Enter text" />)

    const input = screen.getByPlaceholderText("Enter text")
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute("type", "text") // default HTML type if not specified
    expect(input).toHaveAttribute("data-slot", "input")
  })

  it("accepts a custom type", () => {
    render(<Input type="password" placeholder="Password" />)
    const input = screen.getByPlaceholderText("Password")
    expect(input).toHaveAttribute("type", "password")
  })

  it("merges custom className", () => {
    render(<Input className="custom-class" placeholder="Name" />)
    const input = screen.getByPlaceholderText("Name")
    expect(input).toHaveClass("custom-class")
  })

  it("handles value and onChange", async () => {
    const handleChange = jest.fn()
    render(
      <Input
        placeholder="Username"
        value=""
        onChange={handleChange}
      />
    )

    const input = screen.getByPlaceholderText("Username")
    await userEvent.type(input, "hello")
    expect(handleChange).toHaveBeenCalled()
  })

  it("renders disabled input", () => {
    render(<Input placeholder="Disabled" disabled />)
    const input = screen.getByPlaceholderText("Disabled")
    expect(input).toBeDisabled()
  })
})