'use client' // Error boundaries must be Client Components
 
import { useEffect } from 'react'
 
export default function Error({
  error
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className='col-span-4 col-start-2'>
      <h1>Oops!</h1>
      <p>
        {error.message}
        {error.digest && <small> (Digest: {error.digest})</small>}
      </p>
    </div>
  )
}