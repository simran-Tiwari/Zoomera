

import axios from "axios";
import httpStatus from "http-status";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import server from "../environment.js";
export const AuthContext = createContext({});

const client = axios.create({
    baseURL: `${server}/api/v1/users`
    //baseURL: "http://localhost:8000/api/v1/users"
});

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (name, username, password) => {
        if (!name || !username || !password) {
            console.error("Missing registration fields:", { name, username, password });
            throw new Error("Please fill all fields");
        }
        try {
            const response = await client.post("/register", { name, username, password });
            if (response.status === httpStatus.CREATED) return response.data.message;
        } catch (err) {
            console.error("Register error:", err.response?.data || err.message);
            throw err;
        }
    };

    const handleLogin = async (username, password) => {
        try {
            const response = await client.post("/login", { username, password });
            if (response.status === httpStatus.OK) {
                localStorage.setItem("token", response.data.token);
                navigate("/home");
            }
        } catch (err) {
            console.error("Login error:", err.response?.data || err.message);
            throw err;
        }
    };

    const getHistoryOfUser = async () => {
        try {
            const response = await client.post("/get_all_activity", { token: localStorage.getItem("token") });
            return response.data;
        } catch (err) {
            console.error("Get history error:", err.response?.data || err.message);
            throw err;
        }
    };

    const addToUserHistory = async (meetingCode) => {
        try {
            const response = await client.post("/add_to_activity", {
                token: localStorage.getItem("token"),
                meeting_code: meetingCode
            });
            return response.data;
        } catch (err) {
            console.error("Add to history error:", err.response?.data || err.message);
            throw err;
        }
    };

    return (
        <AuthContext.Provider value={{ userData, setUserData, handleRegister, handleLogin, getHistoryOfUser, addToUserHistory }}>
            {children}
        </AuthContext.Provider>
    );
};
