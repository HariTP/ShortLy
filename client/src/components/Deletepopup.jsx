import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import closeImage from '../assets/close.png'

const Deletepopup = (props) => {
    const notify = (message) => {
        
    }
    const navigate = useNavigate();
    const handleDelete =(shortId) => {
        fetch(import.meta.env.VITE_SERVER_URL+shortId, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Could not delete. Please try again.");
            }
            return response.json();
        })
        .then(() => {
            props.setTrigger('');
            navigate(`/mylinks`);
            notify(props.message)
        })
        .catch(error => {
            console.log("An error occurred: " + error.message);
        });
    }

    return (props.trigger!='') ? (
        <div className='fixed inset-0 h-full w-full flex items-center justify-center bg-black bg-opacity-50'>
        <div className='h-[28%] w-[40%] rounded-xl bg-gray-900'>
            <div className='m-[5%]'>
                <div className='flex'>
                    <h1 className='text-xl font-semibold mb-[1%]'>Are you sure to delete this link?</h1>
                    <div className='flex-grow'/>
                    <button onClick={()=>{props.setTrigger(false)}} className='hover:bg-red-900 h-1/2 rounded-lg'>
                    <img src={closeImage} alt="Home" className="" />
                    </button>
                </div>
                <div className='w-full flex flex-col items-center justify-center my-[1%]'>
                    <div className='flex justify-center items-center w-full mt-[3%] gap-3'>
                        <button onClick={()=>{props.setTrigger(false)}} className='text-white mx-4 hover:text-blue-300 text-lg'>Cancel</button>
                        <button onClick={()=>{handleDelete(props.trigger)}} className='text-black bg-blue-300 px-[4%] py-[2%] m-2 rounded-lg hover:bg-blue-200 font-medium'>Delete</button>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
  ) : null;
}

export default Deletepopup;