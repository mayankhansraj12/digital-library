import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'user' // Default to user
    });

    const { register, error: authError } = useAuth();
    const navigate = useNavigate();
    const [localError, setLocalError] = useState('');

    const { username, email, password, role } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setLocalError('');
        const res = await register(username, email, password, role);
        if (res.success) {
            navigate('/dashboard');
        } else {
            setLocalError(res.msg);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-slate-50">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl border border-slate-100">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-slate-900">Create Account</h1>
                    <p className="text-slate-500 mt-2">Join the digital library platform</p>
                </div>

                {(localError || authError) && (
                    <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg text-center">
                        {localError || authError}
                    </div>
                )}

                <form className="space-y-4" onSubmit={onSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={onChange}
                            required
                            className="w-full px-4 py-3 bg-slate-50 hover:bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                            placeholder="john_doe"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            required
                            className="w-full px-4 py-3 bg-slate-50 hover:bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            required
                            className="w-full px-4 py-3 bg-slate-50 hover:bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                            placeholder="••••••••"
                            minLength="6"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Role (For Demo)</label>
                        <select
                            name="role"
                            value={role}
                            onChange={onChange}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        >
                            <option value="user">Reader (User)</option>
                            <option value="admin">Librarian (Admin)</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg shadow-lg shadow-cyan-500/30 transition-all flex items-center justify-center gap-2"
                    >
                        <UserPlus className="w-5 h-5" />
                        Create Account
                    </button>
                </form>

                <p className="text-center text-slate-600 text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="text-cyan-600 font-semibold hover:text-cyan-500 hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
