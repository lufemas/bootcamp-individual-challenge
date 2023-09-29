import { Card, CardContent, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useServicesContext } from "../services/ServicesContext";
import Spinner from "../components/Spinner";
import PermissionCheck from "../components/PermissionCheck";

const DeletePage: React.FC = () => {
  const { apiService, i18nService } = useServicesContext();
  const translate = i18nService.translate;

  const [queues, setQueues] = useState([]);

  useEffect(() => {
    updateQueues();
    const intervalId = setInterval(async () => {
      updateQueues();
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const updateQueues = async () => {
    const queueSizes = await apiService.getQueueSizes();
    console.log("Got Queues: ", queueSizes);
    setQueues(queueSizes);
  };

  return (
    <PermissionCheck allowedRoles={["administrator"]}>
      <h1>Lista de Filas</h1>
      {queues.length > 0 ? (
        <Grid container spacing={3}>
          {queues?.map((queue) => (
            <Grid item key={queue["type"]} xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {translate(queue["type"], { plural: true })}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {translate("size")}: {queue["count"]}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Spinner />
      )}
    </PermissionCheck>
  );
};

export default DeletePage;
