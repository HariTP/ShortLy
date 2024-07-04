import { useState, useEffect } from 'react'
import Simplebutton from './Simplebutton'
import Signin from './Signin'
import { useNavigate } from 'react-router-dom';
import homeImage from '../assets/home.png';
import linkImage from '../assets/link.png';
import qrcodeImage from '../assets/qr-code.png';
import analyticsImage from '../assets/analytics.png';
import settingsImage from '../assets/settings.png';
import searchImage from '../assets/search.png';

const Createlink = () => {
    const navigate = useNavigate();
    const homeClick = () => {
        navigate('/home');
    };
    const mylinksClick = () => {
        navigate('/mylinks');
    };

    const analyticsClick = () => {
        navigate('/analytics');
    };

    const [destUrl, setDesturl] = useState('');
    const [title, setTitle] = useState('');
    const [customHalf, setCustomHalf] = useState('');

    const handleCreate = () => {
        const payload = {
            url: destUrl
        }
        if (title) {
            console.log(title);
            payload.title = title
        };
        if (customHalf) {
            payload.customHalf = customHalf;
        }

        fetch(import.meta.env.VITE_SERVER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            if (response.status==400) {
                alert("Custom half already in use!");
                return;
            }
            return response.json()
        })
        .then(data => {
            console.log(data);
            navigate(`../mylinks/${data.id}`);
        })
    }

    return (
    <>
    <div className="flex h-screen">
        <div className='fixed top-0 h-full bg-gray-900 w-[20%] flex flex-col border-r-1 border-t-1'>
            <div className='flex p-2 items-center justify-center'>
                <p className='text-white text-4xl p-4 font-bold font-mono'>ShortLY</p>
            </div>
            <div className='flex p-2 items-center justify-center'>
                <button onClick={homeClick} className='p-2 w-full pl-4 hover:bg-gray-800 rounded-xl font-medium flex items-center gap-5'>
                <img src={homeImage} alt="Home" className="h-6 w-6" />
                Home
                </button>
            </div>
            <div className='flex p-2 items-center justify-center'>
                <button className='p-2 w-full bg-gray-800 rounded-xl font-medium flex items-center'>
                <div className="border-l-4 border-blue-500 h-5"></div>
                <img src={linkImage} alt="Home" className='pl-2 pr-5'/>
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
                <button onClick={analyticsClick} className='p-2 w-full pl-4 hover:bg-gray-800 rounded-xl font-medium flex items-center gap-5'>
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

        <div className='ml-[20%] flex flex-col flex-grow'>
            {/* Topbar */}
            <div style={{background: '#03001C'}} className='font-mono flex p-2 items-center'>
                <div className='flex w-full items-center justify-center'>
                    <div className='flex w-1/2 items-center bg-gray-800 rounded-md p-2 h-10 focus-within:ring-1 focus-within:ring-blue-400'>
                        <img src={searchImage} alt="Search Icon" className=" m-2" />
                        <input type="text" className="bg-transparent text-gray-100 text-sm border-none focus:border-none focus:outline-none w-full" placeholder="Search..." />
                    </div>
                </div>

                <div className='flex items-center justify-center'>
                    <button className='text-black bg-blue-300 py-2 m-2 rounded-lg w-32 hover:bg-blue-200 font-semibold'>Logout</button>
                </div>
            </div>

            {/* Main Content */}
            <div className='mt-5 pl-20'>
                <h1 className='text-3xl font-semibold'>Create New ShortLY link</h1>
                <h1 className='mt-8 text-lg'>Destination URL</h1>
                <input 
                type="text"
                value={destUrl}
                onChange={e => {setDesturl(e.target.value)}} 
                className="mt-3 flex w-[75%] items-center bg-gray-800 rounded-md p-2 h-10 focus:ring-2 focus:ring-neutral-700" 
                placeholder="https://example.com/long-url" />
                <h1 className='text-lg mt-8'>Title (optional) </h1>
                <input 
                type="text"
                value={title}
                onChange={e => {setTitle(e.target.value)}} 
                className="mt-3 flex w-3/4 items-center bg-gray-800 rounded-md p-2 h-10 focus:ring-2 focus:ring-neutral-700" />
                <h1 className='text-lg mt-8'>Short Link</h1>
                <div className='flex mt-3'>
                    <div className='bg-gray-700 p-3 text-gray-200 text-opacity-70 w-[22%] rounded-md flex items-center h-10 mr-[3%]'>short.ly/</div>
                    <input 
                    type="text" 
                    value={customHalf}
                    onChange={e => {setCustomHalf(e.target.value)}}
                    className="w-[50%] bg-gray-800 p-2 h-10 hover:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-400 rounded-md" placeholder="Custom half (optional)" />
                </div>
                <h1 className='text-lg mt-8'>QR Code (optional) </h1>
                <label class="my-5 inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer"/>
                    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Generate a scannable QR Code of ShortLY link </span>
                </label>
                {/* Create link part */}
                <div className='w-[75%] flex flex-col items-center justify-center my-5'>
                    <hr className="h-0.5 w-full bg-gray-200 border-0 dark:bg-gray-700"></hr>
                    <div className='flex justify-center items-center w-full mt-[1.5%] gap-3'>
                        <button className='text-white mx-4 hover:text-blue-300 text-lg'>Cancel</button>
                        <button onClick={handleCreate} className='text-black bg-blue-300 p-2 m-2 rounded-lg w-[15%] hover:bg-blue-200 font-semibold'>Create</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Createlink;