import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Leaf, Wind, Users, MapPin, IndianRupee } from 'lucide-react'
import api from './api/axios'
import { useSelector } from 'react-redux'
import { protectedNavigate } from './utils/protectedNavigate'

const statsData = [
  { icon: <Leaf size={16} />, num: '18,420', label: 'Trees planted' },
  { icon: <Users size={16} />, num: '2,400+', label: 'Donors' },
  { icon: <MapPin size={16} />, num: '12', label: 'States covered' },
  { icon: <IndianRupee size={16} />, num: '18L+', label: 'Raised' },
]

export default function Home() {
  const [trees, setTrees] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTrees = async () => {
      try {
        const { data } = await api.get('/trees')
        setTrees(data?.data || [])
      } catch (err) {
        console.error('Error fetching trees:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchTrees()
  }, [])

  const { user } = useSelector((state) => state.auth);
  return (
    <div className="min-h-screen bg-[#f4f8ef]">
      
      {/* Hero */}
      <section className="bg-[#1a3a0d] px-6 py-20 text-center">
        <span className="inline-block bg-green-900/50 text-green-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
          🌱 Plant a tree today
        </span>

        <h1 className="font-serif text-4xl md:text-5xl font-black text-white leading-tight max-w-2xl mx-auto mb-4">
          Every tree you plant{' '}
          <span className="text-green-400">changes</span> the world
        </h1>

        <p className="text-green-300/80 text-base max-w-md mx-auto mb-8 leading-relaxed">
          Join thousands of donors across India planting trees and fighting
          climate change — one donation at a time.
        </p>

        <div className="flex gap-3 justify-center flex-wrap">
         <button
  onClick={() => protectedNavigate(navigate, user, "/donate")}
  className="bg-green-500 text-green-950 font-bold text-sm px-8 py-3 rounded-full hover:bg-green-400 transition-colors cursor-pointer"
>
  Donate Now
</button>

          <a
            href="#trees"
            className="text-white font-semibold text-sm px-8 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
          >
            See trees
          </a>
        </div>
      </section>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 bg-white border-b border-green-100">
        {statsData.map(({ icon, num, label }) => (
          <div
            key={label}
            className="py-6 text-center border-r border-green-100 last:border-r-0"
          >
            <div className="flex items-center justify-center gap-1 text-green-400 mb-1">
              {icon}
            </div>
            <div className="font-serif text-2xl font-bold text-green-800">
              {num}
            </div>
            <div className="text-xs text-green-500 font-semibold uppercase tracking-wider mt-1">
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Featured Trees */}
      <section id="trees" className="px-6 py-12">
        <p className="text-xs font-bold text-green-500 uppercase tracking-widest mb-1">
          Featured trees
        </p>

        <h2 className="font-serif text-2xl font-bold text-green-950 mb-1">
          Choose your tree
        </h2>

        <p className="text-sm text-green-600 mb-6">
          Each species makes a unique impact on the ecosystem
        </p>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden border border-green-100 animate-pulse"
              >
                <div className="h-28 bg-green-100" />
                <div className="p-4 space-y-2">
                  <div className="h-3 bg-green-100 rounded w-2/3" />
                  <div className="h-3 bg-green-100 rounded w-full" />
                  <div className="h-3 bg-green-100 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : trees.length === 0 ? (
          <p className="text-green-600 text-sm text-center">
            No trees available right now 🌱
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trees.map((tree) => (
              <div
                key={tree._id}
                className="bg-white rounded-2xl overflow-hidden border border-green-100 hover:-translate-y-1 transition-transform cursor-pointer"
                onClick={() => navigate(`/tree/${tree._id}`)}
              >
                <img
                  src={tree.image}
                  alt={tree.name}
                  className="h-28 w-full object-cover"
                  onError={(e) =>
                    (e.target.src =
                      'https://placehold.co/400x200/eaf4d8/2d6a0f?text=Tree')
                  }
                />

                <div className="p-4">
                  <p className="font-bold text-sm text-green-950 mb-1">
                    {tree.name}
                  </p>

                  <p className="text-xs text-green-500 mb-2 line-clamp-2">
                    {tree.description}
                  </p>

                  <div className="flex items-center gap-1 text-xs text-green-400 mb-3">
                    <Wind size={11} />
                    {tree.oxygenProduced} kg O₂/day
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-bold text-green-800 text-sm">
                      ₹{tree.price}
                    </span>

                    <button
  onClick={(e) => {
    e.stopPropagation();
    protectedNavigate(navigate, user, `/donate/${tree._id}`);
  }}
  className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1.5 rounded-full hover:bg-green-200 transition-colors cursor-pointer"
>
  Donate
</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="mx-6 mb-12 bg-[#1a3a0d] rounded-2xl px-6 py-12 text-center">
        <h2 className="font-serif text-2xl font-bold text-white mb-2">
          Ready to make a difference?
        </h2>

        <p className="text-green-400/80 text-sm mb-4">
          Your donation directly funds planting & care of trees across India
        </p>

        <div className="flex gap-2 justify-center flex-wrap mb-6">
          {[
            '1 tree = 100kg O₂/year',
            'Certificate included',
            'Track your tree',
          ].map((pill) => (
            <span
              key={pill}
              className="bg-green-900/50 text-green-400 text-xs font-semibold px-3 py-1 rounded-full border border-green-700/30"
            >
              {pill}
            </span>
          ))}
        </div>

       <button
  onClick={() => protectedNavigate(navigate, user, "/donate")}
  className="inline-flex items-center gap-2 bg-green-500 text-green-950 font-bold text-sm px-8 py-3 rounded-full hover:bg-green-400 transition-colors cursor-pointer"
>
  <Leaf size={14} />
  Start planting — from ₹100
</button>
      </section>
    </div>
  )
}