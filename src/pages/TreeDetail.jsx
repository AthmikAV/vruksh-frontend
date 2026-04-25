import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Wind, Leaf, ArrowLeft, IndianRupee } from 'lucide-react'
import api from '../api/axios'
import { protectedNavigate } from '../utils/protectedNavigate'
import { useSelector } from 'react-redux'

export default function TreeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [tree, setTree] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchTree = async () => {
      try {
        const { data } = await api.get(`/trees/${id}`)
        setTree(data.data)
      } catch (err) {
        setError('Tree not found' + err)
      } finally {
        setLoading(false)
      }
    }
    fetchTree()
  }, [id])

  if (loading) return (
    <div className="min-h-screen bg-[#f4f8ef] flex items-center justify-center">
      <div className="animate-pulse text-green-600 font-medium">Loading...</div>
    </div>
  )

  if (error || !tree) return (
    <div className="min-h-screen bg-[#f4f8ef] flex flex-col items-center justify-center gap-4">
      <p className="text-green-700 font-medium">{error || 'Tree not found'}</p>
      <button onClick={() => navigate('/')} className="text-sm text-green-600 underline">
        Go back home
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#f4f8ef]">

      {/* Back button */}
      <div className="px-6 pt-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-green-700 font-medium text-sm hover:text-green-900 transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </button>
      </div>

      {/* Hero Image */}
      <div className="px-6 mt-4">
        <img
          src={tree.image}
          alt={tree.name}
          className="w-full h-64 md:h-80 object-cover rounded-3xl"
          onError={(e) =>
            (e.target.src = 'https://placehold.co/800x400/eaf4d8/2d6a0f?text=Tree')
          }
        />
      </div>

      {/* Content */}
      <div className="px-6 py-8 max-w-2xl mx-auto">

        {/* Name + badge */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="font-serif text-3xl font-black text-green-950 mb-1">
              {tree.name}
            </h1>
            <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
              🌿 Native species
            </span>
          </div>
          <div className="text-right">
            <p className="text-xs text-green-500 font-medium mb-0.5">Donate from</p>
            <p className="font-serif text-2xl font-black text-green-800">₹{tree.price}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-green-700 leading-relaxed text-sm mb-8">
          {tree.description}
        </p>

        {/* Impact stats */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-white rounded-2xl p-4 text-center border border-green-100">
            <div className="flex items-center justify-center text-green-400 mb-2">
              <Wind size={18} />
            </div>
            <p className="font-bold text-green-900 text-lg">{tree.oxygenProduced} kg</p>
            <p className="text-xs text-green-500 font-medium">O₂ per day</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center border border-green-100">
            <div className="flex items-center justify-center text-green-400 mb-2">
              <Leaf size={18} />
            </div>
            <p className="font-bold text-green-900 text-lg">{tree.oxygenProduced * 365} kg</p>
            <p className="text-xs text-green-500 font-medium">O₂ per year</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center border border-green-100">
            <div className="flex items-center justify-center text-green-400 mb-2">
              <IndianRupee size={18} />
            </div>
            <p className="font-bold text-green-900 text-lg">₹{tree.price}</p>
            <p className="text-xs text-green-500 font-medium">per tree</p>
          </div>
        </div>

        {/* What you get */}
        <div className="bg-white rounded-2xl p-5 border border-green-100 mb-8">
          <h3 className="font-bold text-green-950 mb-4">What you get</h3>
          <ul className="space-y-3">
            {[
              'Personalized digital certificate',
              'Tree planted in your name',
              'Impact tracked on your dashboard',
              'Contribution to a greener India',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-green-700">
                <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs font-bold shrink-0">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Donate button */}
       <button
  onClick={() => protectedNavigate(navigate, user, `/donate/${tree._id}`)}
  className="w-full bg-green-700 text-white font-bold py-4 rounded-2xl hover:bg-green-800 transition-colors flex items-center justify-center gap-2 text-sm cursor-pointer"
>
  <Leaf size={16} />
  Donate ₹{tree.price} — Plant this tree
</button>

        <p className="text-center text-xs text-green-500 mt-3">
          Secure payment · Certificate included · Tracked on dashboard
        </p>
      </div>
    </div>
  )
}