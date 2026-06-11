import { useRef, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { CameraIcon } from "@/components/ui/icons/CameraIcon/CameraIcon"
import { getProfile } from "../profile.api"
import { queryKeys } from "@/lib/api/query-keys"
import { PageHeader } from "@/components/shared/PageHeader/PageHeader"
import { ApiErrorState } from "@/components/shared/ApiErrorState/ApiErrorState"
import { Avatar } from "@/components/ui/Avatar/Avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card/Card"
import { Skeleton } from "@/components/ui/Skeleton/Skeleton"
import { ProfileForm } from "../forms/ProfileForm"

function getInitials(firstName?: string, lastName?: string) {
  if (!firstName || !lastName) return ""

  return firstName[0].toUpperCase() + lastName[0].toUpperCase()
}

export function ProfilePage() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>()

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: queryKeys.profile,
    queryFn: getProfile,
  })

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setAvatarPreview(url)
    }
  }

  if (isError) {
    return (
      <div>
        <PageHeader title="Profile" />
        <ApiErrorState onRetry={() => refetch()} />
      </div>
    )
  }

  if (isLoading) {
    return (
      <div>
        <Skeleton className="mb-lg h-8 w-32" />
        <Skeleton className="h-96 rounded-xl" />
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        description="View and update your personal information"
        title="Profile"
      />

      <Card>
        <CardHeader>
          <CardTitle as="h2">Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-lg flex items-center gap-md">
            <div className="relative">
              <Avatar
                fallback={getInitials(data!.firstName, data!.lastName)}
                size="lg"
                src={avatarPreview}
              />
              <button
                aria-label="Upload avatar"
                className="absolute bottom-0 right-0 rounded-full bg-db-brand-800 p-sm text-db-on-accent hover:bg-db-brand-700"
                type="button"
                onClick={() => fileInputRef.current?.click()}
              >
                <CameraIcon aria-hidden="true" className="h-4 w-4" />
              </button>
              <input
                ref={fileInputRef}
                accept="image/*"
                className="sr-only"
                type="file"
                onChange={handleAvatarChange}
              />
            </div>
            <div>
              <p className="font-medium text-db-primary-900">
                {data!.firstName}
                {" "}
                {data!.lastName}
              </p>
              <p className="text-sm text-db-primary-500">{data!.email}</p>
            </div>
          </div>

          <ProfileForm avatarPreview={avatarPreview} profile={data!} />
        </CardContent>
      </Card>
    </div>
  )
}
