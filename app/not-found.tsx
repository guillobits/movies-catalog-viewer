import { Frown } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6">
      <Frown size={50} />
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-bold tracking-tight">We are so sorry...</h2>
        <p className="text-gray-500 dark:text-gray-400">
          {`The page you're looking for doesn't exist or has been moved.`}
        </p>
      </div>
      <Link
        className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
        href="/"
      >
        Go back home
      </Link>
    </div>
  )
}
