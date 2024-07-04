import {useState} from 'react'
import closeImage from '../assets/close.png'

const Editpopup = (props) => {
    return (props.trigger) ? (
        <div className='fixed inset-0 h-full w-full flex items-center justify-center bg-black bg-opacity-50'>
        <div className='h-[75%] w-[40%] rounded-xl bg-gray-900'>
            <div className='m-[5%]'>
                <div className='flex'>
                    <h1 className='text-2xl font-semibold mb-[4%]'>Edit Link</h1>
                    <div className='flex-grow'/>
                    <button onClick={()=>{props.setTrigger(false)}} className='hover:bg-red-900 h-1/2 rounded-lg'>
                    <img src={closeImage} alt="Home" className="" />
                    </button>
                </div>
                <p>Title</p>
                <input type="text" className="mt-3 flex w-full items-center bg-gray-800 rounded-md p-2 h-10 focus:ring-2 focus:ring-neutral-700" value={props.linkData.title ? props.linkData.title : ""}/>
                <h1 className='text-lg mt-8'>Short Link</h1>
                <div className='flex mt-3 w-full'>
                    <div className='bg-gray-700 text-opacity-30 p-3 text-gray-200 w-[25%] rounded-md flex items-center h-10 mr-[3%]'>short.ly/</div>
                    <input type="text" className="w-[75%] bg-gray-800 p-2 h-10 hover:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-400 rounded-md" value={props.linkData.shortUrl} />
                </div>
                <div className='w-full flex flex-col items-center justify-center my-[8%]'>
                    <hr className="h-0.5 w-full bg-gray-200 border-0 dark:bg-gray-700"></hr>
                    <div className='flex justify-center items-center w-full mt-[3%] gap-3'>
                        <button onClick={()=>{props.setTrigger(false)}} className='text-white mx-4 hover:text-blue-300 text-lg'>Cancel</button>
                        <button className='text-black bg-blue-300 p-2 m-2 rounded-lg w-[20%] hover:bg-blue-200 font-semibold'>Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  ) : null;
}

export default Editpopup;