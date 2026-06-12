import { useState } from "react"
import { useRouter } from "@tanstack/react-router"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, type LoginFormData } from "@/features/auth/schema/auth.schemas"
import { login } from "@/features/auth/api/auth.api"
import { useAuthStore } from "@/features/auth/store/auth.store"
import { useProfileStore } from "@/features/profile/store/profile.store"
import { ApiClientError } from "@/lib/api/client"
import { Button } from "@/components/ui/Button/Button"
import { Input } from "@/components/ui/Input/Input"
import { Field, FieldLabel } from "@/components/ui/Field/Field"
import { FormError } from "@/components/ui/FormError/FormError"
import { Spinner } from "@/components/ui/Spinner/Spinner"

interface LoginFormProps {
  redirectTo?: string
  defaultValues?: LoginFormData
}

export function LoginForm({
  redirectTo = "/dashboard",
  defaultValues = { email: "jane.doe@email.com", password: "Password123!" },
}: LoginFormProps) {
  const router = useRouter()
  const setAuth = useAuthStore(s => s.setAuth)
  const setProfile = useProfileStore(s => s.setProfile)
  const [serverError, setServerError] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues,
  })

  const onSubmit = async (data: LoginFormData) => {
    setServerError("")
    try {
      const response = await login(data)

      setAuth(response.user)
      setProfile(response.user.profile)
      router.history.replace(redirectTo)
    }
    catch (err) {
      if (err instanceof ApiClientError) {
        setServerError(err.message)
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
          className="rounded-lg bg-eb-danger-50 p-eb-sm text-sm text-eb-danger-600"
          role="alert"
        >
          {serverError}
        </div>
      )}

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
          autoComplete="current-password"
          hasError={!!errors.password}
          id="password"
          type="password"
          {...register("password")}
        />
        <FormError>{errors.password?.message}</FormError>
      </Field>

      <Button className="w-full" disabled={isSubmitting} type="submit">
        {isSubmitting ? <Spinner className="text-eb-on-accent" /> : "Sign in"}
      </Button>
    </form>
  )
}
