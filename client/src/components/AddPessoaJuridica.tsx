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

const initialFormData: FormData = {
  cnpj: '',
  razaoSocial: '',
  mcc: '',
  cpfContato: '',
  nomeContato: '',
  emailContato: '',
};

const AddPessoaJuridica: React.FC = () => {
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
      case 'cnpj':
        return /^\d{14}$/.test(formData.cnpj)
          ? null
          : translate('invalidCnpj');
      case 'razaoSocial':
        return formData.razaoSocial.length <= 50
          ? null
          : translate('nameTooLong50Max');
      case 'mcc':
        return formData.mcc.length <= 4
          ? null
          : translate('mccTooLong4Max');
      case 'cpfContato':
        return /^\d{11}$/.test(formData.cpfContato)
          ? null
          : translate('invalidCpf');
      case 'nomeContato':
        return formData.nomeContato.length <= 50
          ? null
          : translate('nameTooLong50Max');
      case 'emailContato':
        return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(
          formData.emailContato
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
      await apiService.createPessoaJuridica(formData);
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
          label={translate('cnpj')}
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
          label={translate('razaoSocial')}
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
          label={translate('cpfContato')}
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
          label={translate('nomeContato')}
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
          label={translate('emailContato')}
          name="emailContato"
          type="email"
          variant="outlined"
          value={formData.emailContato}
          onChange={handleChange}
          inputProps={{
            pattern: '^([a-zA-Z0-9_\-\\.]+)@([a-zA-Z0-9_\-\\.]+)\\.([a-zA-Z]{2,5})$',
          }}
          error={Boolean(validateField('emailContato'))}
          helperText={validateField('emailContato')}
        />
      </Box>
      <Button type="submit" variant="contained" color="primary">
        {translate('submit')}
      </Button>
    </form>
  );
};

export default AddPessoaJuridica;
