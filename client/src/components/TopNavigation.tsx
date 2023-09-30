import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { useServicesContext } from "../services/ServicesContext";
import cieloAdaLogo from "../images/cieloada.svg";
import "./TopNavigation.css";

const TopNavigation: React.FC = () => {
  const location = useLocation();
  const { loginService, i18nService } = useServicesContext();
  const translate = i18nService.translate;

  // Estado para armazenar o usuário logado
  const [loggedUser, setLoggedUser] = useState(loginService.getLogin());
  const [userLanguage, setUserLanguage] = useState(i18nService.userPreferredLanguage);
  const navigate = useNavigate();

  // Função para lidar com a mudança de usuário
  const changeLogin = (event: SelectChangeEvent<HTMLInputElement>) => {
    loginService.loginAs(event.target.value)
    setLoggedUser(event.target.value);
    location.pathname === '/homepage'
    ? navigate('./')
    : navigate('./homepage');
  };

  // Função para lidar com a mudança de idioma
  const changeLanguage = (event: SelectChangeEvent<HTMLInputElement>) => {
    i18nService.setUserPreferredLanguage(event.target.value);
    setUserLanguage(event.target.value);
    console.log('location:', location)
    location.pathname === '/homepage'
    ? navigate('./')
    : navigate('./homepage');
  };

  return (
    <nav>
      <AppBar position="static">
        <Toolbar className="toolbar">
          <Button
            color="inherit"
            className={loggedUser}
            component={Link}
            to="/"
          >
            <img className="logo" src={cieloAdaLogo} alt="Cielo Ada Logo" />
          </Button>
          <Button
            color="inherit"
            className={loggedUser}
            component={Link}
            to="/"
          >
            {translate("homePage")}
          </Button>
          {loggedUser === "loggedIn" && (
            <>
              <Button
                color="inherit"
                className={loggedUser}
                component={Link}
                to="./add"
              >
                {translate("menuAdd")}
              </Button>
              <Button
                color="inherit"
                className={loggedUser}
                component={Link}
                to="./search"
              >
                {translate("menuSearch")}
              </Button>
              <Button
                color="inherit"
                className={loggedUser}
                component={Link}
                to="./fila-de-atendimento"
              >
                {translate("menuQueue")}
              </Button>
            </>
          )}
          <div style={{ flexGrow: 1 }}></div>
          <Select
            value={loggedUser}
            onChange={changeLogin}
            label={translate("selectOption")}
          >
            <MenuItem value="loggedIn">{translate("loggedIn")}</MenuItem>
            <MenuItem value="loggedOut">{translate("loggedOut")}</MenuItem>
          </Select>
          <div style={{ width: "10px" }}></div>

          <Select
            value={i18nService.userPreferredLanguage}
            onChange={changeLanguage}
            label={translate("selectOption")}
          >
            <MenuItem value="pt_br">{translate("pt_br")}</MenuItem>
            <MenuItem value="en">{translate("en")}</MenuItem>
          </Select>
        </Toolbar>
      </AppBar>
    </nav>
  );
};

export default TopNavigation;
