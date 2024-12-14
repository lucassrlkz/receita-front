import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { cnaeSchema, CnaeFormData } from "./cnaeZodSchema";
import * as cnaeData from '../../utils/cnaeJson.json';


// CNAE options
const cnaeOptions = cnaeData as {id:string, description:string}[];

interface CnaeSelectorProps {
  onSelectCnae: (cnae: string) => void;
}

export function CnaeSelector({ onSelectCnae }: CnaeSelectorProps) {
  // Initialize the form with react-hook-form and Zod
  const form = useForm<CnaeFormData>({
    resolver: zodResolver(cnaeSchema),
    defaultValues: {
      cnae: "",
    }
  });

  // Handle form submission
  const handleSubmit = (data: CnaeFormData) => {
    onSelectCnae(data.cnae);
    console.log("cnae:",data.cnae);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(handleSubmit)} 
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Seletor de CNAE
          </h2>
  
          {/* CNAE Field with Datalist */}
          <FormField
            control={form.control}
            name="cnae"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CNAE</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Input 
                        placeholder="Selecione ou digite o CNAE" 
                        list="cnae-options"
                        {...field} 
                      />
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full max-h-60 overflow-y-auto">
                    <div className="grid gap-2">
                      {cnaeOptions.map((option) => (
                        <div 
                          key={option.id} 
                          className="flex justify-between hover:bg-gray-100 p-2 cursor-pointer"
                          onClick={() => {
                            form.setValue('cnae', option.id);
                          }}
                        >
                          <span className="text-gray-600 text-sm">{option.description}</span>
                          <span className="font-medium">{option.id}</span>
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
                
                {/* Hidden datalist for browser autocomplete support */}
                <datalist id="cnae-options">
                  {cnaeOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.description}
                    </option>
                  ))}
                </datalist>
                
                <FormMessage />
              </FormItem>
            )}
          />
  
          <Button 
            type="submit" 
            className="w-full"
          >
            Pesquisar CNAE
          </Button>
        </form>
      </Form>
    </div>
  );
}


