import { Leaf, Trees, Users, MapPin, Wind, ChevronRight, CheckCircle } from "lucide-react";
import { protectedNavigate } from "../utils/protectedNavigate";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const stats = [
  { icon: <Trees size={22} />, value: "12,000+", label: "Trees Planted" },
  { icon: <Users size={22} />, value: "3,400+", label: "Donors" },
  { icon: <MapPin size={22} />, value: "8", label: "States Covered" },
  { icon: <Wind size={22} />, value: "240 Tons", label: "CO₂ Offset" },
];

const steps = [
  { step: "01", title: "Choose Trees", desc: "Pick how many trees you want to plant" },
  { step: "02", title: "Pay ₹400/tree", desc: "Secure payment, fully transparent" },
  { step: "03", title: "Get Certificate", desc: "Receive your planting certificate via email" },
];

const breakdown = [
  { label: "Sapling Cost", percent: 20, icon: "🌱", desc: "Native species sourced locally", color: "bg-green-500" },
  { label: "Watering & Care", percent: 37, icon: "💧", desc: "First 2 years of maintenance", color: "bg-emerald-500" },
  { label: "Labour", percent: 25, icon: "👷", desc: "Local farmer employment", color: "bg-teal-500" },
  { label: "Tracking & Certificate", percent: 18, icon: "📋", desc: "Geotagging & donor updates", color: "bg-lime-500" },
];

const testimonials = [
  { name: "Priya S.", city: "Bengaluru", quote: "I planted 5 trees for my daughter's birthday. Got the certificate in 2 days!" },
  { name: "Rahul M.", city: "Mumbai", quote: "Transparent, fast and genuinely impactful. Donated for our company's CSR." },
];

