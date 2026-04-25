import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Header from './components/header.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from './pages/About.jsx'
import Profile from './pages/Profile.jsx'
import Donate from './pages/Donate.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import TreeDetail from './pages/TreeDetail.jsx'
import store from './store/store.js'
import { Provider } from 'react-redux'
import AuthProvider from './components/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
<BrowserRouter>
  <Provider store={store}>
    <AuthProvider>
      <Header />
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/about' element={<About />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/tree/:id' element={<TreeDetail />} />
        <Route path='/donate' element={<Donate />} />
      </Routes>
    </AuthProvider>
  </Provider>
</BrowserRouter>
    
  ,
)
