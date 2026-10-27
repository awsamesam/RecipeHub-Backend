"use client";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ success: "", error: "" });
  const params = useParams();
  const router = useRouter();
  const token = params.token; // جلب الـ token من الرابط

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/reset-password/${token}`,
        {
          password,
        },
      )
      .then((res) => {
        setMessage({ success: res.data.message, error: "" });
        setTimeout(() => {
          router.push("/"); // العودة للرئيسية أو فتح نافذة الدخول بعد النجاح
        }, 2000);
      })
      .catch((error) => {
        setMessage({
          success: "",
          error: error.response?.data.message || "حدث خطأ ما",
        });
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        mt: 8,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          maxWidth: 400,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" mb={2} textAlign="center">
          إعادة تعيين كلمة المرور
        </Typography>

        <TextField
          label="كلمة المرور الجديدة"
          type="password"
          variant="outlined"
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />

        {message.success && (
          <Typography
            color="success.main"
            mb={2}
            textAlign="center"
            style={{ color: "green" }}
          >
            {message.success}
          </Typography>
        )}
        {message.error && (
          <Typography
            color="error.main"
            mb={2}
            textAlign="center"
            style={{ color: "red" }}
          >
            {message.error}
          </Typography>
        )}

        <Button type="submit" variant="contained" fullWidth>
          تحديث كلمة المرور
        </Button>
      </Box>
    </Box>
  );
}

export default ResetPasswordPage;
