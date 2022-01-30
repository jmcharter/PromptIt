import React, { useState, ReactElement } from 'react';
import {
    Typography,
    Container,
    Box,
    Avatar,
    TextField,
    FormControlLabel,
    Checkbox,
    Button,
    Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { loginUser } from "../api";
import { AxiosResponse } from "axios";
import { useAuth } from '../contexts/AuthContext';
import { UserData } from '../models/DataModels';
import { LoginResponse } from '../models/ResponseModels';
import { useNavigate } from 'react-router-dom';

interface FormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

function Login(): ReactElement {
    const [formData, setFormData] = useState<FormData>({ username: "", email: "", password: "", confirmPassword: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const { currentUser, setCurrentUser } = useAuth();
    const navigate = useNavigate();

    const handleChange = (event: any) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value.trim()
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            setError("");
            setSuccess("");
            setLoading(true);
            const res: AxiosResponse<LoginResponse> = await loginUser(formData);
            if (res.data.userdata) {
                setSuccess(`Logged in as ${formData.username}`);
                setCurrentUser(res.data.userdata);
                localStorage.setItem("access-token", res.data.token);
                localStorage.setItem("user-data", JSON.stringify(res.data.userdata));
                navigate("/");
            } else {
                setError(res.data.message as string);
            }
            setFormData({ username: "", email: "", password: "", confirmPassword: "" });
        } catch (error: any) {
            setError(error.response.data.message);
        }
        setLoading(false);
    };
    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            >
                <Avatar
                    sx={{
                        margin: 1,
                        bgcolor: "primary.dark",
                    }}
                >
                    <LockOutlinedIcon />
                </Avatar>
                <Typography
                    component="h1" variant="h5"
                >Sign Up</Typography>
                {error && <Alert severity="error" variant="filled" sx={{ mt: 2 }}>{error}</Alert>}
                {success && <Alert severity="success" variant="filled" sx={{ mt: 2 }}>{success}</Alert>}
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <TextField
                        onChange={handleChange}
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoFocus
                        sx={{}}
                        value={formData.username}
                    />
                    <TextField
                        onChange={handleChange}
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        name="password"
                        autoComplete="current-password"
                        type="password"
                        value={formData.password}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="outlined"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading}
                    >
                        Login
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default Login;
