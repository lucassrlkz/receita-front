import { useRouter } from 'next/navigation';

export function handleLogout(){
  const router = useRouter();
    sessionStorage.setItem('isAuthenticated', 'false');
    router.push('/');
}