import React, { useState } from 'react';
import { CnaeSelector } from './cnaeSelector';
import { CnaeFilters } from './cnaeFilters';
import { CnaeFiltersFormData } from './cnaeZodSchema';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import type { TableDataProps } from './types/form.types';

export function CnaeFormRoot() {
  const router = useRouter();

  const [selectedCnae, setSelectedCnae] = useState('');  
  // Add state for table data
  const [tableData, setTableData] = useState<
    TableDataProps
  >({ total_rows: '0', results: [] });
  
  function handleLogout(){
      sessionStorage.setItem('isAuthenticated', 'false');
      router.push('/');
  }

  function handleCnaeSelect(cnae: string) {
    setSelectedCnae(cnae);
  };
  
  function handleResetCnae() {
    setSelectedCnae('');
  };

  const handleFilterSubmit = async (filters: CnaeFiltersFormData) => {
      // const response = await fetch('/api')
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filters),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      setTableData(data);
  };
 
  return (
    <div className="container mx-auto p-4 space-y-4">
      {!selectedCnae ? (
        <>
          <Button
            onClick={handleLogout}
            className="fixed top-6 right-6 z-50 bg-red-600 hover:bg-red-700 text-white"
            >
            Logout
          </Button>
          <CnaeSelector onSelectCnae={handleCnaeSelect} />
        </>
      ) : (
        <CnaeFilters 
          selectedCnae={selectedCnae} 
          onSubmit={handleFilterSubmit}
          onResetCnae={handleResetCnae}
          tableData={tableData}
          handleLogout={handleLogout}
        />
      )}
    </div>
  );
}