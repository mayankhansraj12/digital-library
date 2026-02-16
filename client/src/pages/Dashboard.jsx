import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Plus, Search, Book, Trash2, Edit2, CheckCircle, XCircle } from 'lucide-react';

const Dashboard = () => {
    const { user } = useAuth();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);

    // Form state for Add/Edit
    const [showForm, setShowForm] = useState(false);
    const [editingBook, setEditingBook] = useState(null);
    const [formData, setFormData] = useState({ title: '', author: '', description: '', status: 'Available', image: '' });

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const res = await axios.get('/books');
            setBooks(res.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch books');
            setLoading(false);
        }
    };

    const handleSearch = e => setSearchTerm(e.target.value);

    // Filter books
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Admin Actions
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await axios.delete(`/books/${id}`);
            setBooks(books.filter(b => b._id !== id));
        } catch (err) {
            alert('Failed to delete book');
        }
    };

    const handleEdit = (book) => {
        setEditingBook(book);
        setFormData({
            title: book.title,
            author: book.author,
            description: book.description,
            status: book.status,
            image: book.image || ''
        });
        setShowForm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingBook) {
                const res = await axios.put(`/books/${editingBook._id}`, formData);
                setBooks(books.map(b => b._id === editingBook._id ? res.data : b));
            } else {
                const res = await axios.post('/books', formData);
                setBooks([...books, res.data]);
            }
            setShowForm(false);
            setEditingBook(null);
            setFormData({ title: '', author: '', description: '', status: 'Available', image: '' });
        } catch (err) {
            alert('Operation failed');
        }
    };

    // User Actions
    const handleBorrow = async (id) => {
        try {
            const res = await axios.put(`/books/${id}/borrow`);
            setBooks(books.map(b => b._id === id ? res.data : b));
        } catch (err) {
            alert(err.response?.data?.msg || 'Failed to borrow');
        }
    };

    const handleReturn = async (id) => {
        try {
            const res = await axios.put(`/books/${id}/return`);
            setBooks(books.map(b => b._id === id ? res.data : b));
        } catch (err) {
            alert('Failed to return');
        }
    };

    if (loading) return <div className="text-center mt-20">Loading resources...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-slate-800">Library Dashboard</h1>
                {user.role === 'admin' && (
                    <button
                        onClick={() => { setShowForm(!showForm); setEditingBook(null); setFormData({ title: '', author: '', description: '', status: 'Available', image: '' }); }}
                        className="flex items-center gap-2 bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition"
                    >
                        {showForm ? 'Cancel' : <><Plus size={20} /> Add Book</>}
                    </button>
                )}
            </div>

            {/* Admin Form */}
            {showForm && (
                <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 mb-8 animate-in fade-in slide-in-from-top-4">
                    <h2 className="text-xl font-bold mb-4">{editingBook ? 'Edit Book' : 'Add New Book'}</h2>
                    <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
                        <input
                            placeholder="Title"
                            className="p-2 border rounded"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                        <input
                            placeholder="Author"
                            className="p-2 border rounded"
                            value={formData.author}
                            onChange={e => setFormData({ ...formData, author: e.target.value })}
                            required
                        />
                        <input
                            placeholder="Image URL (optional)"
                            className="p-2 border rounded md:col-span-2"
                            value={formData.image}
                            onChange={e => setFormData({ ...formData, image: e.target.value })}
                        />
                        <input
                            placeholder="Description"
                            className="p-2 border rounded md:col-span-2"
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                        <select
                            className="p-2 border rounded"
                            value={formData.status}
                            onChange={e => setFormData({ ...formData, status: e.target.value })}
                        >
                            <option value="Available">Available</option>
                            <option value="Borrowed">Borrowed</option>
                        </select>
                        <button type="submit" className="md:col-span-2 bg-slate-900 text-white py-2 rounded hover:bg-slate-800 transition">
                            {editingBook ? 'Update Book' : 'Save Book'}
                        </button>
                    </form>
                </div>
            )}

            {/* Search */}
            <div className="relative mb-8">
                <Search className="absolute left-3 top-3 text-slate-400" size={20} />
                <input
                    type="text"
                    placeholder="Search by title or author..."
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>

            {/* Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooks.map(book => (
                    <div key={book._id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition group flex flex-col h-full">
                        <div className="h-64 overflow-hidden bg-gray-50 relative p-4 flex items-center justify-center">
                            <img
                                src={book.image || 'https://via.placeholder.com/400x600?text=No+Cover'}
                                alt={book.title}
                                className="h-full w-auto object-contain shadow-md rounded"
                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/400x600?text=Error'; }}
                            />
                            <div className="absolute top-2 right-2">
                                <span className={`px-2 py-1 rounded text-xs font-semibold shadow-sm ${book.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                    {book.status}
                                </span>
                            </div>
                        </div>

                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-xl font-bold text-slate-800 mb-1">{book.title}</h3>
                            <p className="text-slate-500 text-sm mb-4">by {book.author}</p>
                            <p className="text-slate-600 text-sm mb-6 line-clamp-2 flex-grow">{book.description || 'No description available.'}</p>

                            <div className="flex items-center justify-between border-t pt-4 mt-auto">
                                {/* Admin Controls */}
                                {user.role === 'admin' && (
                                    <div className="flex gap-2">
                                        <button onClick={() => handleEdit(book)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg" title="Edit">
                                            <Edit2 size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(book._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg" title="Delete">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                )}

                                {/* User Controls (Hidden for non-admins in Catalog Mode) */}
                                {/* In Catalog Mode, only Admins can change status via Edit */}
                                <div>
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>

            {filteredBooks.length === 0 && (
                <div className="text-center py-20 text-slate-500">
                    No books found matching your search.
                </div>
            )}
        </div>
    );
};

export default Dashboard;
