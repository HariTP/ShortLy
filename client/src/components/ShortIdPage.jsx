import { useState, useEffect} from 'react'
import Axios from 'axios';
import Simplebutton from './Simplebutton'
import Signin from './Signin'
import Editpopup  from './Editpopup';
import { useNavigate, useParams } from 'react-router-dom';
import homeImage from '../assets/home.png';
import linkImage from '../assets/link.png';
import qrcodeImage from '../assets/qr-code.png';
import analyticsImage from '../assets/analytics.png';
import settingsImage from '../assets/settings.png';
import searchImage from '../assets/search.png';
import qrcodedullImage from '../assets/qrsample.jpg'
import copyImage from '../assets/copy.png'
import editImage from '../assets/edit.png'
import shareImage from '../assets/share.png'
import deleteImage from '../assets/delete.png'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
  } from "recharts";

const ShortIdPage = () => {
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

    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const {shortId} = useParams();
    const [data, setData] = useState(null);
    useEffect(() => {
        Axios.get(serverUrl+`api/${shortId}`).then((response) => {
            setData(response.data);
        });
      }, []); 
    
    const userBarData = [];
    if (data) {
        const startDate = new Date(data.createdAt);
        console.log(startDate.toLocaleString('default', { month: 'short' }));
        console.log(new Intl.DateTimeFormat('default', {weekday: 'short'}).format(startDate));
        for (let i=0; i<30; i++) {
            const day = new Date(data.createdAt);
            day.setDate(day.getDate() + i);
            const obj = {};
            obj.name = `${day.getDate()} ${day.toLocaleString('default', { month: 'short' })} - ${new Intl.DateTimeFormat('default', {weekday: 'short'}).format(day)} `;
            obj.clicks = data.totalClicks[i];
            userBarData.push(obj);
        }
    }

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="p-4 bg-slate-900 flex flex-col gap-1 rounded-md">
                    <p className="text-medium text-sm">{label}</p>
                    <p className="text-sm text-blue-400">
                    Clicks:
                    <span className="ml-2">{payload[0].payload.clicks}</span>
                    </p>
                </div>
            );
        }
      };

    const [editOpen, setEditOpen] = useState(false);

    const openEditPopup = () => {
        console.log("opened");
        setEditOpen(true);
    }

    return (
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
                    <button onClick={mylinksClick} className='p-2 w-full bg-gray-800 rounded-xl font-medium flex items-center'>
                    <div className="border-l-4 border-blue-500 h-5"></div>
                    <img src={linkImage} alt="Home" className='pl-2 pr-5'/>
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
            <div className='ml-[20%] flex flex-col w-full'>
                {/* Topbar */}
                <div style={{background: '#03001C'}} className='fixed top-0 left-[20%] w-[80%] h-[13%] font-mono flex p-2 items-center justify-center'>
                    <div className='flex w-full items-center justify-center'>
                        <div className='flex w-1/2 items-center bg-gray-800 rounded-md p-2 h-10 focus-within:ring-1 focus-within:ring-blue-400'>
                            <img src={searchImage} alt="Search Icon" className=" m-2" />
                            <input type="text" className="bg-transparent w-full text-gray-100 text-sm focus:outline-none" placeholder="Search..." />
                        </div>
                    </div>
                    <div className='flex items-center justify-center'>
                        <button className='text-black bg-blue-300 py-2 m-2 rounded-lg w-32 hover:bg-blue-200 font-semibold'>Logout</button>
                    </div>
                </div>
                
                {/* Main Content Starts*/}
                <div className='flex flex-col px-[5%] mt-[9%] h-full'>
    
                    {/* Short link info card starts*/}
                    <div className=''>
                    {data ?
                        (<div className='my-[1%] flex flex-col justify-center items-center w-full'>
                        <div className='flex w-full bg-gray-800 mt-[2%] rounded-lg px-[3%] py-[1%]'>
                            <div className='w-full flex flex-col p-[1%]'>
                            <p className='text-3xl w-[50%] pl-[2%] font-semibold'>{data.title ? data.title : "Untitled"}</p>
                            <a href={serverUrl+data.shortUrl} className='text-base text-blue-400 w-[50%] pl-[2%] mt-2 font-semibold hover:underline'>short.ly/{data.shortUrl}</a>
                            <a href={data.redirectUrl} className='text-base w-full pl-[2%] pt-[0.5%] font-semibold hover:underline'>{data.redirectUrl}</a>
                            <div className='flex gap-6 pl-[2%] mt-[3%]'>
                                <p>{new Date(data.createdAt).getDate()}-{new Date(data.createdAt).getMonth()+1}-{new Date(data.createdAt).getFullYear()}</p>
                                <a href="" className='hover:underline'>Total Clicks: {data.visitHistory.length}</a>
                            </div>     
                            </div>
                            <div className='flex-grow'/>
                            <div className='flex gap-3 h-[30%] pt-[1%] w-[40%]'>
                                <div className='flex-grow' />
                            <button className='p-1.5 rounded-md bg-gray-900 hover:bg-gray-600 text-sm flex items-center gap-2'>
                            <img src={copyImage} alt="" className="h-4 w-4" />
                                Copy
                            </button>
                            <button onClick={() => setEditOpen(!editOpen)} className='p-1.5 rounded-md bg-gray-800 hover:bg-gray-900 text-sm flex items-center gap-2'>
                            <img src={editImage} alt="" className="h-4 w-4" />
                            </button>
                            <button className='p-1.5 rounded-md bg-gray-800 hover:bg-gray-900 text-sm flex items-center gap-2'>
                            <img src={shareImage} alt="" className="h-4 w-4" />
                            </button>
                            <button className='p-1.5 rounded-md bg-gray-800 hover:bg-gray-900 text-sm flex items-center gap-2'>
                            <img src={deleteImage} alt="" className="h-4 w-4" />
                            </button>
                            </div>
                        </div>
                    </div>) : (
                    <div className=" w-full h-full">loading...</div>
                    )}
                    </div>
                    {/* Short link info card ends*/}
                    {/* <hr className="h-0.5 w-full bg-gray-100 border-0 dark:bg-gray-700"></hr> */}
                    {/* QR code part */}
                    <div className='mb-[3%] flex flex-col justify-center items-center h-[50%] w-full'>
                        <div className='flex h-full w-full bg-gray-800 mt-[2%] rounded-lg px-[3%] py-[1%]'>
                            <div className='w-full flex p-[1%]'>
                                <div className='flex flex-col w-[16%] items-center justify-center'>
                                    <p className='text-xl font-semibold'>QR Code</p>
                                    <img src={qrcodedullImage} alt="Home" className="mt-[10%] h-[75%] w-full" /> 
                                </div>  
                                <div className='ml-[2%] mt-[4%]'>
                                    <button className='text-gray-900 px-5 bg-gray-300 py-2 m-2 rounded-md hover:bg-gray-100 font-bold'>Create QR Code</button>
                                </div>   
                            </div>
                        <div className='flex-grow'/ ></div>
                    </div>
                    {/* QR code part ends */}

                    <hr className="h-0.5 w-full bg-gray-200 border-0 dark:bg-gray-700"></hr>

                    {/* Bar graph part */}
                    <div className='w-full bg-gray-800 rounded-2xl'>
                        <div className='flex items-center justify-center py-[3%] px-[5%]'>
                            <p className='text-2xl font-semibold'>Engagement by users</p>
                            <div className='flex-grow'></div>
                            <button className='bg-blue-300 p-[0.75%] rounded-lg hover:bg-blue-200 text-black'>Time Period</button>
                        </div>
                        <div className='flex items-center justify-center'>
                            <BarChart width={800} height={300} data={userBarData} margin ={{top: 5, right: 30, left: 20, bottom: 5}} barSize={40}>
                                <XAxis dataKey="name" interval={5} tick={{angle: -10}} tickFormatter={(value) => `${value.slice(0,2)} ${value.slice(2,6)}`} tickMargin={6} padding={{ left: 5 }}/>
                                <YAxis />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend />
                                <Bar 
                                dataKey="clicks" 
                                fill="#41C9E2" 
                                />
                            </BarChart>
                        </div>
                    </div>
                </div>
                {/* Main Content Ends */}
            </div>
            <Editpopup trigger={editOpen} linkData={data} setTrigger={setEditOpen}/>
        </div>
      )
}

export default ShortIdPage;