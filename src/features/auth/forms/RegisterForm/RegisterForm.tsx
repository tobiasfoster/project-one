import { useState } from "react"
import { useRouter } from "@tanstack/react-router"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, type RegisterFormData } from "@/features/auth/schema/auth.schemas"
import { register as registerUser } from "@/features/auth/api/auth.api"
import { useAuthStore } from "@/features/auth/store/auth.store"
import { useProfileStore } from "@/features/profile/store/profile.store"
import { ApiClientError } from "@/lib/api/client"
import { Button } from "@/components/ui/Button/Button"
import { Input } from "@/components/ui/Input/Input"
import { Field, FieldLabel } from "@/components/ui/Field/Field"
import { FormError } from "@/components/ui/FormError/FormError"
import { Spinner } from "@/components/ui/Spinner/Spinner"

interface RegisterFormProps {
  redirectTo?: string
}

export function RegisterForm({ redirectTo = "/dashboard" }: RegisterFormProps) {
  const router = useRouter()
  const setAuth = useAuthStore(s => s.setAuth)
  const setProfile = useProfileStore(s => s.setProfile)
  const [serverError, setServerError] = useState("")

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    setServerError("")
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    }
    try {
      const response = await registerUser(payload)
      setAuth(response.user)
      setProfile(response.user.profile)
      router.history.replace(redirectTo)
    }
    catch (err) {
      if (err instanceof ApiClientError) {
        if (err.fields) {
          Object.entries(err.fields).forEach(([key, message]) => {
            setError(key as keyof RegisterFormData, { message })
          })
        }
        else {
          setServerError(err.message)
        }
      }
      else {
        setServerError("An unexpected error occurred")
      }
    }
  }

  return (
    <form className="space-y-eb-md" noValidate onSubmit={handleSubmit(onSubmit)}>
      {serverError && (
        <div
          className="rounded-lg bg-eb-danger-50 py-eb-sm py-eb-sm text-sm text-eb-danger-600"
          role="alert"
        >
          {serverError}
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
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <Input
          autoComplete="new-password"
          hasError={!!errors.password}
          id="password"
          type="password"
          {...register("password")}
        />
        <FormError>{errors.password?.message}</FormError>
      </Field>

      <Field>
        <FieldLabel htmlFor="confirmPassword">Confirm password</FieldLabel>
        <Input
          autoComplete="new-password"
          hasError={!!errors.confirmPassword}
          id="confirmPassword"
          type="password"
          {...register("confirmPassword")}
        />
        <FormError>{errors.confirmPassword?.message}</FormError>
      </Field>

      <Button className="w-full" disabled={isSubmitting} type="submit">
        {isSubmitting ? <Spinner className="text-eb-on-accent" /> : "Create account"}
      </Button>
    </form>
  )
}
