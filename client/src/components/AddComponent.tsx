import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useServicesContext } from "../services/ServicesContext";
import Spinner from "./Spinner";

const ClientRegistrationForm: React.FC = () => {
  const { apiService, i18nService } = useServicesContext();
  const translate = i18nService.translate;

  const [isPessoaJuridica, setIsPessoaJuridica] = useState<boolean>(false);
  const [cnpj, setCnpj] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [razaoSocial, setRazaoSocial] = useState<string>("");
  const [mcc, setMcc] = useState<string>("");
  const [cpfContato, setCpfContato] = useState<string>("");
  const [nomeContato, setNomeContato] = useState<string>("");
  const [emailContato, setEmailContato] = useState<string>("");

  const [isSendingMessage, setIsSendingMessage] = useState<boolean>(false);

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setIsPessoaJuridica(e.target.value === "pessoaJuridica");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSendingMessage(true);

    const clientData = {
      isPessoaJuridica,
      cnpj,
      razaoSocial,
      mcc,
      cpfContato,
      nomeContato,
      emailContato,
    };

    // Call your API service to submit the client registration data here
    // Example: const response = await apiService.registerClient(clientData);

    // Handle the response and show appropriate messages

    setIsSendingMessage(false);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        {translate("clientregistration")}
      </Typography>
      <form onSubmit={handleSubmit}>
        <RadioGroup
          aria-label="Tipo de Cliente"
          name="tipoCliente"
          value={isPessoaJuridica ? "pessoaJuridica" : "pessoaFisica"}
          onChange={handleRadioChange}
        >
          <FormControlLabel
            value="pessoaJuridica"
            control={<Radio />}
            label={translate("pessoaJuridica")}
          />
          <FormControlLabel
            value="pessoaFisica"
            control={<Radio />}
            label={translate("pessoaFisica")}
          />
        </RadioGroup>

        {/* Render fields based on the selected option */}
        {isPessoaJuridica ? (
          // Fields for Pessoa Jurídica
          <div>
            <TextField
              fullWidth
              label={translate("cnpj")}
              variant="outlined"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label={translate("razaoSocial")}
              variant="outlined"
              value={razaoSocial}
              onChange={(e) => setRazaoSocial(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label={translate("mcc")}
              variant="outlined"
              value={mcc}
              onChange={(e) => setMcc(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label={translate("cpfContato")}
              variant="outlined"
              value={cpfContato}
              onChange={(e) => setCpfContato(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label={translate("nomeContato")}
              variant="outlined"
              value={nomeContato}
              onChange={(e) => setNomeContato(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label={translate("emailContato")}
              variant="outlined"
              value={emailContato}
              onChange={(e) => setEmailContato(e.target.value)}
              required
            />
          </div>
        ) : (
          // Fields for Pessoa Física
          <div>
            <TextField
              fullWidth
              label={translate("cpf")}
              variant="outlined"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              required
            />
            {/* Add other fields for Pessoa Física */}
          </div>
        )}

        <Button type="submit" variant="contained" color="primary" fullWidth>
          {translate("submit")}
        </Button>
      </form>

      {isSendingMessage && <Spinner />}
    </Container>
  );
};

export default ClientRegistrationForm;
