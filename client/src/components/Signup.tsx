import React, { useState } from "react";
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
import { registerUser } from "../api";
import validator from 'validator';
import { AxiosResponse } from "axios";



interface FormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Signup = () => {
    const [formData, setFormData] = useState<FormData>({ username: "", email: "", password: "", confirmPassword: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (event: any) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value.trim()
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log(formData);

        if (!validator.isEmail(formData.email)) {
            return setError("Please enter a valid email address.");
        }
        if (!validator.equals(formData.password, formData.confirmPassword)) {
            return setError("Please ensure both passwords entered match.");
        }

        try {
            setError("");
            setLoading(true);
            const res: AxiosResponse<Response> = await registerUser(formData);
            console.log(res.data);
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
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <TextField
                        onChange={handleChange}
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="displayName"
                        autoFocus
                        sx={{}}
                    />
                    <TextField
                        onChange={handleChange}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        type="email"
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
                    />
                    <TextField
                        onChange={handleChange}
                        margin="normal"
                        required
                        fullWidth
                        id="confirm-password"
                        label="Confirm Password"
                        name="confirmPassword"
                        autoComplete="current-password"
                        type="password"
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
                        Register
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Signup;
