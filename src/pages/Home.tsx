import { useAuth } from '@/context/AuthContext';
// import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const {logout , user} = useAuth();
    // const [allWorkFlows, setAllWorkFlows] = useState<any>([]);
    // useEffect(()=>{

    // } , [])
  return (
    <div>
        <div className='w-full h-fit p-8 bg-gray-200 max-md:p-4 flex justify-between items-center text-black gont-bold'>
            <p>Welcome, {user}</p>
            <p className=' text-black rounded-xl px-2 py-2'>Mern Stack Task BY <span className='font-bold text-green-700 underline text-[24px]'>SHIVAM KALANI</span></p>
            <div className='flex gap-2'>
            <button onClick={()=>{navigate('/flow/new')}} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl'>New Flow</button>
            <button onClick={()=>{logout()}} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl'>Logout</button>
            </div>
        </div>
        <div className='p-8 max-md:p-4'>
        <p>Current Flows</p>
        </div>
        <div className='grid grid-cols-2 max-md:grid-cols-1 p-8 max-md:p-4 gap-8 '>
        <div className='bg-gray-300 rounded-xl w-fit p-4 flex flex-col items-center justify-evenly'>
          <p>Flow Name</p>
          <p>Flow Status</p>
          <p>Created dat</p>
        </div>
        <div className='bg-gray-300 rounded-xl p-4 w-fit flex flex-col items-center justify-evenly'>
          <p>Flow Name</p>
          <p>Flow Status</p>
          <p>Created dat</p>
        </div>
        </div>
    </div>
  )
}

export default Home