import { CnaeFiltersFormData } from "@/app/components/form/cnaeZodSchema";

export default function downloadFile(blob:Blob, data:CnaeFiltersFormData):void{
  const date = new Date();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.href = url;
  link.download = `estabelecimentos-${data.cnae}-${data.estado}-${data.cidade}-(${date.toLocaleDateString('pt-BR')}).csv`;
  
  document.body.appendChild(link);
  
  link.click();
  link.remove();
  
  window.URL.revokeObjectURL(url);
}