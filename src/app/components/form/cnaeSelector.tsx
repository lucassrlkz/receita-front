import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cnaeSchema, CnaeFormData } from "./cnaeZodSchema";
import { useState } from "react";
import {CnaeOptionsProps} from "./types/form.types";

import cnaeData from '../../../utils/cnae.json';

interface CnaeSelectorProps {
  onSelectCnae: (cnae: string) => void;
}

// CNAE options
const cnaeOptions = cnaeData as CnaeOptionsProps[];

export function CnaeSelector({ onSelectCnae }: CnaeSelectorProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize the form with react-hook-form and Zod
  const form = useForm<CnaeFormData>({
    resolver: zodResolver(cnaeSchema),
    defaultValues: {
      cnae: "",
    }
  });

  // Handle form submission
  function handleSubmit(data: CnaeFormData){
    setIsSubmitting(true);
    onSelectCnae(data.cnae);
    // console.log("cnae:",data.cnae);
    setIsSubmitting(false);
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
          {<FormField
            control={form.control}
            name="cnae"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CNAE</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Selecione ou digite o CNAE" 
                        list="cnae-options"
                        {...field} 
                      />
                    </FormControl>
                  
                  {/* <div className="w-full max-h-60 overflow-y-auto">
                    <div className="grid gap-2">
                      {cnaeOptions.map((option) => (
                        <div 
                          key={option.id} 
                          className="flex justify-between hover:bg-gray-100 p-2 cursor-pointer"
                          onClick={() => {
                            form.setValue('cnae', option.id);setOpen(false);
                          }}
                        >
                          <span className="text-gray-600 text-sm">{option.description}</span>
                          <span className="font-medium">{option.id}</span>
                        </div>
                      ))}
                    </div>
                  </div> */}
                
                {/* Hidden datalist for browser autocomplete support */}
                <datalist id="cnae-options">
                  {cnaeOptions.map((option) => (
                    <option onClick={()=> form.setValue('cnae', option.id)} key={option.id} value={option.id}>
                      {option.description}
                    </option>
                  ))}
                </datalist>
                
                <FormMessage />
              </FormItem>
            )}
          />}
  
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Pesquisando...' : 'Pesquisar CNAE'}
          </Button>
        </form>
      </Form>
    </div>
  );
}


