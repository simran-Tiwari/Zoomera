


import HomeIcon from '@mui/icons-material/Home';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

export default function History() {
    const { getHistoryOfUser } = useContext(AuthContext);
    const [meetings, setMeetings] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser();
                setMeetings(history);
            } catch (err) {
                console.error("Failed to fetch history:", err);
            }
        };

        fetchHistory();
    }, [getHistoryOfUser]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleHomeClick = () => {
        if (window.history.state && window.history.state.idx > 0) {
            navigate(-1);
        } else {
            navigate("/home");
        }
    };

    return (
        <div style={{
            padding: "20px",
            maxWidth: "600px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            fontFamily: "Arial, sans-serif"
        }}>
            <IconButton
                onClick={handleHomeClick}
                style={{
                    alignSelf: "flex-start",
                    backgroundColor: "#1976d2",
                    color: "#fff",
                    marginBottom: "20px"
                }}
            >
                <HomeIcon />
            </IconButton>

            {meetings.length > 0 ? (
                meetings.map((e, i) => (
                    <Card
                        key={i}
                        variant="outlined"
                        style={{
                            width: "100%",
                            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                            borderRadius: "10px"
                        }}
                    >
                        <CardContent>
                            <Typography
                                style={{ fontSize: "14px", color: "#555" }}
                                gutterBottom
                            >
                                Code: {e.meetingCode}
                            </Typography>
                            <Typography style={{ marginBottom: "10px", color: "#777" }}>
                                Date: {formatDate(e.date)}
                            </Typography>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <Typography style={{ color: "#999", marginTop: "20px" }}>
                    No meetings found.
                </Typography>
            )}
        </div>
    );
}
