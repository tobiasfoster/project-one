import { Link } from "@tanstack/react-router"
import { FileQuestionIcon } from "@/components/ui/icons/FileQuestionIcon/FileQuestionIcon"
import { Button } from "@/components/ui/Button/Button"

export function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <FileQuestionIcon aria-hidden="true" className="mb-md h-16 w-16 text-db-primary-300" />
      <h1 className="text-4xl font-bold text-db-primary-900">404</h1>
      <p className="mt-sm text-lg text-db-primary-600">Page not found</p>
      <p className="mt-xs max-w-md text-sm text-db-primary-500">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button className="mt-lg" render={<Link to="/dashboard" />}>
        Go to Dashboard
      </Button>
    </div>
  )
}
