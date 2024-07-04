import React from 'react'
import Simplebutton from './Simplebutton'

function Topbar() {
  return (
    <div style={{background: '#03001C'}} className='h-20 px-10 bg-gray-950 font-mono flex p-6 items-center sticky top-0 z-50'>
      <p className='text-white text-4xl font-bold'>SHORTLY</p>
      <div className='flex w-full items-center justify-center'>
        <Simplebutton btnText='Home'/>
        <Simplebutton btnText='Analytics'/>
        <Simplebutton btnText='Features'/>
        <Simplebutton btnText='About'/>
      </div>
      <div className='flex items-center justify-center'>
        <Simplebutton btnText='Login'/>
        <button className='text-black bg-blue-300 p-2 m-2 rounded-lg w-32 hover:bg-blue-200 font-semibold'>Signup</button>
      </div>
    </div>
  )
}

export default Topbar