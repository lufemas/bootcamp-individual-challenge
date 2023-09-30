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

const initialFormData: FormData = {
  cpf: '',
  mcc: '',
  nome: '',
  email: '',
};

const AddPessoaFisica: React.FC = () => {
  const { apiService, i18nService } = useServicesContext();
  const translate = i18nService.translate;

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateField = (fieldName: keyof FormData) => {
    switch (fieldName) {
      case 'cpf':
        return /^\d{11}$/.test(formData.cpf)
          ? null
          : translate('invalidCpf');
      case 'mcc':
        return formData.mcc.length <= 4
          ? null
          : translate('mccTooLong4Max');
      case 'nome':
        return formData.nome.length <= 50
          ? null
          : translate('nameTooLong50Max');
      case 'email':
        return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(
          formData.email
        )
          ? null
          : translate('invalidEmail');
      default:
        return null;
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate all fields
    const validationErrors: Partial<FormData> = {};
    for (const fieldName of Object.keys(formData) as Array<keyof FormData>) {
      const validationError = validateField(fieldName);
      if (validationError !== null) {
        validationErrors[fieldName] = validationError;
      }
    }

    if (Object.keys(validationErrors).length === 0) {
      console.log('Sending...');
      await apiService.createPessoaFisica(formData);
      console.log(formData);

      // Reset the form after a successful submission
      setFormData(initialFormData);
    } else {
      console.log('Form validation failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box mb={2}>
        <TextField
          fullWidth
          label={translate('cpf')}
          name="cpf"
          type="text"
          variant="outlined"
          value={formData.cpf}
          onChange={handleChange}
          inputProps={{
            maxLength: 11,
            pattern: '^[0-9]*$',
            title: 'Invalid CPF (11 digits with leading zeros)',
          }}
          error={Boolean(validateField('cpf'))}
          helperText={validateField('cpf')}
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          label={translate('mcc')}
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
          label={translate('name')}
          name="nome"
          type="text"
          variant="outlined"
          value={formData.nome}
          onChange={handleChange}
          inputProps={{ maxLength: 50 }}
          error={Boolean(validateField('nome'))}
          helperText={validateField('nome')}
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          label={translate('email')}
          name="email"
          type="email"
          variant="outlined"
          value={formData.email}
          onChange={handleChange}
          inputProps={{
            pattern: '^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$',
          }}
          error={Boolean(validateField('email'))}
          helperText={validateField('email')}
        />
      </Box>
      <Button type="submit" variant="contained" color="primary">
        {translate('submit')}
      </Button>
    </form>
  );
};

export default AddPessoaFisica;
