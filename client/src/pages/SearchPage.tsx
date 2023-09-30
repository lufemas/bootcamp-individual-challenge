import React, { useState, useEffect, ChangeEvent } from 'react';
import DataTable from '../components/DataTable';
import { useServicesContext } from '../services/ServicesContext';
import EditPessoaFisica from '../components/EditPessoaFisica';
import EditPessoaJuridica from '../components/EditPessoaJuridica';
import { Typography } from '@mui/material';

function SearchPage() {
  const { apiService, i18nService } = useServicesContext();
  const translate = i18nService.translate;

  const [selectedOption, setSelectedOption] = useState<string>('pessoaJuridica');
  const [data, setData] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingData, setEditingData] = useState<{ [key: string]: any } | null>(null);

  useEffect(() => {
    fetchData();
  }, [selectedOption]);

  const fetchData = async () => {
    try {
      let fetchedData: any[] = [];

      if (selectedOption === 'pessoaJuridica') {
        const response = await apiService.getAllPessoaJuridica();
        fetchedData = response.data;
      } else if (selectedOption === 'pessoaFisica') {
        const response = await apiService.getAllPessoaFisica();
        fetchedData = response.data;
      }
      setData(fetchedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleEdit = (id: number, itemData: { [key: string]: any }) => {
    setEditingId(id); // Set the ID of the item being edited
    setEditingData(itemData); // Set the data of the item being edited
  };

  const handleEditComplete = () => {
    setEditingId(null); // Reset the editing state
    fetchData(); // Refetch data after editing
  };

  return (
    <div>
      <div>
        <Typography>
          <input
            type="radio"
            value="pessoaJuridica"
            checked={selectedOption === 'pessoaJuridica'}
            onChange={handleOptionChange}
          />
          Pessoa Juridica
        </Typography>
        <Typography>
          <input
            type="radio"
            value="pessoaFisica"
            checked={selectedOption === 'pessoaFisica'}
            onChange={handleOptionChange}
          />
          Pessoa Fisica
        </Typography>
      </div>
      <br />

      <DataTable
        data={data}
        clientType={selectedOption}
        onEdit={handleEdit}
        onDelete={fetchData}
      />
      <br />
      {editingId !== null && (
        selectedOption === 'pessoaFisica'
        ? (<EditPessoaFisica
            id={editingId}
            initialData={editingData}
            onEditComplete={handleEditComplete}
          />)
        : <EditPessoaJuridica
            id={editingId}
            initialData={editingData}
            onEditComplete={handleEditComplete}
          />
      )}
    </div>
  );
}

export default SearchPage;
