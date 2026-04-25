import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { User, Mail, Phone, Camera, Save, Trash2, LogOut } from 'lucide-react'
import api from '../api/axios'

export default function Profile() {
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [form, setForm] = useState({ name: '', phone: '' })

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get('/users/profile')
        setProfile(data.data)
        setForm({ name: data.data.name, phone: data.data.phone })
      } catch (err) {
        setError('Failed to load profile' + err)
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      const { data } = await api.patch('/users/profile', form)
      setProfile(data.data)
      setSuccess('Profile updated successfully!')
      setEditing(false)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This cannot be undone.')) return
    try {
      await api.delete('/users/profile')
      navigate('/login')
    } catch (err) {
      setError('Failed to delete account' + err)
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-[#f4f8ef] flex items-center justify-center">
      <div className="animate-pulse text-green-600 font-medium">Loading profile...</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#f4f8ef] px-4 py-10">
      <div className="max-w-lg mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="font-serif text-2xl font-black text-green-950">My Profile</h1>
          <p className="text-sm text-green-600">Manage your account details</p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl mb-4">
            {success}
          </div>
        )}

        {/* Avatar Card */}
        <div className="bg-white rounded-2xl border border-green-100 p-6 mb-4 flex items-center gap-4">
          <div className="relative">
            {profile?.profilePhoto ? (
              <img
                src={profile.profilePhoto}
                alt={profile.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-green-200"
                onError={(e) => e.target.style.display = 'none'}
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                <span className="font-black text-green-700 text-2xl">
                  {profile?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-700">
              <Camera size={12} className="text-white" />
            </div>
          </div>
          <div>
            <p className="font-black text-green-950 text-lg">{profile?.name}</p>
            <p className="text-sm text-green-500">{profile?.email}</p>
            <span className="inline-block mt-1 bg-green-100 text-green-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
              🌱 Donor
            </span>
          </div>
        </div>

        {/* Details Card */}
        <div className="bg-white rounded-2xl border border-green-100 p-6 mb-4">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-green-950">Account details</h2>
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="text-xs font-bold text-green-600 hover:text-green-800 px-3 py-1.5 rounded-lg hover:bg-green-50 transition-colors"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={() => { setEditing(false); setError(''); }}
                className="text-xs font-bold text-gray-500 hover:text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>

          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-green-500 uppercase tracking-wide mb-1.5">
                <User size={12} /> Name
              </label>
              {editing ? (
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2.5 bg-green-50 border border-green-200 rounded-xl text-sm focus:outline-none focus:border-green-500 text-green-950"
                />
              ) : (
                <p className="text-sm text-green-950 font-medium px-1">{profile?.name}</p>
              )}
            </div>

            {/* Email — always readonly */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-green-500 uppercase tracking-wide mb-1.5">
                <Mail size={12} /> Email
              </label>
              <p className="text-sm text-green-950 font-medium px-1">{profile?.email}</p>
            </div>

            {/* Phone */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-green-500 uppercase tracking-wide mb-1.5">
                <Phone size={12} /> Phone
              </label>
              {editing ? (
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-3 py-2.5 bg-green-50 border border-green-200 rounded-xl text-sm focus:outline-none focus:border-green-500 text-green-950"
                />
              ) : (
                <p className="text-sm text-green-950 font-medium px-1">{profile?.phone || '—'}</p>
              )}
            </div>
          </div>

          {/* Save button */}
          {editing && (
            <button
              onClick={handleSave}
              disabled={saving}
              className="mt-6 w-full bg-green-700 text-white font-bold py-3 rounded-xl hover:bg-green-800 transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-60 cursor-pointer"
            >
              <Save size={15} />
              {saving ? 'Saving...' : 'Save changes'}
            </button>
          )}
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-2xl border border-green-100 p-6 mb-4">
          <h2 className="font-bold text-green-950 mb-4">Quick links</h2>
          <div className="space-y-2">
            {[
              { label: 'My donations', path: '/dashboard' }
              
            ].map(({ label, path }) => (
              <button
                key={path}
                onClick={() => navigate(path)}
                className="w-full text-left text-sm text-green-700 font-medium px-3 py-2.5 rounded-xl hover:bg-green-50 transition-colors flex items-center justify-between"
              >
                {label}
                <span className="text-green-400">→</span>
              </button>
            ))}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-2xl border border-red-100 p-6">
          <h2 className="font-bold text-red-700 mb-4">Danger zone</h2>
          <button
            onClick={handleDelete}
            className="w-full flex items-center justify-center gap-2 text-sm font-bold text-red-600 border border-red-200 py-3 rounded-xl hover:bg-red-50 transition-colors cursor-pointer"
          >
            <Trash2 size={15} />
            Delete my account
          </button>
        </div>

      </div>
    </div>
  )
}