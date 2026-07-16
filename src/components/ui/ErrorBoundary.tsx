import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  private _onerror?: (event: ErrorEvent) => void
  private _rejection?: (event: PromiseRejectionEvent) => void

  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary]', error, errorInfo.componentStack)
  }

  componentDidMount() {
    this._onerror = (event: ErrorEvent) => {
      console.error('[window.onerror]', event.error ?? event.message, event.filename, event.lineno, event.colno)
    }
    this._rejection = (event: PromiseRejectionEvent) => {
      console.error('[unhandledrejection]', event.reason)
    }
    window.addEventListener('error', this._onerror)
    window.addEventListener('unhandledrejection', this._rejection)
  }

  componentWillUnmount() {
    if (this._onerror) window.removeEventListener('error', this._onerror)
    if (this._rejection) window.removeEventListener('unhandledrejection', this._rejection)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[100dvh] flex items-center justify-center bg-cream px-6">
          <div className="text-center max-w-md">
            <h1 className="font-display text-2xl text-brown-dark mb-3">Something went wrong</h1>
            <p className="text-text-secondary font-light text-sm mb-6">
              We encountered an unexpected error. Please try refreshing the page.
            </p>
            <pre className="font-mono text-[10px] text-red-600 bg-red-50 rounded p-3 text-left whitespace-pre-wrap max-h-[40vh] overflow-auto mb-6">
              {this.state.error?.message}{'\n\n'}{this.state.error?.stack}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary text-xs px-6 py-3"
            >
              Refresh Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
