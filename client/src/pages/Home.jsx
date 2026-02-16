import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, ShieldCheck, Zap } from 'lucide-react';

const Home = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-[calc(100vh-64px)] bg-slate-50 relative overflow-hidden">
            {/* Hero Section */}
            <div className="container mx-auto px-4 py-20 relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
                        Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">Our Library</span>
                    </h1>
                    <p className="text-xl text-slate-600 mb-10">
                        Search our physical collection, check real-time availability, and find your next read before you visit.
                    </p>
                    <div className="flex justify-center gap-4">
                        {user ? (
                            <Link to="/dashboard" className="px-8 py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition shadow-lg shadow-cyan-500/30">
                                View Catalog
                            </Link>
                        ) : (
                            <>
                                <Link to="/login" className="px-8 py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition shadow-lg shadow-cyan-500/30">
                                    Search Books
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-8 mt-24">
                    <FeatureCard
                        icon={<BookOpen className="w-8 h-8 text-cyan-500" />}
                        title="Browse Catalog"
                        description="Explore our entire shelving collection from the comfort of your home."
                    />
                    <FeatureCard
                        icon={<Zap className="w-8 h-8 text-purple-500" />}
                        title="Live Availability"
                        description="Check if a book is on the shelf or borrowed before you make the trip."
                    />
                    <FeatureCard
                        icon={<ShieldCheck className="w-8 h-8 text-blue-500" />}
                        title="Plan Your Visit"
                        description="Save time by knowing exactly what is available before you arrive."
                    />
                </div>
            </div>

            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-cyan-100 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
        <div className="mb-4 bg-slate-50 w-14 h-14 rounded-xl flex items-center justify-center">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
        <p className="text-slate-600">{description}</p>
    </div>
);

export default Home;
