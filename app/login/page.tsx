// app/login/page.tsx 


import { Suspense } from 'react'
import LoginForm from '@/components/ui/forms/LoginForm'

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading login form...</div>}>
      <LoginForm />
    </Suspense>
  )
}
