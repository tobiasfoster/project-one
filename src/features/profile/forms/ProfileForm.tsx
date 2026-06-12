import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { profileSchema, type ProfileFormData } from "../schema/profile.schema"
import { updateProfile } from "../api/profile.api"
import { queryKeys } from "@/lib/api/query-keys"
import { ApiClientError } from "@/lib/api/client"
import { Button } from "@/components/ui/Button/Button"
import { Input } from "@/components/ui/Input/Input"
import { Field, FieldLabel } from "@/components/ui/Field/Field"
import { FormError } from "@/components/ui/FormError/FormError"
import { Spinner } from "@/components/ui/Spinner/Spinner"
import { showToast } from "@/components/ui/Toast/toast-manager"
import { useProfileStore } from "../store/profile.store"
import type { Profile } from "@/types"
import { ApiErrorState } from "@/components/shared/ApiErrorState/ApiErrorState"

interface ProfileFormProps {
  profile: Profile
  avatarPreview?: string
}

export function ProfileForm({ profile, avatarPreview }: ProfileFormProps) {
  "use no memo"

  const queryClient = useQueryClient()
  const setProfile = useProfileStore(s => s.setProfile)
  const [serverError, setServerError] = useState("")

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isDirty },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  })

  useEffect(() => {
    reset({
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      phone: profile.phone ?? "",
      address: profile.address ?? "",
    })
  }, [profile, reset])

  const mutation = useMutation({
    mutationFn: (formData: ProfileFormData) =>
      updateProfile({ ...formData, avatarUrl: avatarPreview }),
    onSuccess: (updated) => {
      setProfile(updated)
      queryClient.setQueryData(queryKeys.profile, updated)
      showToast({
        title: "Profile updated",
        description: "Your changes have been saved.",
        type: "success",
      })
      setServerError("")
    },
    onError: (err) => {
      console.log("error", err)

      if (err instanceof ApiClientError && err.fields) {
        Object.entries(err.fields).forEach(([key, message]) => {
          setError(key as keyof ProfileFormData, { message })
        })
      }
      else if (err instanceof ApiClientError) {
        setServerError(err.message)
      }
    },
  })

  return (
    <form
      className="grid gap-eb-md sm:grid-cols-2"
      noValidate
      onSubmit={handleSubmit(formData => mutation.mutate(formData))}
    >
      {serverError && (
        <div className="col-span-full">
          <ApiErrorState
            message={serverError}
            title="Something went wrong"
          />
        </div>
      )}

      <Field>
        <FieldLabel htmlFor="firstName">First name</FieldLabel>
        <Input
          autoComplete="given-name"
          hasError={!!errors.firstName}
          id="firstName"
          {...register("firstName")}
        />
        <FormError>{errors.firstName?.message}</FormError>
      </Field>
      <Field>
        <FieldLabel htmlFor="lastName">Last name</FieldLabel>
        <Input
          autoComplete="family-name"
          hasError={!!errors.lastName}
          id="lastName"
          {...register("lastName")}
        />
        <FormError>{errors.lastName?.message}</FormError>
      </Field>

      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input
          autoComplete="email"
          hasError={!!errors.email}
          id="email"
          spellCheck={false}
          type="email"
          {...register("email")}
        />
        <FormError>{errors.email?.message}</FormError>
      </Field>

      <Field>
        <FieldLabel htmlFor="phone">Phone</FieldLabel>
        <Input
          autoComplete="tel"
          hasError={!!errors.phone}
          id="phone"
          inputMode="tel"
          type="tel"
          {...register("phone")}
        />
        <FormError>{errors.phone?.message}</FormError>
      </Field>

      <Field className="sm:col-span-2">
        <FieldLabel htmlFor="address">Address</FieldLabel>
        <Input
          autoComplete="street-address"
          hasError={!!errors.address}
          id="address"
          {...register("address")}
        />
        <FormError>{errors.address?.message}</FormError>
      </Field>

      <div className="sm:col-span-2">
        <Button
          disabled={mutation.isPending || (!isDirty && !avatarPreview)}
          type="submit"
        >
          {mutation.isPending
            ? (
                <Spinner className="text-eb-on-accent" />
              )
            : (
                "Save changes"
              )}
        </Button>
      </div>
    </form>
  )
}
