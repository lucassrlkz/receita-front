import React, { useState } from 'react';
import { CnaeSelector } from './cnaeSelector';
import { CnaeFilters } from './cnaeFilters';
import { CnaeFiltersFormData } from './cnaeZodSchema';
import type {TableDataProps} from "./types/form.types";


export function CnaeFormRoot() {
  const [selectedCnae, setSelectedCnae] = useState('');
  
  // Add state for table data
  const [tableData, setTableData] = useState<TableDataProps[]>([]);

  const handleCnaeSelect = (cnae: string) => {
    setSelectedCnae(cnae);
  };
  
  const handleResetCnae = () => {
    setSelectedCnae('');
  };

  const handleFilterSubmit = async (filters: CnaeFiltersFormData) => {
    console.log("Filters:", filters); 
    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filters),
      });

      const data = await response.json();

     setTableData(data.results);

    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };


  // Update the JSX to pass tableData
  return (
    <div className="container mx-auto p-4 space-y-4">
      {!selectedCnae ? (
        <CnaeSelector onSelectCnae={handleCnaeSelect} />
      ) : (
        <CnaeFilters 
          selectedCnae={selectedCnae} 
          onSubmit={handleFilterSubmit}
          onResetCnae={handleResetCnae}
          tableData={tableData}
        />
      )}
    </div>
  );
}