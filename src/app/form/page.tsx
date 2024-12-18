'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CnaeFormRoot } from '../components/form/cnaeFormRoot'

export default function Form() {
  const router = useRouter()

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated')
    if (!isAuthenticated) {
      router.push('/')
    }
  }, [router])

  return (
    <div className="container mx-auto py-10">
      <CnaeFormRoot/>
    </div>
  )
}
