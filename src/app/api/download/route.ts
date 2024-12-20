import { createFile } from '@/utils/exportFile';
import { queryEstabelecimentos} from '@/database/queries';
import fs from 'fs';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<any> {
  let filename;
  
  const {cnae, estado, cidade} = await request.json();
  
  const existFileName = `estabelecimentos-${cnae}-${estado}-${cidade}.csv`;

  if(!cnae || !estado || !cidade){
    return NextResponse.json({error: 'One or more missing parameters: cnae, estado, cidade'}, { status: 400 });
  }

  if (!fs.existsSync(existFileName)) {
    const data = await queryEstabelecimentos(cnae, estado, cidade); 
    filename = await createFile(data,{cnae, estado, cidade});
  
  }else{
    filename = existFileName;
  }
  
  const fileBuffer = fs.readFileSync(filename);
  
  return new NextResponse(fileBuffer, {
    headers: {
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Type': 'text/csv',
    },
  });
}
