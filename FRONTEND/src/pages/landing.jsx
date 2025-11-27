
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  const hoverStyle = {
    transform: "scale(1.08)",
    color: "#FFD700",
  };

  const [hoveredItem, setHoveredItem] = useState(null);
  const [btnHover, setBtnHover] = useState(false);

  const shapes = [...Array(15)].map(() => ({
    left: Math.random() * 100 + "vw",
    size: 10 + Math.random() * 30 + "px",
    duration: 15 + Math.random() * 20 + "s",
    opacity: 0.05 + Math.random() * 0.15,
  }));

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        background: "linear-gradient(135deg, #6A5ACD, #7B68EE, #836FFF)",
        position: "relative",
        color: "white",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* Floating background shapes */}
      <div style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}>
        {shapes.map((shape, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: "-50px",
              left: shape.left,
              width: shape.size,
              height: shape.size,
              background: `rgba(255,255,255,${shape.opacity})`,
              borderRadius: "50%",
              animation: `floatShape ${shape.duration} linear infinite`,
            }}
          />
        ))}
      </div>

      {/* NAVBAR */}
      <nav
        style={{
          width: "100%",
          padding: "20px 50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Logo + Name */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src="/Zoomera_logo.png"
            alt="Zoomera Logo"
            style={{ width: "50px", height: "50px", borderRadius: "12px" }}
          />
          <h2 style={{ fontSize: "28px", fontWeight: "700" }}>Zoomera</h2>
        </div>

        <div style={{ display: "flex", gap: "25px", fontSize: "18px", cursor: "pointer" }}>
          {["guest", "register", "login"].map((item) => (
            <p
              key={item}
              onClick={
                item === "guest"
                  ? () => navigate("/home")
                  : item === "register"
                  ? () => navigate("/auth?mode=register")
                  : () => navigate("/auth?mode=login")
              }
              onMouseEnter={() => setHoveredItem(item)}
              onMouseLeave={() => setHoveredItem(null)}
              style={{
                transition: "0.3s",
                ...(hoveredItem === item ? hoverStyle : {}),
              }}
            >
              {item === "guest"
                ? "Join as Guest"
                : item === "register"
                ? "Register"
                : "Login"}
            </p>
          ))}
        </div>
      </nav>

      {/* Main container */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0px 80px",
          height: "80%",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Text Section */}
        <div style={{ maxWidth: "500px" }}>
          <h1 style={{ fontSize: "48px", fontWeight: "700", lineHeight: "1.3" }}>
            <span style={{ color: "#FFD700" }}>Connect</span> with your loved ones
          </h1>

          <p style={{ marginTop: "15px", fontSize: "20px", opacity: 0.9 }}>
            Cover a distance with Zoomera. Chat, call, and meet anytime, anywhere.
          </p>

          <button
            onClick={() => navigate("/home")}
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
            style={{
              marginTop: "25px",
              padding: "12px 28px",
              fontSize: "18px",
              background: btnHover ? "#FFE55C" : "#FFD700",
              color: "#333",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              transition: "0.3s",
              transform: btnHover ? "scale(1.07)" : "scale(1)",
              boxShadow: btnHover ? "0px 0px 12px rgba(255,215,0,0.7)" : "none",
            }}
          >
            Get Started
          </button>
        </div>

        {/* Right Side Image */}
        <div>
          <img
            src="/mobile.png"
            alt="App Preview"
            style={{
              width: "380px",
              filter: "drop-shadow(0px 0px 15px rgba(0,0,0,0.3))",
            }}
          />
        </div>
      </div>

      {/* Keyframe animation */}
      <style>
        {`
          @keyframes floatShape {
            0% { transform: translateY(0); }
            100% { transform: translateY(105vh); }
          }
        `}
      </style>
    </div>
  );
}
