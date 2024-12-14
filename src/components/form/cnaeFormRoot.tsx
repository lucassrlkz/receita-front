import React, { useState } from 'react';
import { CnaeSelector } from './cnaeSelector';
import { CnaeFilters } from './cnaeFilters';
import { CnaeFiltersFormData } from './cnaeZodSchema';

export function CnaeFormRoot() {
  const [selectedCnae, setSelectedCnae] = useState('');

  const handleCnaeSelect = (cnae: string) => {
    setSelectedCnae(cnae);
  };
  
  const handleResetCnae = () => {
    setSelectedCnae('');
  };

  const handleFilterSubmit = (filters: CnaeFiltersFormData) => {
      try {
        // Process form data
        console.log("Formulário enviado com sucesso!\n");
        
        console.log('Submitted Filters:', filters);
      } catch (error) {
        
        console.error("Erro ao enviar formulário", error);
      }
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      {!selectedCnae ? (
        <CnaeSelector onSelectCnae={handleCnaeSelect} />
      ) : (
        <CnaeFilters 
          selectedCnae={selectedCnae} 
          onSubmit={handleFilterSubmit} 
          onResetCnae={handleResetCnae}
        />
      )}
    </div>
  );
}