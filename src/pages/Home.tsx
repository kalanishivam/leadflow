import { getWorkFlows } from '@/api/apiClient';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
// import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const {logout , user} = useAuth();
    const [allWorkFlows, setAllWorkFlows] = useState<WorkflowApiResponse[]>([]);
    useEffect(()=>{
      const getWorkflowsOfUser = async()=>{
        try{
          const userWorkflows = await getWorkFlows();
          if("error" in userWorkflows){
            throw new Error('Failed to get user workflows');
          }
          setAllWorkFlows(userWorkflows);
        }catch(error){
          console.log(error);
        }
      }
      getWorkflowsOfUser();
    } , [])
  return (
    <div>
        <div className='w-full h-fit p-8 bg-gray-200 max-md:p-4 flex justify-between items-center text-black gont-bold'>
            <p>Welcome, {user}</p>
            <p className=' text-black rounded-xl px-2 py-2'>LEADFLOW BY <span className='font-bold text-green-700 underline text-[24px]'>SHIVAM KALANI</span></p>
            <div className='flex gap-2'>
            <button onClick={()=>{navigate('/flow/new')}} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl'>New Flow</button>
            <button onClick={()=>{logout()}} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl'>Logout</button>
            </div>
        </div>
        <div className='p-8 max-md:p-4'>
        <p>Current Flows : {allWorkFlows.length} Total workflows created so far</p>
        </div>
        <div className='grid grid-cols-2 max-md:grid-cols-1 p-8 max-md:p-4 gap-8 '>
          {allWorkFlows.map((flow , index)=>{
            return (
              <div key={index} className='bg-gray-300 rounded-xl w-fit p-4 flex flex-col items-center justify-evenly'>
                <p>Name : {flow.name}</p>
                <p>Status : {flow.status}</p>
                <p>Date : {new Date(flow.createdAt).toLocaleString()}</p>
              </div>
            )
          })}
        </div>
    </div>
  )
}

export default Home