import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';

const Login = () => {
    const inputRef  = useRef<HTMLInputElement>(null);
    console.log(`rendered first time baby`)
    const handleFormSubmit = async(event: React.FormEvent<HTMLFormElement>)=>{
        try{
            event.preventDefault();
            const formData = new FormData(event.target as HTMLFormElement);
            console.log(`the email is ${formData.get('email')}`)
            console.log(`the password is ${formData.get('password')}`)
        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        if (inputRef.current) {
            inputRef.current.focus();
          }
    } , [])
  return (
    <div className='w-screen h-screen flex items-center justify-center text-black bg-gradient-to-r from-red-500/10 via-yellow-500/10 via-green-500/10 via-blue-500/10 via-indigo-500/10 to-purple-500/10 bg-opacity-5'>
        <div className='flex flex-col max-md:w-full md:w-1/2  rounded-xl   gap-3 p-4 max-md:p-2 bg-white shadow-lg'>
        <div className='font-bold text-[24px] text-center mb-4'>
            <p className=' '>Login</p>
            <p className='text-[14px] text-gray-400 font-normal' >New User? <Link className='underline text-blue-500' to='/signup'>Signup</Link></p>
            </div>
            <form onSubmit={handleFormSubmit} className='flex flex-col gap-4 w-full'>
                <div className='flex flex-col gap-1'>
                <label htmlFor='email' className=' font-semibold text-[24px] '>Email</label>
                <input ref={inputRef} type='email' placeholder='Email' className=' border-b-2 border-gray-500 shadow-inner  rounded-lg p-2' name='email' />
                </div>
                <div className='flex flex-col gap-1'>
                <label htmlFor='password' className=' font-semibold text-[24px] '>Password</label>
                <input type='password' placeholder='Password' className='border-b-2 border-gray-500 shadow-inner rounded-lg p-2' name='password' />
                </div>
                <button className='bg-black  text-white rounded-lg p-2 text-center'>Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login