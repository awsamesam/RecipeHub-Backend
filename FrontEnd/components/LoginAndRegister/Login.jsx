"use client";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import { useToast } from "@/context/ToastContext";
import axios from "axios";
import { IsLoginContext } from "@/context/isLoginContext";

function Login() {
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const { isLogin, setIsLogin, setOpenMoadle, setIsToken } =
    useContext(IsLoginContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isForgotPassword) {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user/${isLogin ? "login" : "register"}`,
          {
            email: email,
            password: password,
          },
        )
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          setIsToken(true);
          setTimeout(() => {
            setOpenMoadle(false);
          }, 2000);
          window.dispatchEvent(new Event("authChanged"));
          showToast(res.data.message, "success");
        })
        .catch((error) => {
          const errorMsg =
            error.response?.data?.errors?.[0]?.msg ||
            error.response?.data?.message ||
            error.message ||
            "حدث خطأ ما";

          showToast(errorMsg, "error");
        });
      return;
    }

    // طلب نسيت كلمة المرور
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/forgot-password`, { email })
      .then((res) => {
        showToast(res.data.message, "success");
      })
      .catch((error) => {
        const errorMsg =
          error.response?.data?.errors?.[0]?.msg ||
          error.response?.data?.message ||
          error.message ||
          "حدث خطأ ما";
        showToast(errorMsg, "error");
      });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className="modal-form">
      <TextField
        name="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        label="Email Address"
        type="email"
        variant="outlined"
        fullWidth
        required
      />
      {!isForgotPassword && (
        <TextField
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          required
        />
      )}

      <div className="forgot-password-box">
        <Link
          component="button"
          type="button"
          variant="body2"
          onClick={() => {
            setIsForgotPassword(!isForgotPassword);
          }}
          className="forgot-password-link"
          sx={{ textDecoration: "underline", cursor: "pointer" }}
        >
          {isForgotPassword ? "Back to Login" : "Forgot password?"}
        </Link>
      </div>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        className="login-submit-btn"
      >
        {isForgotPassword ? "Send Reset Link" : isLogin ? "Login" : "Sign up"}
      </Button>

      {!isForgotPassword && (
        <Typography variant="body2" className="signup-text">
          {isLogin ? "Don't have an account?" : "I have an account"}
          <span
            style={{ cursor: "pointer" }}
            onClick={() => setIsLogin(!isLogin)}
            className="signup-link"
          >
            {isLogin ? " Sign up" : "Sign in"}
          </span>
        </Typography>
      )}
    </Box>
  );
}

export default Login;
