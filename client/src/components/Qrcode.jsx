import { useState, useEffect} from 'react'
import Simplebutton from './Simplebutton'
import Signin from './Signin'
import { useNavigate } from 'react-router-dom';
import homeImage from '../assets/home.png';
import linkImage from '../assets/link.png';
import qrcodeImage from '../assets/qr-code.png';
import analyticsImage from '../assets/analytics.png';
import settingsImage from '../assets/settings.png';
import searchImage from '../assets/search.png';

const Qrcode = () => {
    const navigate = useNavigate();
    const homeClick = () => {
    navigate('/home');
    };

    const createClick = () => {
    navigate('/create');
    };
    
    const mylinksClick = () => {
    navigate('/mylinks');
    };

  return (
    <>
    <div className="flex h-screen">
        {/* Sidebar */}
        <div className='bg-gray-900 w-[20%] flex flex-col border-r-1 border-t-1'>
            <div className='flex p-2 items-center justify-center'>
                <p className='text-white text-4xl p-4 font-bold font-mono'>ShortLY</p>
            </div>
            <div className='flex p-2 items-center justify-center'>
                <button className='p-2 w-full bg-gray-800 rounded-xl font-medium flex items-center'>
                <div className="border-l-4 border-blue-500 h-5"></div>
                <img src={homeImage} alt="Home" className='pl-2 pr-5'/>
                Home
                </button>
            </div>
            <div className='flex p-2 items-center justify-center'>
                <button onClick={createClick} className='p-2 w-full pl-4 hover:bg-gray-800 rounded-xl font-medium flex items-center gap-5'>
                <img src={linkImage} alt="Home" className="h-6 w-6" />
                New Link
                </button>
            </div>
            <div className='flex p-2 items-center justify-center'>
                <button onClick={mylinksClick} className='p-2 w-full pl-4 hover:bg-gray-800 rounded-xl font-medium flex items-center gap-5'>
                <img src={linkImage} alt="Home" className="h-6 w-6" />
                My Links
                </button>
            </div>
            <div className='flex p-2 items-center justify-center'>
                <button className='p-2 w-full pl-4 hover:bg-gray-800 rounded-xl font-medium flex items-center gap-5'>
                <img src={qrcodeImage} alt="Home" className="h-6 w-6" />
                QR Code
                </button>
            </div>
            <div className='flex p-2 items-center justify-center'>
                <button className='p-2 w-full pl-4 hover:bg-gray-800 rounded-xl font-medium flex items-center gap-5'>
                <img src={analyticsImage} alt="Home" className="h-6 w-6" />
                Analytics
                </button>
            </div>

            <div className="flex-grow" />
            <div className='flex p-2 items-center justify-center'>
                <button className='p-2 w-full pl-4 hover:bg-gray-800 rounded-xl font-medium flex items-center gap-5'>
                <img src={settingsImage} alt="Home" className="h-6 w-6" />
                Settings
                </button>
            </div>
        </div>

        {/* right-non-sidebar */}
        <div className='flex flex-col flex-grow'>
            {/* Topbar */}
            <div style={{background: '#03001C'}} className='font-mono flex p-2 items-center'>
                <div className='flex w-full items-center justify-center'>
                    <div className='flex w-1/2 items-center bg-gray-800 rounded-md p-2 h-10 focus-within:ring-1 focus-within:ring-blue-400'>
                        <img src={searchImage} alt="Search Icon" className=" m-2" />
                        <input type="text" className="bg-transparent text-gray-100 text-sm focus:outline-none" placeholder="Search..." />
                    </div>
                </div>
                <div className='flex items-center justify-center'>
                    <button className='text-black bg-blue-300 py-2 m-2 rounded-lg w-32 hover:bg-blue-200 font-semibold'>Logout</button>
                </div>
            </div>

        </div>
    </div>
    </>
  )
}

export default Qrcode;