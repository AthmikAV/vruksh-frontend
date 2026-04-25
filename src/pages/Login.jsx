import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';        // ← add
import { setUser } from '../slices/authSlice'; // ← add
import api from '../api/axios.js';
import { useLocation } from 'react-router-dom';

export default function Login() {
  
  
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const from = location.state?.from || '/';// ← add

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const { data } = await api.post('/auth/login', form);
    if (data.success) {
      dispatch(setUser(data.user));
      navigate(from);  // ← go back to where they were going
    }
  } catch (err) {
    setError(err.response?.data?.message || 'Login failed');
  }
};

  return (
    <div className="min-h-screen bg-[#f7f9f4] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center mb-5">
            🌱
          </div>
          <h2 className="text-2xl font-serif text-gray-800 mb-1">Welcome back</h2>
          <p className="text-sm text-gray-500 mb-6">Sign in to track your trees & impact</p>

          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Email</label>
              <input type="email" required placeholder="you@example.com"
                className="w-full px-3 py-2.5 bg-green-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-600"
                onChange={e => setForm({...form, email: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Password</label>
              <input type="password" required placeholder="••••••••"
                className="w-full px-3 py-2.5 bg-green-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-600"
                onChange={e => setForm({...form, password: e.target.value})} />
              <div className="text-right mt-1">
                <Link to="/forgot-password" className="text-xs text-green-700 font-medium">Forgot password?</Link>
              </div>
            </div>
            <button type="submit" className="w-full py-3 bg-green-800 text-white rounded-xl text-sm font-medium hover:bg-green-900 transition-colors cursor-pointer">
              Sign in
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-5">
            No account? <Link to="/signup" className="text-green-700 font-medium">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}