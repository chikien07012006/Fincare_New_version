import { redirect } from "next/navigation"

export default function ApplicationsPage() {
  redirect("/dashboard/documents")
  return null
}

// The rest of the code is not needed as the page is redirected.
