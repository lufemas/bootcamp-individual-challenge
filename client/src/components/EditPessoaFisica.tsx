import React, { useState, ChangeEvent, FormEvent } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useServicesContext } from '../services/ServicesContext';

interface FormData {
  cpf: string;
  mcc: string;
  nome: string;
  email: string;
}

interface EditPessoaFisicaProps {
  id: number;
  initialData: any;
  onEditComplete: () => void;
}

const EditPessoaFisica: React.FC<EditPessoaFisicaProps> = ({
  id,
  initialData,
  onEditComplete,
}) => {
  const { apiService, i18nService } = useServicesContext();
  const translate = i18nService.translate;

  const [formData, setFormData] = useState<FormData>({
    ...initialData,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Sending...');
    await apiService.updatePessoaFisica(id, formData);
    console.log(formData);
    onEditComplete(); // Call a callback function to handle the edit completion
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box mb={2}>
        <TextField
          fullWidth
          label="CPF"
          name="cpf"
          type="text"
          variant="outlined"
          value={formData.cpf}
          onChange={handleChange}
          inputProps={{
            maxLength: 11,
            pattern: '^[0-9]*$',
            title: translate('invalidCPF'),
          }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          label="MCC"
          name="mcc"
          type="text"
          variant="outlined"
          value={formData.mcc}
          onChange={handleChange}
          inputProps={{
            maxLength: 4,
            pattern: '^[0-9]*$',
          }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          label="Nome"
          name="nome"
          type="text"
          variant="outlined"
          value={formData.nome}
          onChange={handleChange}
          inputProps={{ maxLength: 50 }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          variant="outlined"
          value={formData.email}
          onChange={handleChange}
          inputProps={{
            pattern: '^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$',
          }}
        />
      </Box>
      <Button type="submit" variant="contained" color="primary">
        {translate('edit')}
      </Button>
    </form>
  );
};

export default EditPessoaFisica;
