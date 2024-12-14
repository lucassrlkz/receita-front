import React from 'react';
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
import { cnaeFiltersSchema, CnaeFiltersFormData } from "./cnaeZodSchema";

interface CnaeFiltersProps {
  selectedCnae: string;
  onSubmit: (data: CnaeFiltersFormData) => void;
}

export function CnaeFilters({ selectedCnae, onSubmit }: CnaeFiltersProps) {
  // Initialize the form with react-hook-form and Zod
  const form = useForm<CnaeFiltersFormData>({
    resolver: zodResolver(cnaeFiltersSchema),
    defaultValues: {
      cnae: selectedCnae,
      estado: "",
      cidade: "",
      capitalSocial: 0
    }
  });

  // Handle form submission
  const handleSubmit = (data: CnaeFiltersFormData) => {
    onSubmit(data);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(handleSubmit)} 
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Filtros para CNAE: {selectedCnae}
          </h2>

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

          <Button 
            type="submit" 
            className="w-full"
          >
            Aplicar Filtros
          </Button>
        </form>
      </Form>
    </div>
  );
}