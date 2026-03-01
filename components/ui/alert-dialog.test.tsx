import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
} from "./alert-dialog"

describe("AlertDialog Component", () => {
  it("renders trigger and opens dialog on click", async () => {
    render(
      <AlertDialog>
        <AlertDialogTrigger>Open Dialog</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Confirm Action</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to continue?
          </AlertDialogDescription>
        </AlertDialogContent>
      </AlertDialog>
    )

    // Find trigger button
    const triggerButton = screen.getByText("Open Dialog")
    expect(triggerButton).toBeInTheDocument()

    // Click to open dialog
    await userEvent.click(triggerButton)

    // Check that dialog content is rendered
    expect(screen.getByText("Confirm Action")).toBeInTheDocument()
    expect(screen.getByText("Are you sure you want to continue?")).toBeInTheDocument()
  })
})