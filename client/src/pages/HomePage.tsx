import React, { useEffect, useState } from "react";
import { useServicesContext } from "../services/ServicesContext";
import { Card, CardContent, TextField, Typography } from "@mui/material";

interface HomePageProps {
  children: React.ReactNode;
}

const HomePage: React.FC = () => {
  const { loginService, i18nService, apiService } = useServicesContext();
  const translate = i18nService.translate;

  const [loggedUser, setLoggedUser] = useState("");
  const [baseUrl, setBaseUrl] = useState(apiService.getBaseUrl());

  // Função para mudar a URL base do servidor
  const baseUrlchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBaseUrl(event.target.value);
  };

  useEffect(() => {
    setLoggedUser(loginService.getLogin());
  }, []);

  useEffect(() => {
    apiService.setBaseUrl(baseUrl);
  }, [apiService, baseUrl]);
  return (
    <div>
      <Typography variant="h3">{translate("homepage")}</Typography>
      {/* {loggedUser ? <p>Usuário logado: {translate(loggedUser)}</p> : <p>Falha na autenticacão</p>} */}
      <br />
      <br />
      <Card sx={{ minWidth: 275, maxWidth: 400 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {translate("loggeduser")}:
          </Typography>
          <Typography variant="h6" component="div">
            {translate(loggedUser)}
          </Typography>
          <br />
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {translate("serveraddress")}:
          </Typography>
          <TextField
            id="server"
            label={translate("serveraddress")}
            variant="filled"
            value={baseUrl}
            onChange={baseUrlchange}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;
