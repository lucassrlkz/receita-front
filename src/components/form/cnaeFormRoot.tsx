import React, { useState } from 'react';
import { CnaeSelector } from './cnaeSelector';
import { CnaeFilters } from './cnaeFilters';
import { CnaeFiltersFormData } from './cnaeZodSchema';

export function CnaeFormRoot() {
  const [selectedCnae, setSelectedCnae] = useState('');

  const handleCnaeSelect = (cnae: string) => {
    setSelectedCnae(cnae);
  };

  const handleFilterSubmit = (filters: CnaeFiltersFormData) => {
    // 'use server'
    //   try {
    //     // Process form data
    //     console.log(data);
        
    //     // Optional: show success toast
    //     console.log("Formulário enviado com sucesso!");
    //   } catch (error) {
    //     // Optional: show error toast
    //     console.error("Erro ao enviar formulário", error);
    //   }
    
    // This is where you would typically send the data to an API or process it
    console.log('Submitted Filters:', filters);
    
    // Example: You might want to call an API here
    // await submitFilters(filters);
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      {!selectedCnae ? (
        <CnaeSelector onSelectCnae={handleCnaeSelect} />
      ) : (
        <CnaeFilters 
          selectedCnae={selectedCnae} 
          onSubmit={handleFilterSubmit} 
        />
      )}
    </div>
  );
}