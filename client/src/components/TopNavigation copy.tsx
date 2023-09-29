import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const { loginService, i18nService } = useServicesContext();
  const translate = i18nService.translate;
  // Estado para armazenar o usuário logado
  const [loggedUser, setLoggedUser] = useState(loginService.getLogin());
  const navigate = useNavigate();
  // Função para lidar com a mudança de usuário
  const changeLogin = (event: SelectChangeEvent<HTMLInputElement>) => {
    setLoggedUser(loginService.loginAs(event.target.value));
    navigate(`./${event.target.value}`);
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
          {loggedUser === "customer" && (
            <Button
              color="inherit"
              className={loggedUser}
              component={Link}
              to="./send-message"
            >
              {translate("menuSendMessage")}
            </Button>
          )}
          {loggedUser === "administrator" && (
            <>
              <Button
                color="inherit"
                className={loggedUser}
                component={Link}
                to="./list-messages"
              >
                {translate("menuListMessages")}
              </Button>
              {/* Não Implementado
              <Button
                color="inherit"
                className={loggedUser}
                component={Link}
                to="./consume-message"
              >
                {translate("menuConsumeMessage")}
              </Button> */}
            </>
          )}
          <div style={{ flexGrow: 1 }}></div>
          <Select
            value={loggedUser}
            onChange={changeLogin}
            label={translate("selectOption")}
          >
            <MenuItem value="none">{translate("loggedout")}</MenuItem>
            <MenuItem value="customer">{translate("customer")}</MenuItem>
            <MenuItem value="administrator">
              {translate("administrator")}
            </MenuItem>
          </Select>
        </Toolbar>
      </AppBar>
    </nav>
  );
};

export default TopNavigation;
