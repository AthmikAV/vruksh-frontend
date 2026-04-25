import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

export default function Dashboard() {
  const navigate = useNavigate()

  const [data, setData] = useState(null)
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [dashRes, lbRes] = await Promise.all([
          api.get('/donations/dashboard'),
          api.get('/donations/leaderboard'),
        ])
        setData(dashRes.data)
        setLeaderboard(lbRes.data.leaderboard)
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard')
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  if (loading) return (
    <div className="min-h-screen bg-[#f4f8ef] flex items-center justify-center">
      <div className="animate-pulse text-green-600 font-medium">Loading dashboard...</div>
    </div>
  )

  if (error) return (
    <div className="min-h-screen bg-[#f4f8ef] flex items-center justify-center">
      <div className="text-red-600 text-sm">{error}</div>
    </div>
  )

  const { donations, stats, myRank } = data
  const top3 = leaderboard.slice(0, 3)
  const podiumOrder = [top3[1], top3[0], top3[2]] // 2nd, 1st, 3rd
  const podiumStyles = [
    { height: 'h-14', bg: 'bg-gray-200', text: 'text-gray-500', border: 'border-gray-300', avatarBg: 'bg-gray-100', avatarText: 'text-gray-600', rank: '2' },
    { height: 'h-20', bg: 'bg-green-600', text: 'text-white', border: 'border-green-400', avatarBg: 'bg-green-100', avatarText: 'text-green-700', rank: '1', crown: true },
    { height: 'h-10', bg: 'bg-amber-300', text: 'text-amber-700', border: 'border-amber-300', avatarBg: 'bg-amber-50', avatarText: 'text-amber-600', rank: '3' },
  ]

  return (
    <div className="min-h-screen bg-[#f4f8ef] px-4 py-10">
      <div className="max-w-lg mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="font-serif text-2xl font-black text-green-950">Dashboard</h1>
          <p className="text-sm text-green-600">Your impact at a glance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-white rounded-2xl border border-green-100 p-4 text-center">
            <p className="text-2xl">🌳</p>
            <p className="text-xl font-black text-green-950 mt-1">{stats.totalTrees}</p>
            <p className="text-xs text-green-500 font-medium mt-0.5">Trees</p>
          </div>
          <div className="bg-white rounded-2xl border border-green-100 p-4 text-center">
            <p className="text-2xl">💰</p>
            <p className="text-xl font-black text-green-950 mt-1">₹{stats.totalAmount}</p>
            <p className="text-xs text-green-500 font-medium mt-0.5">Donated</p>
          </div>
          <div className="bg-white rounded-2xl border border-green-100 p-4 text-center">
            <p className="text-2xl">🏆</p>
            <p className="text-xl font-black text-green-950 mt-1">#{myRank || '—'}</p>
            <p className="text-xs text-green-500 font-medium mt-0.5">Rank</p>
          </div>
        </div>

        {/* Donation History */}
        <div className="bg-white rounded-2xl border border-green-100 p-6 mb-4">
          <h2 className="font-bold text-green-950 mb-4">Donation history</h2>
          {donations.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-4xl mb-2">🌱</p>
              <p className="text-sm text-green-600 font-medium">No donations yet</p>
              <button
                onClick={() => navigate('/donate')}
                className="mt-3 text-xs font-bold text-white bg-green-700 px-4 py-2 rounded-xl hover:bg-green-800 transition-colors cursor-pointer"
              >
                Plant your first tree
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {donations.map((donation) => (
                <div key={donation._id} className="border border-green-100 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-green-500">
                      {new Date(donation.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </p>
                    <span className="text-sm font-black text-green-800">₹{donation.totalAmount}</span>
                  </div>
                  <div className="space-y-1">
                    {donation.items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {item.tree?.image ? (
                            <img src={item.tree.image} alt={item.tree.name}
                              className="w-6 h-6 rounded-full object-cover border border-green-100" />
                          ) : (
                            <span className="text-base">🌳</span>
                          )}
                          <p className="text-sm text-green-900 font-medium">{item.tree?.name || 'Tree'}</p>
                        </div>
                        <p className="text-xs text-green-500">x{item.quantity}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 flex justify-end">
                    <span className="bg-green-50 text-green-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
                      🌱 {donation.totalTrees} {donation.totalTrees === 1 ? 'tree' : 'trees'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-2xl border border-green-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-green-950">Leaderboard 🏆</h2>
            <span className="text-xs text-green-500 font-medium">Top 10 planters</span>
          </div>

          {/* Podium — only when 3+ entries */}
          {top3.length >= 3 && (
            <div className="flex items-end justify-center gap-3 mb-5">
              {podiumOrder.map((entry, i) => {
                if (!entry) return null
                const style = podiumStyles[i]
                return (
                  <div key={i} className="flex flex-col items-center">
                    {style.crown && <div className="text-xl mb-1">👑</div>}
                    <div className={`${style.crown ? 'w-14 h-14' : 'w-12 h-12'} rounded-full ${style.avatarBg} border-4 ${style.border} flex items-center justify-center font-black ${style.avatarText} ${style.crown ? 'text-xl' : 'text-base'}`}>
                      {entry.user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <p className="text-xs font-bold text-green-950 mt-1 max-w-[60px] truncate text-center">
                      {entry.user?.name}
                    </p>
                    <p className="text-xs text-green-600">{entry.totalTrees} 🌳</p>
                    <div className={`w-14 ${style.height} ${style.bg} rounded-t-xl mt-2 flex items-center justify-center`}>
                      <span className={`text-base font-black ${style.text}`}>{style.rank}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Full ranked list — always show */}
          {leaderboard.length > 0 ? (
            <div className="space-y-1">
              {leaderboard.map((entry, i) => (
                <div key={i} className="flex items-center gap-3 px-2 py-2.5 rounded-xl hover:bg-green-50 transition-colors">
                  <span className="text-sm font-black text-gray-400 w-5">{i + 1}</span>
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-xs font-black text-green-700">
                    {entry.user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-green-950">{entry.user?.name}</p>
                    <p className="text-xs text-green-500">{entry.donationCount} donations</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-green-800">{entry.totalTrees} 🌳</p>
                    <p className="text-xs text-green-500">₹{entry.totalAmount}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-4xl mb-2">🌱</p>
              <p className="text-sm text-green-600 font-medium">No planters yet — be the first!</p>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}