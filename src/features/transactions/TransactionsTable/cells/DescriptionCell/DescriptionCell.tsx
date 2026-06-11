import { Link } from "@tanstack/react-router"

interface DescriptionCellProps {
  id: string
  description: string
}

export function DescriptionCell({ id, description }: DescriptionCellProps) {
  return (
    <Link
      className="font-medium text-eb-primary-900 hover:text-eb-accent-600"
      params={{ id }}
      to="/transactions/$id"
    >
      {description}
    </Link>
  )
}
