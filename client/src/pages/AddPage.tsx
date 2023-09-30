import {
  Card,
  CardContent,
  Grid,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Box,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useServicesContext } from "../services/ServicesContext";
import Spinner from "../components/Spinner";
import PermissionCheck from "../components/PermissionCheck";
import AddPessoaJuridica from "../components/AddPessoaJuridica";
import AddPessoaFisica from "../components/AddPessoaFisica";

const AddPage: React.FC = () => {
  const { apiService, i18nService } = useServicesContext();
  const translate = i18nService.translate;
  const isMobile = useMediaQuery('(max-width: 600px)'); // Adjust max-width as needed

  const [selectedForm, setSelectedForm] = useState("pessoaJuridica"); // Default form

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedForm(event.target.value);
  };

  return (
    <PermissionCheck allowedRoles={["loggedIn"]}>
      <Typography variant="h4" align="center" gutterBottom>
        {translate("addCustomer")}
      </Typography>
      <Box mt={2} mx="auto" maxWidth={isMobile ? "100%" : "600px"}> {/* Adjust the maxWidth value */}
        <RadioGroup
          aria-label="Customer Type"
          name="customerType"
          value={selectedForm}
          onChange={handleFormChange}
        >
          <FormControlLabel
            value="pessoaJuridica"
            control={<Radio />}
            label="Pessoa Jurídica"
          />
          <FormControlLabel
            value="pessoaFisica"
            control={<Radio />}
            label="Pessoa Física"
          />
        </RadioGroup>
        <Card>
          <CardContent>
            {selectedForm === "pessoaJuridica" ? <AddPessoaJuridica /> : <AddPessoaFisica />}
          </CardContent>
        </Card>
      </Box>
    </PermissionCheck>
  );
};

export default AddPage;
