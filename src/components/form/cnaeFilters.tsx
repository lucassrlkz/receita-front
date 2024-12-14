import { useState} from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { cnaeFiltersSchema, CnaeFiltersFormData } from "./cnaeZodSchema";

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
import {Popover,PopoverTrigger, PopoverContent} from "@/components/ui/popover";

import stateData from "../../utils/estado.json";
import cityData from "../../utils/cidade.json";
import estadosCidades from "../../utils/estados-cidades.json";
import type {StateProps, CityProps, CityByStateProps} from "./types/form.types";

interface CnaeFiltersProps {
  selectedCnae: string;
  onSubmit: (data: CnaeFiltersFormData) => void;
  onResetCnae: () => void;
}

// read data from file using types
const stateOptions: StateProps[] = stateData.UF;
const cityOptions: CityProps[] = cityData;
const cityByState: CityByStateProps = estadosCidades

export function CnaeFilters({ selectedCnae, onSubmit, onResetCnae }: CnaeFiltersProps) {
  const [openState, setOpenState] = useState(false);
  const [state, setState] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

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
    <div className="flex min-h-screen">
      {/* Toggle Button */}
      <button
        onClick={() => setIsFormOpen(!isFormOpen)}
        className="fixed top-6 left-6 z-50 p-2 bg-slate-900 text-white rounded-md"
      >
        {isFormOpen ? "✕" : "FILTROS"}
      </button>

      {/* Sliding Panel */}
      <aside 
        className={`fixed top-0 left-0 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 
        ${isFormOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="w-[400px] flex p-6 mt-16">
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
                    <Popover open={openState} onOpenChange={setOpenState}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Input 
                            placeholder="Selecione o estado" 
                            list="state-options"
                            {...field} 
                            />
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-96 max-h-60 overflow-y-auto">
                        <div className="grid gap-2">
                          {stateOptions.map((option) => (
                            <div 
                            key={option.sigla} 
                            className="flex justify-between hover:bg-gray-100 p-2 cursor-pointer"
                            onClick={() => {
                              form.setValue('estado', option.sigla); setState(option.sigla);setOpenState(false);
                              }}
                              >
                              <span className="text-gray-600 text-sm">{option.nome}</span>
                              <span className="font-medium">{option.sigla}</span>
                            </div>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                
                    {/* Hidden datalist for browser autocomplete support */}
                    <datalist id="state-options">
                      {stateOptions.map((option) => (
                        <option key={option.sigla} value={option.sigla}>
                          {option.nome}
                        </option>
                      ))}
                    </datalist>
                
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* City Field */}
              <FormField
                control={form.control}
                name="cidade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cidade</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Digite para buscar a cidade"
                        list="city-options"
                        {...field}
                        />
                    </FormControl>
                    {state ? (
                      <datalist id="city-options">
                        {cityByState.estados.find(estado => estado.sigla === state)?.cities.map((city: { id: string; nome: string }) => (
                          <option key={city.id} value={city.id}>
                            {city.nome}
                          </option>
                        ))}
                      </datalist>
                    ) : (
                      <datalist id="city-options">
                        {cityOptions.map((option) => (
                          <option  key={option.id} value={option.id}>
                            {option.description}
                          </option>
                        ))}
                      </datalist>
                    )}
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
                onClick={()=> setIsFormOpen(!isFormOpen)}
              >
                Aplicar Filtros
              </Button>
              <Button 
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => {
                  form.reset({
                    cnae: selectedCnae,
                    estado: "",
                    cidade: "",
                    capitalSocial: 0
                  });
                  setState('');
                }}
                >
                Limpar Formulário
              </Button>
              <Button 
                onClick={onResetCnae} 
                className="w-full"
                >
                Procurar outro CNAE
              </Button>
            </form>
          </Form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <div id="table" className="bg-white shadow-md rounded-lg p-6">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">CNAE</th>
                <th className="text-left p-2">Estado</th>
                <th className="text-left p-2">Cidade</th>
                <th className="text-right p-2">Capital Social</th>
              </tr>
            </thead>
            <tbody>
              {/* Table data rows */}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}