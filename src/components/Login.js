// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.js';
import './Login.css';

const Login = () => {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const [error, setError] = useState(null);
        const { setUser } = useAuth();
        const navigate = useNavigate();

        const handleSubmit = async(e) => {
            e.preventDefault();
            try {
                const response = await fetch('http://localhost:3001/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });
                const data = await response.json();
                if (response.ok) {
                    setUser(data);
                    localStorage.setItem('role', data.role);
                    localStorage.setItem('username', data.username);
                    navigate('/dashboard');
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError('Something went wrong. Please try again.');
            }
        };

        return ( <
            div className = "login-container" >
            <
            form onSubmit = { handleSubmit }
            className = "login-form" >
            <
            h2 > Login < /h2> <
            input type = "text"
            value = { username }
            onChange = {
                (e) => setUsername(e.target.value) }
            placeholder = "Username"
            required /
            >
            <
            input type = "password"
            value = { password }
            onChange = {
                (e) => setPassword(e.target.value) }
            placeholder = "Password"
            required /
            >
            <
            button type = "submit" > Login < /button> {
                error && < div className = "error" > { error } < /div>} <
                    /form> <
                    /div>
            );
        };

        export default Login;