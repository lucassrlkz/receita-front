import { NextResponse } from 'next/server';
import { estabelecimentoQueryLimit, estabelecimentoQueryCount} from '@/database/queries';

export async function POST(request: Request) {
  const {cnae, estado, cidade} = await request.json();
  
  const rows = await estabelecimentoQueryCount(cnae, estado, cidade);
  const response = await estabelecimentoQueryLimit(cnae, estado, cidade);
  
  const results ={
    results:response,
    total_rows:rows[0].count
  }

  return NextResponse.json(results);
}