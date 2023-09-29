import React, { ReactNode, useEffect, useState } from "react";
import LoginService from "../services/LoginService";
import { useNavigate } from "react-router";
import { useServicesContext } from "../services/ServicesContext";

interface PermissionCheckProps {
  allowedRoles: string[];
  children: ReactNode;
}

function PermissionCheck(props: PermissionCheckProps) {
  const { allowedRoles, children } = props;

  const navigate = useNavigate();
  const { loginService } = useServicesContext();
  const [allowed, setAllowed] = useState(false);

  // Permission check
  useEffect(() => {
    console.log("Checking permission for:", loginService.getLogin());
    console.log("Allowed permission for:", allowedRoles);
    if (allowedRoles.includes(loginService.getLogin())) {
      setAllowed(true);
      return;
    }
    navigate(`./${loginService.getLogin()}`);
  }, []);

  if (!allowed) return <>Not Allowed</>;
  return <>{children}</>;
}

export default PermissionCheck;
