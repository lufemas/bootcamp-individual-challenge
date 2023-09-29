import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { useServicesContext } from '../services/ServicesContext';

const emptyFormData = {
  id: '',
  cnpj: '',
  razaoSocial: '',
  mcc: '',
  cpfContato: '',
  nomeContato: '',
  emailContato: '',
};

const PessoaJuridicaQueue: React.FC = () => {
  const { apiService, i18nService } = useServicesContext();
  const translate = i18nService.translate;

  const [formData, setFormData] = useState(emptyFormData);
  const [formEnabled, setFormEnabled] = useState(false);
  const [queueEmpty, setQueueEmpty] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const fetchNextPessoaJuridica = async () => {
    try {
      const nextPessoaJuridica = await apiService.nextOnQueuePessoaJuridica();
      if (nextPessoaJuridica) {
        setFormData(nextPessoaJuridica);
        setFormEnabled(true);
      } else {
        setQueueEmpty(true);
      }
    } catch (error) {
      console.error('Error fetching next PessoaJuridica:', error);
    }
  };

  const handleSnackbarClose = () => {
    setQueueEmpty(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={fetchNextPessoaJuridica}
        disabled={formEnabled}
      >
        {translate("getNextFromQueue")}
      </Button>
      <br />
      <br />
      {formEnabled && (
        <Paper elevation={3} style={{ padding: '16px' }}>
          <Typography><b>{translate("id")}:</b> {formData.id}</Typography>
          <Typography><b>{translate("cnpj")}:</b> {formData.cnpj}</Typography>
          <Typography><b>{translate("razaoSocial")}:</b> {formData.razaoSocial}</Typography>
          <Typography><b>{translate("mcc")}:</b> {formData.mcc}</Typography>
          <Typography><b>{translate("cpfContato")}:</b> {formData.cpfContato}</Typography>
          <Typography><b>{translate("nomeContato")}:</b> {formData.nomeContato}</Typography>
          <Typography><b>{translate("emailContato")}:</b> {formData.emailContato}</Typography>
          <br />
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setFormEnabled(false)}
          >
            {translate("finish")}
          </Button>
        </Paper>
      )}
      <Snackbar
        open={queueEmpty}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={translate("queueIsEmpty")}
      />
    </div>
  );
};

export default PessoaJuridicaQueue;
