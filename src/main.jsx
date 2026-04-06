import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Header from './components/header.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from './components/About.jsx'
import Profile from './components/Profile.jsx'
import Donate from './components/Donate.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element={<App />}></Route>
      <Route path='/about' element={<About />}></Route>
      <Route path='/profile' element={<Profile />}></Route>
      <Route path='/donate' element={<Donate />}></Route>
    </Routes>
  </BrowserRouter>
    
  ,
)
