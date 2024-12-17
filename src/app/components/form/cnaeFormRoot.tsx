import React, { useState } from 'react';
import { CnaeSelector } from './cnaeSelector';
import { CnaeFilters } from './cnaeFilters';
import { CnaeFiltersFormData } from './cnaeZodSchema';
import type {TableDataProps} from "./types/form.types";


export function CnaeFormRoot() {
  const [selectedCnae, setSelectedCnae] = useState('');
  
  // Add state for table data
  const [tableData, setTableData] = useState([]);

  function handleCnaeSelect(cnae: string) {
    setSelectedCnae(cnae);
  };
  
  function handleResetCnae() {
    setSelectedCnae('');
  };

  const handleFilterSubmit = async (filters: CnaeFiltersFormData) => {
    console.log("Filters submitted:", filters);
    try {
      // const response = await fetch('/api')
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filters),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("front-end Data:", data);
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