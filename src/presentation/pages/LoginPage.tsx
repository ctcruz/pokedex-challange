import React, { useActionState, useEffect } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { checkAuth, loginUser } from "../../application/services/AuthService";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  // @ts-expect-error  ignore type params
  async function signIn(prevState, formData) {
    "use server";
    const username = formData.get("username");
    const password = formData.get("password");
    try {
      const isUserValidated = await loginUser({ username, password });
      if (isUserValidated) {
        navigate("/");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err) {
      if (err instanceof Error) {
        return err.message;
      }
      return String(err);
    }
  }

  const [message, signInAction] = useActionState(signIn, null);

  useEffect(() => {
    if (checkAuth()) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        p: 4,
        maxWidth: 400,
        mx: "auto",
        mt: 8,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h5" component="h1" textAlign="center">
        Login PokeAPP
      </Typography>
      <form
        action={signInAction}
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <TextField
          label="Username"
          variant="outlined"
          placeholder="Username"
          name="username"
          required
          fullWidth
        />
        <TextField
          label="Password"
          name="password"
          placeholder="Password"
          variant="outlined"
          type="password"
          required
          fullWidth
        />
        {!!message && <Typography color="error">{message}</Typography>}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Box>
  );
};

export default LoginPage;
