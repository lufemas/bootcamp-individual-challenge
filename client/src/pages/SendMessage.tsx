import React, { useEffect, useState } from "react";
import MessageForm from "../components/MessageForm";
import { useNavigate } from "react-router-dom";
import { useServicesContext } from "../services/ServicesContext";
import PermissionCheck from "../components/PermissionCheck";

interface SendMessageProps {
  children: React.ReactNode;
}

const SendMessage: React.FC = () => {
  return (
    <PermissionCheck allowedRoles={["customer"]}>
      <MessageForm />
    </PermissionCheck>
  );
};

export default SendMessage;