const values = [
  { icon: "🌱", title: "Community Driven", desc: "Built by people who care — volunteers, farmers and nature lovers working together" },
  { icon: "📍", title: "Ground Level Work", desc: "We work directly on the field, not from an office. Every tree is planted by hand" },
  { icon: "🤝", title: "Donor First", desc: "You get full updates on your tree — no donation disappears into a black hole" },
  { icon: "🌍", title: "Real Impact", desc: "Every tree is geotagged and photographed so you see exactly what your money did" },
];
export default function About() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  return (
    <div className="bg-white text-gray-800 font-sans">

      {/* Hero Mission */}
      <section className="bg-gradient-to-br bg-[#1a3a0d] to-emerald-500 text-white py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block bg-white/20 text-white text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
            🌿 Our Mission
          </span>
          <h1 className="text-4xl font-bold leading-tight mb-4">
            Every Tree Planted is a Promise to the Future
          </h1>
          <p className="text-green-100 text-lg leading-relaxed">
            We make it simple, transparent, and meaningful for anyone to fight
            climate change — one tree at a time, for just <span className="text-2xl font-bold">₹299</span>.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 px-6 bg-green-50">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-green-100">
              <div className="text-green-600 flex justify-center mb-3">{s.icon}</div>
              <p className="text-2xl font-bold text-green-700">{s.value}</p>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-green-800 mb-10">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="relative bg-green-50 border border-green-100 rounded-2xl p-6">
                <span className="text-5xl font-black text-green-100 absolute top-4 right-5 select-none">
                  {s.step}
                </span>
                <div className="w-9 h-9 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm mb-4">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-green-800 text-lg mb-1">{s.title}</h3>
                <p className="text-gray-500 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Money Breakdown */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-green-50">
  <div className="max-w-4xl mx-auto">

    {/* Header */}
    <div className="text-center mb-14">
      <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
        100% Transparent
      </span>
      <h2 className="text-3xl font-bold text-green-800 mb-3">
        Where Your Donation Goes
      </h2>
      <p className="text-gray-500 text-sm max-w-md mx-auto">
        Every rupee is accounted for. Here's exactly how we use your contribution to grow a real tree.
      </p>
    </div>

    {/* Visual Bar */}
    <div className="flex rounded-2xl overflow-hidden h-6 mb-10 shadow-inner">
      {breakdown.map((b, i) => (
        <div
          key={i}
          className={`${b.color} transition-all duration-500`}
          style={{ width: `${b.percent}%` }}
          title={`${b.label} ${b.percent}%`}
        />
      ))}
    </div>

    {/* Cards Grid */}
    <div className="grid md:grid-cols-2 gap-5 mb-10">
      {breakdown.map((b, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-5 border border-green-100 shadow-sm flex gap-4 items-start hover:shadow-md transition-shadow duration-200"
        >
          {/* Icon + color dot */}
          <div className="flex flex-col items-center gap-2 pt-1">
            <span className="text-2xl">{b.icon}</span>
            <div className={`w-2 h-2 rounded-full ${b.color}`} />
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-gray-800">{b.label}</span>
              <span className="text-green-700 font-black text-lg">{b.percent}%</span>
            </div>
            <p className="text-gray-400 text-xs mb-3">{b.desc}</p>

            {/* Progress bar */}
            <div className="w-full bg-green-50 rounded-full h-1.5">
              <div
                className={`${b.color} h-1.5 rounded-full`}
                style={{ width: `${b.percent * 2.5}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Bottom Banner */}
    <div className="bg-green-700 rounded-2xl px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-white">
      <div className="flex items-center gap-4">
        <div className="bg-white/20 rounded-xl p-3">
          <CheckCircle size={24} className="text-white" />
        </div>
        <div>
          <p className="font-bold text-lg">Price varies by species</p>
          <p className="text-green-200 text-sm">Every rupee split in the same ratio — always</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-green-200 text-xs uppercase tracking-widest mb-1">Starting from</p>
        <p className="text-3xl font-black">₹299</p>
      </div>
    </div>

  </div>
</section>
      {/* Who We Are */}
      <section className="py-20 px-6 bg-white">
  <div className="max-w-4xl mx-auto">

    {/* Header */}
    <div className="text-center mb-14">
      <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
        Who We Are
      </span>
      <h2 className="text-3xl font-bold text-green-800 mb-4">
        A Small Team with a Big Mission
      </h2>
      <p className="text-gray-500 leading-relaxed max-w-2xl mx-auto">
        We are not a big corporation or a registered NGO — we are a passionate
        group of individuals who believe that planting trees is one of the most
        direct ways anyone can fight climate change. No middlemen, no overhead —
        just real trees in real ground.
      </p>
    </div>

    {/* Values Grid */}
    <div className="grid md:grid-cols-2 gap-6 mb-14">
      {values.map((v, i) => (
        <div
          key={i}
          className="flex gap-4 bg-green-50 border border-green-100 rounded-2xl p-6 hover:shadow-md transition-shadow duration-200"
        >
          <div className="text-3xl shrink-0">{v.icon}</div>
          <div>
            <h3 className="font-semibold text-green-800 mb-1">{v.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
          </div>
        </div>
      ))}
    </div>

    {/* Honest Banner */}
    <div className="bg-gradient-to-r from-green-700 to-emerald-500 rounded-2xl p-8 text-white flex flex-col md:flex-row gap-6 items-center">
      <div className="text-5xl shrink-0">🌳</div>
      <div>
        <h3 className="font-bold text-xl mb-2">We're just getting started</h3>
        <p className="text-green-100 leading-relaxed text-sm">
          We are an independent initiative — not a registered NGO yet. Every
          donation goes directly to tree planting with full photo and location
          proof sent to you. Your trust means everything to us and we back it
          with complete transparency.
        </p>
      </div>
    </div>

  </div>
</section>

      {/* Testimonials */}
      <section className="py-16 px-6 bg-green-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-green-800 mb-10">What Donors Say</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-green-100 shadow-sm">
                <p className="text-gray-600 italic mb-5">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-green-800 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-green-700 to-emerald-500 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Plant Your First Tree?</h2>
        <p className="text-green-100 mb-8 text-lg">
          Join 3,400+ donors making a real difference for just ₹400.
        </p>
        <button
  onClick={() => protectedNavigate(navigate, user, "/donate")}
  className="inline-flex items-center gap-2 bg-white text-green-700 font-bold px-8 py-3 rounded-full hover:bg-green-50 transition-all duration-300 shadow-lg cursor-pointer"
>
  Plant a Tree Now <ChevronRight size={18} />
</button>
      </section>

    </div>
  );
}