



import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, IconButton, TextField } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import { AuthContext } from "../context/AuthContext.jsx";
import withAuth from "../utils/withAuth.jsx";
import "../App.css";

function HomeComponent() {
  const navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");
  const { addToUserHistory } = useContext(AuthContext);

  const handleJoinVideoCall = async () => {
    if (!meetingCode.trim()) { 
      alert("Please enter a valid meeting code."); 
      return; 
    }
    await addToUserHistory(meetingCode);
    navigate(`/${meetingCode}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{
      position: "relative",
      minHeight: "100vh",
      overflow: "hidden",
      fontFamily: "Arial, sans-serif",
      color: "#fff",
      background: "linear-gradient(135deg, #1e3c72, #2a5298)"
    }}>
      <div className="ShadedBackground" />
      <div className="FloatingShapes">
        {[...Array(15)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            borderRadius: "50%",
            left: `${Math.random() * 100}vw`,
            bottom: `${Math.random() * 100}vh`,
            width: `${10 + Math.random() * 30}px`,
            height: `${10 + Math.random() * 30}px`,
            animationDuration: `${15 + Math.random() * 20}s`,
            background: `rgba(255,255,255,${0.05 + Math.random() * 0.15})`
          }} />
        ))}
      </div>

      <header style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 40px",
        background: "rgba(0,0,0,0.3)",
        backdropFilter: "blur(10px)",
        position: "sticky",
        top: 0,
        zIndex: 10,
        boxShadow: "0 2px 10px rgba(0,0,0,0.3)"
      }}>
        <h2 style={{ margin: 0, fontSize: "24px" }}>Zoomera</h2>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <IconButton 
            onClick={() => navigate("/history")}
            style={{ color: "#fff", background: "rgba(255,255,255,0.2)" }}
          >
            <RestoreIcon />
          </IconButton>
          <span style={{ cursor: "pointer" }} onClick={() => navigate("/history")}>History</span>
          <Button 
            onClick={handleLogout} 
            variant="contained"
            style={{ backgroundColor: "#ff4d4d", color: "#fff", fontWeight: "bold" }}
          >
            Logout
          </Button>
        </div>
      </header>

      <main style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "60px 40px",
        flexWrap: "wrap",
        gap: "40px"
      }}>
        <div style={{ flex: "1 1 400px", maxWidth: "600px" }}>
          <h2 style={{ fontSize: "32px", marginBottom: "20px", lineHeight: "1.4" }}>
            Providing Quality Video Call <br /> Just Like Quality Education
          </h2>
          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <TextField 
              onChange={(e) => setMeetingCode(e.target.value)} 
              label="Meeting Code" 
              variant="outlined"
              style={{ backgroundColor: "#fff", borderRadius: "8px", flex: 1 }}
            />
            <Button 
              onClick={handleJoinVideoCall} 
              variant="contained"
              style={{ backgroundColor: "#4caf50", color: "#fff", fontWeight: "bold" }}
            >
              Join
            </Button>
          </div>
        </div>

        <div style={{ flex: "1 1 300px", textAlign: "center" }}>
          <img 
            src="/logo3.png" 
            alt="logo image" 
            style={{ maxWidth: "100%", borderRadius: "15px", boxShadow: "0 10px 20px rgba(0,0,0,0.4)" }} 
          />
        </div>
      </main>

      <footer style={{
        textAlign: "center",
        padding: "20px 0",
        background: "rgba(0,0,0,0.3)",
        backdropFilter: "blur(10px)",
        position: "relative",
        marginTop: "auto",
        color: "#fff"
      }}>
        <p style={{ margin: 0 }}>© 2024 Zoomera | All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default withAuth(HomeComponent);
