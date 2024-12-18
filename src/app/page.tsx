'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '../utils/login/zodSchema';

export default function Home() {
  const router = useRouter()
  const [error, setError] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsSubmitting(true);
      const response = await fetch('/api/login',{
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
  
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
  
      const validate = await response.json();
      
      if (validate.isAuthenticated === true){
        sessionStorage.setItem("isAuthenticated", "true");
        router.push('/form');
  
      }else{
        setError(validate.isAuthenticated as string);
        setIsSubmitting(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Ocorreu um erro com o servidor. Tente novamente mais tarde.');
      }
    } finally{
      setIsSubmitting(false);
    }
  }


  return (
    <div className="container mx-auto flex h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-lg border p-6 shadow-lg">
        <h1 className="text-center text-2xl font-bold">Login</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input
              {...register('username')}
              className="mt-1 w-full rounded-md border p-2"
              disabled={isSubmitting}
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              {...register('password')}
              className="mt-1 w-full rounded-md border p-2"
              disabled={isSubmitting}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {error && (
            <p className="text-center text-sm text-red-500">{error}</p>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
           { isSubmitting ? 'Validando' : 'Login'}
          </Button>
        </form>
      </div>
    </div>
  )
}
