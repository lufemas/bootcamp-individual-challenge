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

interface EditPessoaJuridicaProps {
  id: number;
  initialData: any;
  onEditComplete: () => void;
}

const EditPessoaJuridica: React.FC<EditPessoaJuridicaProps> = ({
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
    await apiService.updatePessoaJuridica(id, formData);
    console.log(formData);
    onEditComplete();
  };

  const validateField = (fieldName: keyof FormData) => {
    switch (fieldName) {
      case 'cnpj':
        return /^\d{14}$/.test(formData.cnpj)
          ? null
          : 'Invalid CNPJ (14 digits with leading zeros)';
      case 'razaoSocial':
        return formData.razaoSocial.length <= 50
          ? null
          : 'Razao Social is too long (maximum 50 characters)';
      case 'mcc':
        return formData.mcc.length <= 4
          ? null
          : 'MCC is too long (maximum 4 characters)';
      case 'cpfContato':
        return /^\d{11}$/.test(formData.cpfContato)
          ? null
          : 'Invalid CPF Contato (11 digits with leading zeros)';
      case 'nomeContato':
        return formData.nomeContato.length <= 50
          ? null
          : 'Nome Contato is too long (maximum 50 characters)';
      case 'emailContato':
        return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(
          formData.emailContato
        )
          ? null
          : 'Invalid Email Contato';
      default:
        return null;
    }
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
          inputProps={{
            maxLength: 14,
            pattern: '^[0-9]*$',
            title: 'Invalid CNPJ (14 digits with leading zeros)',
          }}
          error={Boolean(validateField('cnpj'))}
          helperText={validateField('cnpj')}
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          label="Razao Social"
          name="razaoSocial"
          type="text"
          variant="outlined"
          value={formData.razaoSocial}
          onChange={handleChange}
          inputProps={{ maxLength: 50 }}
          error={Boolean(validateField('razaoSocial'))}
          helperText={validateField('razaoSocial')}
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
          error={Boolean(validateField('mcc'))}
          helperText={validateField('mcc')}
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
          inputProps={{
            maxLength: 11,
            pattern: '^[0-9]*$',
            title: 'Invalid CPF Contato (11 digits with leading zeros)',
          }}
          error={Boolean(validateField('cpfContato'))}
          helperText={validateField('cpfContato')}
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
          error={Boolean(validateField('nomeContato'))}
          helperText={validateField('nomeContato')}
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
          error={Boolean(validateField('emailContato'))}
          helperText={validateField('emailContato')}
        />
      </Box>
      <Button type="submit" variant="contained" color="primary">
        {translate('edit')}
      </Button>
    </form>
  );
};

export default EditPessoaJuridica;
