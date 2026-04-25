import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

export default function Donate() {
  const navigate = useNavigate()
  const [trees, setTrees] = useState([])
  const [quantities, setQuantities] = useState({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const fetchTrees = async () => {
      try {
        const { data } = await api.get('/trees')
        setTrees(data.data)
        const initial = {}
        data.data.forEach(t => initial[t._id] = 0)
        setQuantities(initial)
      } catch (err) {
        setError('Failed to load trees' + err)
      } finally {
        setLoading(false)
      }
    }
    fetchTrees()
  }, [])

  const updateQty = (id, delta) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta)
    }))
  }

  const selectedItems = trees
    .filter(t => quantities[t._id] > 0)
    .map(t => ({ treeId: t._id, quantity: quantities[t._id], tree: t }))

  const totalAmount = selectedItems.reduce(
    (sum, item) => sum + item.tree.price * item.quantity, 0
  )
  const totalTrees = selectedItems.reduce(
    (sum, item) => sum + item.quantity, 0
  )

  const handleDonate = async () => {
    if (selectedItems.length === 0) {
      setError('Please select at least one tree')
      return
    }
    setSubmitting(true)
    setError('')
    setSuccess('')
    try {
      // Step 1 — create order
      const { data: orderData } = await api.post('/donations/create-order', {
        items: selectedItems.map(i => ({ treeId: i.treeId, quantity: i.quantity }))
      })

      const { donationId } = orderData.data

      // Step 2 — verify payment
      const { data: verifyData } = await api.post('/donations/verify-order', { donationId })

      if (verifyData.success) {
        setSuccess(`🌱 Thank you! ${totalTrees} ${totalTrees === 1 ? 'tree' : 'trees'} planted successfully!`)
        setQuantities(prev => {
          const reset = {}
          Object.keys(prev).forEach(k => reset[k] = 0)
          return reset
        })
        setTimeout(() => navigate('/dashboard'), 2000)
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Donation failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-[#f4f8ef] flex items-center justify-center">
      <div className="animate-pulse text-green-600 font-medium">Loading trees...</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#f4f8ef] px-4 py-10">
      <div className="max-w-lg mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="font-serif text-2xl font-black text-green-950">Plant a Tree</h1>
          <p className="text-sm text-green-600">Choose trees and make your donation</p>
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

        {/* Tree Cards */}
        <div className="space-y-3 mb-4">
          {trees.map(tree => (
            <div key={tree._id}
              className={`bg-white rounded-2xl border p-4 flex gap-4 transition-all ${quantities[tree._id] > 0 ? 'border-green-400 shadow-sm' : 'border-green-100'}`}>
              {/* Image */}
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-green-50">
                {tree.image ? (
                  <img src={tree.image} alt={tree.name}
                    className="w-full h-full object-cover"
                    onError={e => e.target.style.display = 'none'} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl">🌳</div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <div className="min-w-0">
                    <p className="font-bold text-green-950">{tree.name}</p>
                    <p className="text-xs text-green-500 mt-0.5">🌬️ {tree.oxygenProduced}kg O₂/day</p>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">{tree.description}</p>
                  </div>
                  <span className="font-black text-green-800 text-sm flex-shrink-0">₹{tree.price}</span>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={() => updateQty(tree._id, -1)}
                    className="w-7 h-7 rounded-lg bg-green-100 text-green-700 font-black flex items-center justify-center hover:bg-green-200 transition-colors cursor-pointer"
                  >−</button>
                  <span className="text-sm font-black text-green-950 w-5 text-center">
                    {quantities[tree._id] || 0}
                  </span>
                  <button
                    onClick={() => updateQty(tree._id, 1)}
                    className="w-7 h-7 rounded-lg bg-green-700 text-white font-black flex items-center justify-center hover:bg-green-800 transition-colors cursor-pointer"
                  >+</button>
                  {quantities[tree._id] > 0 && (
                    <span className="text-xs text-green-600 font-medium ml-1">
                      = ₹{tree.price * quantities[tree._id]}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        {selectedItems.length > 0 && (
          <div className="bg-white rounded-2xl border border-green-100 p-5">
            <h2 className="font-bold text-green-950 mb-3">Order summary</h2>
            <div className="space-y-2 mb-4">
              {selectedItems.map(item => (
                <div key={item.treeId} className="flex justify-between text-sm">
                  <span className="text-green-600">{item.tree.name} x{item.quantity}</span>
                  <span className="font-bold text-green-950">₹{item.tree.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-green-100 pt-3 flex justify-between items-center">
              <div>
                <p className="font-bold text-green-950">Total</p>
                <p className="text-xs text-green-500">{totalTrees} {totalTrees === 1 ? 'tree' : 'trees'}</p>
              </div>
              <span className="font-black text-green-800 text-xl">₹{totalAmount}</span>
            </div>
            <button
              onClick={handleDonate}
              disabled={submitting}
              className="mt-4 w-full py-3 bg-green-800 text-white rounded-xl text-sm font-bold hover:bg-green-900 transition-colors disabled:opacity-60 cursor-pointer"
            >
              {submitting ? 'Processing...' : `Donate ₹${totalAmount} 🌱`}
            </button>
          </div>
        )}

        {trees.length === 0 && !loading && (
          <div className="text-center py-16">
            <p className="text-4xl mb-2">🌱</p>
            <p className="text-sm text-green-600 font-medium">No trees available right now</p>
          </div>
        )}

      </div>
    </div>
  )
}