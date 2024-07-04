import { useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import Simplebutton from './Simplebutton'
import Sort from './Sort';
import Deletepopup from './Deletepopup';
import homeImage from '../assets/home.png';
import linkImage from '../assets/link.png';
import qrcodeImage from '../assets/qr-code.png';
import analyticsImage from '../assets/analytics.png';
import settingsImage from '../assets/settings.png';
import searchImage from '../assets/search.png';
import Axios from "axios";
import copyImage from '../assets/copy.png'
import editImage from '../assets/edit.png'
import shareImage from '../assets/share.png'
import deleteImage from '../assets/delete.png';

const Mylinks = () => {
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
    
    const linkClick = (shortId) => {
    navigate(`/mylinks/${shortId}`);
    };

    const analyticsClick = () => {
      navigate('/analytics');
    };

    const reload = () => {
      useEffect(() => {
        console.log("Reloading page...");
      }, [])
    }
    
    const location = useLocation();
    const serverUrl = import.meta.env.VITE_SERVER_URL;

    const queryParams = new URLSearchParams(location.search);
    const [findStr, setFindStr] = useState("");
    // Fetching and sorting(if required) data
    const [data, setData] = useState([]);
    useEffect(() => {
      Axios.get(serverUrl).then((response) => {
        let sortedData = response.data;
        const clickSort = queryParams.get('clickSort');
        const dateSort = queryParams.get('dateSort');
        if (clickSort) {
          clickSort=="low2high" ? 
          sortedData.sort((a, b) => a.visitHistory.length - b.visitHistory.length) 
          :
          sortedData.sort((a, b) => b.visitHistory.length - a.visitHistory.length);
          console.log(sortedData);
        } else if (dateSort) {
          console.log(dateSort);
          dateSort=="new2old" ?
          sortedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          :
          sortedData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        }
        setData(sortedData);
      });
    }, [findStr]);

    //Finding from topbar search
    useEffect (() => {
      if (findStr) {
        const clickSort = queryParams.get('clickSort');
        const dateSort = queryParams.get('dateSort');
        if (clickSort) {
          navigate(`?clickSort=${clickSort}&find=${findStr}`);
        } else if(dateSort) {
          navigate(`?clickSort=${dateSort}&find=${findStr}`);
        } else {
          navigate(`?find=${findStr}`);
        }
      }
    }, [findStr])

    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
          setFindStr(e.target.value);
      }
    };

    const strMatch = queryParams.get('find');
    useEffect(() => {
        if (strMatch) {
          Axios.get(`${serverUrl}?find=${strMatch}`)
          .then((response) => {
            setData(response.data);
          })
        }
    },[strMatch])

    const [deleteOpen, setDeleteOpen] = useState('');
    const [isSuccess, setIsSuccess] =useState(false);
    

    // Copy button functionality
    const [copyButtonTexts, setCopyButtonTexts] = useState(Array(data.length).fill("Copy"));
    const handleCopy = (index, text) => {
      // Copy functionality here
      navigator.clipboard.writeText(text);
      // Update the button text to "Copied" for the specific index
      const newTexts = [...copyButtonTexts];
      newTexts[index] = "Copied";
      setCopyButtonTexts(newTexts);
      // Revert the button text back to "Copy" after 2 seconds
      setTimeout(() => {
        setCopyButtonTexts(prevTexts => {
          const revertedTexts = [...prevTexts];
          revertedTexts[index] = "Copy";
          return revertedTexts;
        });
      }, 2000);
    };
    
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
                <button className='p-2 w-full bg-gray-800 rounded-xl font-medium flex items-center'>
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

        {/* right-non-sidebar */}
        <div className='ml-[20%] flex flex-col w-full'>
            {/* Topbar */}
            <div style={{background: '#03001C'}} className='fixed z-10 top-0 left-[20%] w-[80%] h-[13%] font-mono flex p-2 items-center justify-center'>
                <div className='flex w-full items-center justify-center'>
                    <div className='flex w-1/2 items-center bg-gray-800 rounded-md p-2 h-10 focus-within:ring-1 focus-within:ring-blue-400'>
                        <img src={searchImage} alt="Search Icon" className=" m-2" />
                        <input type="text"
                        onKeyDown={handleKeyDown}
                        className="bg-transparent w-full text-gray-100 text-sm focus:outline-none" placeholder="Search..." />
                    </div>
                </div>
                <div className='flex items-center justify-center'>
                    <button className='text-black bg-blue-300 py-2 m-2 rounded-lg w-32 hover:bg-blue-200 font-semibold'>Logout</button>
                </div>
            </div>
            
            {/* Main Content Starts*/}
            <div className='flex flex-col px-[5%] mt-[9%]'>
              <div className='flex'>
                <h1 className='text-3xl font-semibold'>My links</h1>
                <div className='flex-grow'></div>

                {/* Dropdown menu starts*/}
                <Sort/>
                {/* Dropdown menu ends*/}
              </div>

              {/* Short link info card starts*/}
              <div className='mb-5'>
              {data.length ? (
              data.map((element, index) => (
                <div key={index} className='my-[1%] flex flex-col justify-center items-center w-full'>
                  <div className='flex w-full bg-gray-700 mt-[2%] rounded-lg px-[3%] py-[1%]'>
                    <div className='w-full flex flex-col p-[1%]'>
                      <a href={`mylinks/${element.shortUrl}`} className='text-2xl pl-[2%] font-semibold hover:underline'>{element.title ? element.title : "Untitled"}</a>
                      <a href={serverUrl+element.shortUrl} className='text-base text-blue-400 inline-block max-w-full pl-[2%] mt-2 font-semibold hover:underline'>short.ly/{element.shortUrl}</a>
                      <a href={element.redirectUrl} className='text-base w-full pl-[2%] pt-[0.5%] font-semibold hover:underline'>{element.redirectUrl}</a>
                      <div className='flex gap-6 pl-[2%] mt-[3%]'>
                        <p>Created at: {element.createdAt.slice(0,10)}</p>
                        <a href="" className='hover:underline'>Total Clicks: {element.visitHistory.length}</a>
                      </div>     
                    </div>
                    <div className='flex-grow'/>
                        <div className='flex gap-3 h-[30%] pt-[1%] w-[40%]'>
                            <div className='flex-grow' />
                            <button className='p-1.5 rounded-md bg-gray-800 hover:bg-gray-900 text-sm flex items-center gap-2' onClick={() => handleCopy(index, serverUrl+element.shortUrl)}>
                            <img src={copyImage} alt="" className="h-4 w-4" />
                            {copyButtonTexts[index] || "Copy"}
                          </button>
                          
                          <button className='p-1.5 rounded-md bg-gray-800 hover:bg-gray-900 text-sm flex items-center gap-2'>
                          <img src={shareImage} alt="" className="h-4 w-4" />
                          </button>
                          <button onClick={() => {setDeleteOpen(element.shortUrl)}} className='p-1.5 rounded-md bg-gray-800 hover:bg-gray-900 text-sm flex items-center gap-2'>
                          <img src={deleteImage} alt="" className="h-4 w-4" />
                          </button>
                        </div>
                  </div>
              </div>
              ))
            ) : (
              <div className="mt-[5%] w-full h-full flex items-center justify-center">
                <p className='text-3xl font-extrabold'>Loading...</p>
              </div>
            )}
              </div>
              
              {/* Short link info card ends*/}
            </div>
            {/* Main Content Ends */}
        </div>
        <Deletepopup trigger={deleteOpen} setTrigger={setDeleteOpen} setStatus={setIsSuccess}/>        
    </div>
    </>
  )
}

export default Mylinks;