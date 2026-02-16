import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, LogOut, User } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-slate-900 text-white shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-cyan-400">
                        <BookOpen className="h-6 w-6" />
                        <span>Digital Library</span>
                    </Link>

                    <div className="flex items-center space-x-4">
                        {!user ? (
                            <>
                                <Link to="/login" className="hover:text-cyan-400 transition">Login</Link>
                                <Link to="/register" className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-md transition text-slate-900 font-medium">Get Started</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/dashboard" className="hover:text-cyan-400 transition">Dashboard</Link>
                                {user.role === 'admin' ? (
                                    <span className="text-xs bg-cyan-900 text-cyan-300 px-2 py-1 rounded border border-cyan-700">Admin</span>
                                ) : null}
                                <div className="flex items-center space-x-2 border-l border-slate-700 pl-4 ml-2">
                                    <div className="flex items-center space-x-1 text-sm text-slate-400">
                                        <User className="h-4 w-4" />
                                        <span>{user.username}</span>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="text-red-400 hover:text-red-300 transition"
                                        title="Logout"
                                    >
                                        <LogOut className="h-5 w-5" />
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
