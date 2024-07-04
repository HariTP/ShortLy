import { useState, useEffect} from 'react'
import './App.css'
import Topbar from './components/Topbar'
import Simplebutton from './components/Simplebutton'
import Signin from './components/Signin'
import { useNavigate } from 'react-router-dom';


function App() {
  const navigate = useNavigate();
  const homeClick = () => {
    navigate('/');
  };

  const loginClick = () => {
    navigate('/login');
  };

  const signupClick = () => {
    navigate('/register');
  };

  return (
    <>
      {/*Topbar starts*/}
      <div>
        <div style={{background: '#03001C'}} className='h-15 px-10 bg-gray-950 font-mono flex p-4 items-center sticky top-0 z-50'>
          <p className='text-white text-4xl font-bold'>ShortLY</p>
          <div className='flex w-full items-center justify-center'>
            <button onClick={homeClick} className='text-white mx-4 hover:text-blue-300 text-lg'>Home</button>
            <Simplebutton btnText='Analytics'/>
            <Simplebutton btnText='Features'/>
            <Simplebutton btnText='About'/>
          </div>
          <div className='flex items-center justify-center'>
          <button onClick = {loginClick} className='text-white mx-4 hover:text-blue-300 text-lg font-semibold'>Login</button>
          <button onClick={signupClick} className='text-black bg-blue-300 p-2 m-2 rounded-lg w-32 hover:bg-blue-200 font-semibold'>Register</button>
          </div>
      </div>
      </div>

      {/*Topbar ends*/}

      <div className='pt-24'>
        <h1 className='ml-36 flex w-3/4 items-center justify-center font-semibold text-5xl'>Shorten URLs and Track Clicks</h1>
        <h3 className='ml-36 mt-10 flex w-3/4 items-center justify-center font-medium text-xl'>Your all-in-one URL shortening and analytics tool</h3>

        <div className='flex items-center justify-center'>
          <form action="" method="post">
            <div className='flex p-10'>
              <input type="text" className="w-80 bg-gray-800 text-gray-100 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400' py-1 px-3 rounded-l-xl" placeholder="Enter a valid URL"/>
              <button className='outline-none text-black bg-blue-300 px-6 py-3 text-lg shrink-0 rounded-r-xl  hover:bg-blue-200 font-semibold'
              >Generate</button>
            </div>
            <p className='flex items-center justify-center text-xs'>*short URL generated without login only valid for 24hrs</p>
          </form>
        </div>

      </div>
    </>
  )
}


export default App
