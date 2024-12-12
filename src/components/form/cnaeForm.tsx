'use client'
import React from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import cnaeData from '../../utils/cnaeJson.json';

// Zod schema for form validation
const formSchema = z.object({
  cnae: z.string().min(1, "CNAE é obrigatório").max(80, "CNAE muito longo"),
  estado: z.string().max(50, "Estado muito longo").optional(),
  cidade: z.string().max(100, "Cidade muito longa").optional(),
  capitalSocial: z.coerce.number()
    .min(0, "Capital social não pode ser negativo")
    .optional(),
  outroFiltro: z.string().max(200, "Outro filtro muito longo").optional()
});

// Define types based on the schema
export type CnaeFormData = z.infer<typeof formSchema>;

// Props interface for the component
interface CnaeFormProps {
  onSubmit: (data: CnaeFormData) => Promise<void>;
}

// CNAE options
// create a type for this cnaeData from json file
const cnaeOptions = cnaeData;

export function CnaeForm({ onSubmit }: CnaeFormProps) {
  // Initialize the form with react-hook-form
  const form = useForm<CnaeFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cnae: "",
      estado: "",
      cidade: "",
      capitalSocial: 0,
      outroFiltro: ""
    }
  });

  // Handle form submission
  const handleSubmit = async (data: CnaeFormData) => {
    try {
      await onSubmit(data);
      // Optional: reset form after successful submission
      form.reset();
    } catch (error) {
      // Handle submission error
      console.error("Submission error", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(handleSubmit)} 
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Formulário CNAE
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
                        placeholder="Selecione ou digite o código CNAE" 
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
                            field.onChange(option.id);
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

          {/* Rest of the form remains the same */}
          {/* ... (previous fields) ... */}
          {/* Estado Field */}
          <FormField
            control={form.control}
            name="estado"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Digite o estado" 
                    {...field} 
                    value={field.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Cidade Field */}
          <FormField
            control={form.control}
            name="cidade"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cidade</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Digite a cidade" 
                    {...field} 
                    value={field.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Capital Social Field */}
          <FormField
            control={form.control}
            name="capitalSocial"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Capital Social</FormLabel>
                <FormControl>
                  <Input 
                    type="number"
                    placeholder="Digite o capital social" 
                    {...field} 
                    onChange={event => field.onChange(event.target.valueAsNumber || '')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Outro Filtro Field */}
          <FormField
            control={form.control}
            name="outroFiltro"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Outro Filtro</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Digite outro filtro" 
                    {...field} 
                    value={field.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> 

          <Button 
            type="submit" 
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Enviando..." : "Enviar"}
          </Button>
          
          <Button className="w-full" onClick={() => form.reset()} >Limpar</Button>
        </form>
      </Form>
    </div>
  );
}