import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(generateFakeData());
}

export async function POST(request: Request) {
  const filters = await request.json();
  console.log("api filters", filters);
  return NextResponse.json(generateFakeData());
}

function generateFakeData() {
  return {
    results: [
      {
        id: 1,
        cnae: "4751-2/01",
        estado: "SP",
        cidade: "São Paulo",
        capitalSocial: 50000
      },
      {
        id: 2,
        cnae: "4751-2/01",
        estado: "RJ",
        cidade: "Rio de Janeiro",
        capitalSocial: 75000
      },
      {
        id: 3,
        cnae: "4751-2/01",
        estado: "MG",
        cidade: "Belo Horizonte",
        capitalSocial: 25000
      }
    ],
    total: 3,
    page: 1,
    limit: 10
  };
}
