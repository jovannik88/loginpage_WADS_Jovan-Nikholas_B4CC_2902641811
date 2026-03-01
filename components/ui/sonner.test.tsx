import { render, screen } from "@testing-library/react"
import { Toaster } from "./sonner"
import { ThemeProvider } from "next-themes"

// Optional: wrap with ThemeProvider for testing useTheme
const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
)

describe("Toaster Component", () => {
  it("renders without crashing", () => {
    render(
      <Toaster data-testid="toaster" />,
      { wrapper: Wrapper }
    )

    const toaster = screen.getByTestId("toaster")
    expect(toaster).toBeInTheDocument()
  })

  it("applies className correctly", () => {
    render(
      <Toaster data-testid="toaster-class" className="custom-class" />,
      { wrapper: Wrapper }
    )

    const toaster = screen.getByTestId("toaster-class")
    expect(toaster).toHaveClass("custom-class")
  })
})