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

const MessageForm: React.FC = () => {
  const { apiService, i18nService } = useServicesContext();
  const translate = i18nService.translate;

  const [message, setMessage] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("sugestao");
  const [isSendingMessage, setIsSendingMessage] = useState<boolean>(false);

  const handleSuggestionChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setMessage(e.target.value);
  };

  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSelectedType(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSendingMessage(true);
    const response = await apiService.sendMessage(message, selectedType);
    console.log("[MessageForm.tsx] response:", response);
    if(response.status === 201) {
      alert(translate("messagesent"));
    } else {
      alert(translate("messagesenderror"));
    }
    setIsSendingMessage(false);
  };

  // Se a mensagem estiver sendo enviada, exibe um spinner
  if (isSendingMessage) return <Spinner />;

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        {translate("messageform")}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid item xs={12}>
          <RadioGroup
            aria-label="Feedback"
            name="feedback"
            value={selectedType}
            onChange={handleOptionChange}
          >
            <FormControlLabel
              value="Suggestion"
              control={<Radio />}
              label={translate("suggestion")}
            />
            <FormControlLabel
              value="Criticism"
              control={<Radio />}
              label={translate("Criticism")}
            />
            <FormControlLabel
              value="Praise"
              control={<Radio />}
              label={translate("Praise")}
            />
          </RadioGroup>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label={translate("Message")}
              variant="outlined"
              value={message}
              onChange={handleSuggestionChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {translate("send")}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default MessageForm;
