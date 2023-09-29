import React, { useState, ChangeEvent, FormEvent } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useServicesContext } from '../services/ServicesContext';

interface FormData {
  cnpj: string;
  razaoSocial: string;
  mcc: string;
  cpfContato: string;
  nomeContato: string;
  emailContato: string;
}

const AddPessoaJuridica: React.FC = () => {
  const { apiService, i18nService } = useServicesContext();
  const translate = i18nService.translate;

  const [formData, setFormData] = useState<FormData>({
    cnpj: '',
    razaoSocial: '',
    mcc: '',
    cpfContato: '',
    nomeContato: '',
    emailContato: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    console.log('Sending...');
    await apiService.createPessoaJuridica(formData);
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box mb={2}>
        <TextField
          fullWidth
          label="CNPJ"
          name="cnpj"
          type="text"
          variant="outlined"
          value={formData.cnpj}
          onChange={handleChange}
          inputProps={{ maxLength: 14 }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          label="Razão Social"
          name="razaoSocial"
          type="text"
          variant="outlined"
          value={formData.razaoSocial}
          onChange={handleChange}
          inputProps={{ maxLength: 50 }}
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
          inputProps={{ maxLength: 4 }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          label="CPF do Contato"
          name="cpfContato"
          type="text"
          variant="outlined"
          value={formData.cpfContato}
          onChange={handleChange}
          inputProps={{ maxLength: 11 }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          label="Nome do Contato"
          name="nomeContato"
          type="text"
          variant="outlined"
          value={formData.nomeContato}
          onChange={handleChange}
          inputProps={{ maxLength: 50 }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          label="Email do Contato"
          name="emailContato"
          type="email"
          variant="outlined"
          value={formData.emailContato}
          onChange={handleChange}
          inputProps={{
            pattern: '^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$',
          }}
        />
      </Box>
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default AddPessoaJuridica;
