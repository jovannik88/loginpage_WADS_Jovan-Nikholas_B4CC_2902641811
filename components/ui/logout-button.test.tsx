import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import LogoutButton from "./LogoutButton"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

// Mock toast
jest.mock("sonner", () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}))

// Mock next/router
const pushMock = jest.fn()
const refreshMock = jest.fn()
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    refresh: refreshMock,
  }),
}))

// Mock fetch
global.fetch = jest.fn()

describe("LogoutButton", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("opens dialog on button click", () => {
    render(<LogoutButton />)
    const trigger = screen.getByText("Logout")
    expect(trigger).toBeInTheDocument()

    userEvent.click(trigger)
    expect(screen.getByText("Logout Confirmation")).toBeInTheDocument()
    expect(
      screen.getByText("Are you sure want to logout?")
    ).toBeInTheDocument()
  })

  it("closes dialog on Cancel", () => {
    render(<LogoutButton />)
    userEvent.click(screen.getByText("Logout"))

    const cancelBtn = screen.getByText("Cancel")
    userEvent.click(cancelBtn)

    // Radix AlertDialog closes instantly in DOM
    expect(screen.queryByText("Logout Confirmation")).not.toBeInTheDocument()
  })

  it("logs out successfully", async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({ ok: true })

    render(<LogoutButton />)
    userEvent.click(screen.getByText("Logout"))

    const confirmBtn = screen.getByText("Yes, Logout")
    userEvent.click(confirmBtn)

    expect(confirmBtn).toBeDisabled() // loading state

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("logout success")
      expect(pushMock).toHaveBeenCalledWith("/login")
      expect(refreshMock).toHaveBeenCalled()
    })
  })

  it("shows error toast on failure", async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({ ok: false })

    render(<LogoutButton />)
    userEvent.click(screen.getByText("Logout"))

    const confirmBtn = screen.getByText("Yes, Logout")
    userEvent.click(confirmBtn)

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Logout failed")
    })
  })
})