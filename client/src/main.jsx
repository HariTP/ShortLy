import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signin from './components/Signin.jsx'
import Signup from './components/Signup.jsx'
import Homepage from './components/Homepage.jsx'
import Createlink from './components/Createlink.jsx'
import Mylinks from './components/Mylinks.jsx'
import ShortIdPage from './components/ShortIdPage.jsx'
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import Analytics from './components/Analytics.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/login' element={<Signin/>}/>
        <Route path='/register' element={<Signup/>}/>
        <Route path='/home' element={<Homepage/>}/>
        <Route path='/create' element={<Createlink/>}/>
        <Route path='/mylinks' element={<Mylinks/>}/>
        <Route path="mylinks/:shortId" element={<ShortIdPage />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
   
  </React.StrictMode>,
)
