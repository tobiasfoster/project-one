import { Link, useRouterState } from "@tanstack/react-router"
import { motion } from "framer-motion"
import { LoginForm } from "@/features/auth/forms/LoginForm/LoginForm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card/Card"

export function LoginPage() {
  const search = useRouterState({ select: s => s.location.search }) as {
    redirect?: string
  }
  const from = search.redirect || "/dashboard"

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-eb-brand-900 via-eb-brand-800 to-eb-brand-950 px-eb-md">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mb-xl text-center">
          <div className="mx-auto mb-eb-md flex h-12 w-12 items-center justify-center rounded-xl bg-eb-accent-500 text-xl font-bold text-eb-on-accent">
            E
          </div>
          <h1 className="text-2xl font-bold text-eb-on-sidebar">Eagle Bank</h1>
          <p className="mt-eb-xs text-sm text-eb-on-sidebar-muted">Sign in to your account</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle as="h2">Welcome back</CardTitle>
            <CardDescription>
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm redirectTo={from} />
            <p className="mt-eb-md text-center text-sm text-eb-primary-500">
              Don&apos;t have an account?
              {" "}
              <Link
                className="font-medium text-eb-accent-600 hover:text-eb-accent-700"
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
