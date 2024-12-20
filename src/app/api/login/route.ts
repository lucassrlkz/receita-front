import authLogin from '@/utils/login/authenticate';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<any> {
  const { username, password } = await request.json();
  const isAuthenticated = await authLogin({username, password});
  
  return NextResponse.json({ isAuthenticated });
}