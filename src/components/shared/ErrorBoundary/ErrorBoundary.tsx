import { Component, type ReactNode } from "react"
import { PageErrorState } from "@/components/shared/PageErrorState/PageErrorState"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      return (
        <PageErrorState
          onRetry={() => {
            this.setState({ hasError: false })
            window.location.reload()
          }}
        />
      )
    }

    return this.props.children
  }
}
