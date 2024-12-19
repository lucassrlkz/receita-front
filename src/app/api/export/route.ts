import { NextResponse } from 'next/server';
import { queryEstabelecimentos} from '@/database/queries';


export async function POST(request: Request) {
  const {cnae, estado, cidade} = await request.json();
  const response = await queryEstabelecimentos(cnae, estado, cidade);
  
  const results ={
    results:response
  }

  return NextResponse.json(results);
}

