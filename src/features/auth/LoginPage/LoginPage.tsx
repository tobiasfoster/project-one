import { useState } from "react"
import { Link, useRouter, useRouterState } from "@tanstack/react-router"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { loginSchema, type LoginFormData } from "../auth.schemas"
import { login } from "../auth.api"
import { useAuthStore } from "../auth.store"
import { ApiClientError } from "@/lib/api/client"
import { Button } from "@/components/ui/Button/Button"
import { Input } from "@/components/ui/Input/Input"
import { Field, FieldLabel } from "@/components/ui/Field/Field"
import { FormError } from "@/components/ui/FormError/FormError"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card/Card"
import { Spinner } from "@/components/ui/Spinner/Spinner"
import { useProfileStore } from "@/features/profile/profile.store"

export function LoginPage() {
  const router = useRouter()
  const search = useRouterState({ select: s => s.location.search }) as {
    redirect?: string
  }
  const from = search.redirect || "/dashboard"
  const setAuth = useAuthStore(s => s.setAuth)
  const setProfile = useProfileStore(s => s.setProfile)
  const [serverError, setServerError] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "jane.doe@email.com", password: "Password123!" },
  })

  const onSubmit = async (data: LoginFormData) => {
    setServerError("")
    try {
      const response = await login(data)

      setAuth(response.user)
      setProfile(response.user.profile)
      router.history.replace(from)
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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-db-brand-900 via-db-brand-800 to-db-brand-950 px-md">
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
          <p className="mt-xs text-sm text-db-on-sidebar-muted">Sign in to your account</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle as="h2">Welcome back</CardTitle>
            <CardDescription>
              Enter your credentials to access your dashboard
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
                {isSubmitting ? <Spinner className="text-db-on-accent" /> : "Sign in"}
              </Button>
            </form>

            <p className="mt-md text-center text-sm text-db-primary-500">
              Don&apos;t have an account?
              {" "}
              <Link
                className="font-medium text-db-accent-600 hover:text-db-accent-700"
                to="/register"
              >
                Create one
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
