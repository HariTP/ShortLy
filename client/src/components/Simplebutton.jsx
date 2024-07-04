import React from 'react'

function Simplebutton({btnText="click me →"}) {
  return (
    <button className='text-white mx-4 hover:text-blue-300 text-lg'>{btnText}</button>
  )
}

export default Simplebutton