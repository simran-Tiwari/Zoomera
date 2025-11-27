

import React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Box,
  Grid,
  Paper,
  Snackbar,
  Avatar,
  Button,
  CssBaseline,
  TextField
} from "@mui/material";
import { AuthContext } from "../context/AuthContext.jsx";
import { useLocation, useNavigate } from "react-router-dom";

export default function Authentication() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const mode = params.get("mode");

  const [formState, setFormState] = React.useState(
    mode === "register" ? 1 : 0
  );
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  const handleAuth = async () => {
    try {
      if (formState === 0) {
        await handleLogin(username, password);
      } else {
        const result = await handleRegister(name, username, password);
        setUsername("");
        setPassword("");
        setName("");
        setMessage(result);
        setOpen(true);
        setError("");
        setFormState(0);
      }
    } catch (err) {
      const msg = err.response?.data?.message || "An error occurred";
      setError(msg);
    }
  };

  // Floating shapes
  const shapes = [...Array(15)].map(() => ({
    left: Math.random() * 100 + "vw",
    size: 20 + Math.random() * 40 + "px",
    duration: 18 + Math.random() * 15 + "s",
    opacity: 0.08 + Math.random() * 0.12
  }));

  return (
    <Grid
      container
      component="main"
      sx={{
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        fontFamily: "Poppins"
      }}
    >
      <CssBaseline />

      {/* Background Gradient */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, #6A5ACD, #7B68EE, #836FFF)",
          zIndex: 0
        }}
      />

     
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          zIndex: 0,
          overflow: "hidden"
        }}
      >
        {shapes.map((shape, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: shape.left,
              width: shape.size,
              height: shape.size,
              borderRadius: "50%",
              background: `rgba(255,255,255,${shape.opacity})`,
              animation: `floatUp ${shape.duration} linear infinite`
            }}
          />
        ))}
      </div>

      <Paper
        elevation={20}
        sx={{
          zIndex: 1,
          margin: "auto",
          mt: 8,
          p: 5,
          width: 400,
          maxWidth: "90%",
          borderRadius: 4,
          background: "rgba(255, 255, 255, 0.25)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
          border: "1px solid rgba(255,255,255,0.2)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#FFD700", color: "#333" }}>
          <LockOutlinedIcon />
        </Avatar>

        <Button
          onClick={() => navigate("/")}
          variant="outlined"
          sx={{
            mb: 3,
            width: "100%",
            borderColor: "#FFD700",
            color: "#FFD700",
            fontWeight: "600",
            borderRadius: 2,
            transition: "0.3s",
            "&:hover": {
              borderColor: "#fff",
              color: "#fff",
              background: "rgba(255,255,255,0.2)"
            }
          }}
        >
          ⬅ Back to Landing
        </Button>

        {/* Toggle Buttons */}
        <Box sx={{ display: "flex", gap: 2, mb: 2, width: "100%" }}>
          {["Sign In", "Sign Up"].map((label, idx) => (
            <Button
              key={idx}
              variant={formState === idx ? "contained" : "outlined"}
              onClick={() => setFormState(idx)}
              sx={{
                flex: 1,
                fontWeight: "600",
                borderRadius: 2,
                bgcolor: formState === idx ? "#FFD700" : "transparent",
                color: formState === idx ? "#333" : "#FFD700",
                border: "2px solid #FFD700",
                "&:hover": {
                  bgcolor: "#FFE55C",
                  color: "#333"
                }
              }}
            >
              {label}
            </Button>
          ))}
        </Box>

        {/* Form */}
        <Box component="form" noValidate sx={{ mt: 1, width: "100%" }}>
          {formState === 1 && (
            <TextField
              fullWidth
              label="Full Name"
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  background: "rgba(255,255,255,0.5)"
                }
              }}
            />
          )}

          <TextField
            fullWidth
            label="Username"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                background: "rgba(255,255,255,0.5)"
              }
            }}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                background: "rgba(255,255,255,0.5)"
              }
            }}
          />

          {error && (
            <p
              style={{
                color: "red",
                marginTop: "0.5rem",
                textAlign: "center",
                fontWeight: "600"
              }}
            >
              {error}
            </p>
          )}

          <Button
            fullWidth
            variant="contained"
            onClick={handleAuth}
            sx={{
              mt: 3,
              py: 1.3,
              bgcolor: "#FFD700",
              color: "#333",
              fontWeight: "700",
              fontSize: "16px",
              borderRadius: 2,
              transition: "0.3s",
              "&:hover": {
                bgcolor: "#FFE55C",
                transform: "scale(1.03)",
                boxShadow: "0px 0px 10px rgba(255, 215, 0, 0.7)"
              }
            }}
          >
            {formState === 0 ? "Login" : "Register"}
          </Button>
        </Box>
      </Paper>

      {/* Success Snackbar */}
      <Snackbar open={open} autoHideDuration={4000} message={message} />

      {/* Floating Anim Keyframes */}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(120vh) scale(0.8); opacity: 0; }
          50% { opacity: 0.4; }
          100% { transform: translateY(-20vh) scale(1.2); opacity: 0; }
        }
      `}</style>
    </Grid>
  );
}
