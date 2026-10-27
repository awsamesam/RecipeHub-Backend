"use client";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useContext } from "react";
import { IsLoginContext } from "../../context/isLoginContext.js";
import HeaderLogin from "./HeaderLogin.jsx";
import "./modalLogin.css";
import Login from "./Login.jsx";
function ModaleLogin() {
  const { openMoadle, setOpenMoadle } = useContext(IsLoginContext);

  const handleClose = () => setOpenMoadle(false);

  return (
    <div>
      <Modal
        open={openMoadle}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-box">
          <HeaderLogin />
          <Login />
        </Box>
      </Modal>
    </div>
  );
}

export default ModaleLogin;
