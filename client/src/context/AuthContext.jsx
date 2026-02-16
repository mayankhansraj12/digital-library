import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Set base URL (can be configured via env)
    // Set base URL (can be configured via env)
    // Ensure it ends with /api
    let apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    if (!apiUrl.endsWith('/api')) {
        apiUrl += '/api';
    }
    axios.defaults.baseURL = apiUrl;

    const loadUser = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            // Set token header
            axios.defaults.headers.common['x-auth-token'] = token;

            const res = await axios.get('/auth/me');
            setUser(res.data);
        } catch (err) {
            console.error('Initial load failed', err);
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['x-auth-token'];
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    const login = async (email, password) => {
        try {
            setError(null);
            const res = await axios.post('/auth/login', { email, password });

            localStorage.setItem('token', res.data.token);
            axios.defaults.headers.common['x-auth-token'] = res.data.token;

            await loadUser();
            return { success: true };
        } catch (err) {
            const msg = err.response?.data?.msg || 'Login failed';
            setError(msg);
            return { success: false, msg };
        }
    };

    const register = async (username, email, password, role) => {
        try {
            setError(null);
            const res = await axios.post('/auth/register', { username, email, password, role });

            localStorage.setItem('token', res.data.token);
            axios.defaults.headers.common['x-auth-token'] = res.data.token;

            await loadUser();
            return { success: true };
        } catch (err) {
            const msg = err.response?.data?.errors
                ? err.response.data.errors[0].msg
                : (err.response?.data?.msg || 'Registration failed');
            setError(msg);
            return { success: false, msg };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['x-auth-token'];
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, login, register, logout, setError }}>
            {children}
        </AuthContext.Provider>
    );
};
