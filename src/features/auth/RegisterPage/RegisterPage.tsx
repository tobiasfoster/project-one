import { useState } from "react"
import { Link, useNavigate } from "@tanstack/react-router"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { registerSchema, type RegisterFormData } from "../auth.schemas"
import { register as registerUser } from "../auth.api"
import { useAuthStore } from "../auth.store"
import { ApiClientError } from "@/lib/api/client"
import { Button } from "@/components/ui/Button/Button"
import { Input } from "@/components/ui/Input/Input"
import { Field, FieldLabel } from "@/components/ui/Field/Field"
import { FormError } from "@/components/ui/FormError/FormError"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card/Card"
import { Spinner } from "@/components/ui/Spinner/Spinner"
import { useProfileStore } from "@/features/profile/profile.store"

export function RegisterPage() {
  const navigate = useNavigate()
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
      navigate({ to: "/dashboard" })
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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-db-brand-900 via-db-brand-800 to-db-brand-950 px-md py-xl">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mb-xl text-center">
          <div className="mx-auto mb-md flex h-12 w-12 items-center justify-center rounded-xl bg-db-accent-500 text-xl font-bold text-db-on-accent">
            E
          </div>
          <h1 className="text-2xl font-bold text-db-on-sidebar">Eagle Bank</h1>
          <p className="mt-xs text-sm text-db-on-sidebar-muted">Create your account</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle as="h2">Get started</CardTitle>
            <CardDescription>
              Open your Eagle Bank account in minutes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-md" noValidate onSubmit={handleSubmit(onSubmit)}>
              {serverError && (
                <div
                  className="rounded-lg bg-db-danger-50 px-sm py-sm text-sm text-db-danger-600"
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
                {isSubmitting ? <Spinner className="text-db-on-accent" /> : "Create account"}
              </Button>
            </form>

            <p className="mt-md text-center text-sm text-db-primary-500">
              Already have an account?
              {" "}
              <Link
                className="font-medium text-db-accent-600 hover:text-db-accent-700"
                to="/login"
              >
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
