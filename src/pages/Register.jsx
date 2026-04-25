import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../slices/authSlice';
import api from '../api/axios.js';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const { data } = await api.post('/auth/register', {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });
      if (data.success) {
        dispatch(setUser(data.user));
        navigate('/');
      }
    } catch (err) {
      const msg = err.response?.data?.message;
      setError(typeof msg === 'string' ? msg : JSON.stringify(msg) || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9f4] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center mb-5">
            🌱
          </div>
          <h2 className="text-2xl font-serif text-gray-800 mb-1">Create account</h2>
          <p className="text-sm text-gray-500 mb-6">Join us and start making an impact</p>

          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Full Name</label>
              <input type="text" required placeholder="Jane Doe"
                className="w-full px-3 py-2.5 bg-green-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-600"
                onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Email</label>
              <input type="email" required placeholder="you@example.com"
                className="w-full px-3 py-2.5 bg-green-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-600"
                onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Phone</label>
              <input type="tel" required placeholder="+91 98765 43210"
                className="w-full px-3 py-2.5 bg-green-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-600"
                onChange={e => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Password</label>
              <input type="password" required placeholder="••••••••"
                className="w-full px-3 py-2.5 bg-green-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-600"
                onChange={e => setForm({ ...form, password: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Confirm Password</label>
              <input type="password" required placeholder="••••••••"
                className="w-full px-3 py-2.5 bg-green-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-600"
                onChange={e => setForm({ ...form, confirmPassword: e.target.value })} />
            </div>
            <button type="submit"
              className="w-full py-3 bg-green-800 text-white rounded-xl text-sm font-medium hover:bg-green-900 transition-colors cursor-pointer">
              Create account
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-5">
            No account? <Link to="/login" className="text-green-700 font-medium">Sign in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}