import React, { useState, useEffect, ChangeEvent } from 'react';
import DataTable from '../components/DataTable';
import { useServicesContext } from '../services/ServicesContext';

function SearchPage() {
  const { apiService, i18nService } = useServicesContext();
  const translate = i18nService.translate;

  const [selectedOption, setSelectedOption] = useState<string>('pessoaJuridica');
  const [data, setData] = useState<any[]>([]);

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
      console.log(fetchedData)
      setData(fetchedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <div>
        <label>
          <input
            type="radio"
            value="pessoaJuridica"
            checked={selectedOption === 'pessoaJuridica'}
            onChange={handleOptionChange}
          />
          Pessoa Juridica
        </label>
        <label>
          <input
            type="radio"
            value="pessoaFisica"
            checked={selectedOption === 'pessoaFisica'}
            onChange={handleOptionChange}
          />
          Pessoa Fisica
        </label>
      </div>
      <DataTable data={data} />
    </div>
  );
}

export default SearchPage;
