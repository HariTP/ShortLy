import { useState, useEffect} from 'react'
import { ResponsiveBar } from '@nivo/bar'
import Simplebutton from './Simplebutton'
import Signin from './Signin'
import { useNavigate } from 'react-router-dom';
import homeImage from '../assets/home.png';
import linkImage from '../assets/link.png';
import qrcodeImage from '../assets/qr-code.png';
import analyticsImage from '../assets/analytics.png';
import settingsImage from '../assets/settings.png';
import searchImage from '../assets/search.png';
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const Analytics = () => {
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
    
    const analyticsClick = () => {
    navigate('/analytics');
    };

    
    const data = [
        {
          name: "10 Mar",
          uv: 4000,
          pv: 3,
          amt: 2400
        },
        {
          name: "11 Mar",
          uv: 3000,
          pv: 10,
          amt: 2210
        },
        {
          name: "12 Mar",
          uv: 2000,
          pv: 10,
          amt: 2290
        },
        {
          name: "13 Mar",
          uv: 2780,
          pv: 100,
          amt: 2000
        },
        {
          name: "14 Mar",
          uv: 1890,
          pv: 5,
          amt: 2181
        },
        {
          name: "15 Mar",
          uv: 2390,
          pv: 20,
          amt: 2500
        },
        {
          name: "15 Mar",
          uv: 3490,
          pv: 55,
          amt: 2100
        }
      ];

  return (
    <>
    <div className="flex h-screen">
        {/* Sidebar */}
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
                <button onClick={analyticsClick} className='p-2 w-full bg-gray-800 rounded-xl font-medium flex items-center'>
                <div className="border-l-4 border-blue-500 h-5"></div>
                <img src={analyticsImage} alt="Home" className='pl-2 pr-5'/>
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
        <div className='ml-[20%] flex flex-col w-full'>
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
            {/* Main Content starts */}
            <div className="flex items-center justify-center h-screen">
              <div className='w-[90%] bg-gray-800 rounded-2xl'>
                <div className='flex items-center justify-center py-[3%] px-[5%]'>
                  <p className='text-2xl font-semibold'>Engagement by users</p>
                  <div className='flex-grow'></div>
                  <button className='bg-blue-300 p-[0.75%] rounded-lg hover:bg-blue-200 text-black'>Time Period</button>
                </div>
                <div className='flex items-center justify-center'>
              <BarChart width={800} height={300} data={data} margin ={{top: 5, right: 30, left: 20, bottom: 5}} barSize={40}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip isAnimationActive={false} wrapperStyle={{ backgroundColor: 'black' }}/>
              <Legend />
              <Bar 
              dataKey="pv" 
              fill="#41C9E2" 
              />
              </BarChart>
              </div>
              </div>       
            </div>

        </div>
    </div>
    </>
  )
}

export default Analytics;