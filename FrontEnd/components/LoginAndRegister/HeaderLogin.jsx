"use client";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { IsLoginContext } from "../../context/isLoginContext";

function HeaderLogin() {
  const { isLogin } = useContext(IsLoginContext);

  return (
    <Typography
      id="modal-modal-title"
      variant="h5"
      component="h2"
      className="modal-title"
    >
      {isLogin ? "Login" : "Sign up"}
    </Typography>
  );
}

export default HeaderLogin;
