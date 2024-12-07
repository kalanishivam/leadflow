import { signupUser } from '@/api/apiClient';
import {  useToast } from '@/hooks/use-toast';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
  const [loadingSignupButton  , setLoadingSignupButton] = useState(false);
    const { toast } = useToast()
    const navigate = useNavigate();
    const handleFormSubmit = async(event: React.FormEvent<HTMLFormElement>)=>{
        try{
          setLoadingSignupButton(true);
            event.preventDefault();
            const formData = new FormData(event.target as HTMLFormElement);
            console.log(`the email is ${formData.get('email')}`)
            console.log(`the password is ${formData.get('password')}`)
            const email = formData.get('email');
            const password = formData.get('password');
            const username = formData.get('name');
            if(password !== formData.get('confirmPassword')){
              toast({
                title: "Error",
                description: "Passwords do not match",
                duration: 5000,
                style : {backgroundColor : 'red' , color : 'white'}
              })
              return;
            }
            if (typeof email !== 'string' || typeof password !== 'string' || typeof username !== 'string') {
                throw new Error('Email or password is missing or invalid');
              }
              const signUp = await signupUser({name : username , email , password});
              if("error" in signUp){
                throw new Error('Failed to signup');
              }
              toast({
                title: "Signup successful",
                description: "Continue to login with your new account",
                color: "green",
                duration: 5000,
              })
              navigate('/login');
              
        }catch(error){
            toast({
                title: "Error",
                description: "Please use different email",
                duration: 5000,
                style : {backgroundColor : 'red' , color : 'white'}
              })
            console.log(error)
        }finally{
          setLoadingSignupButton(false)
        }
    }
  return (
    <div className='w-screen h-screen flex items-center justify-center text-black bg-gradient-to-r from-red-500/10 via-yellow-500/10 via-green-500/10 via-blue-500/10 via-indigo-500/10 to-purple-500/10 bg-opacity-5'>
        <div className='flex flex-col max-md:w-full md:w-1/2  rounded-xl  p-8 max-md:p-4 gap-3 bg-white shadow-lg'>
        <div className='font-bold text-[24px] text-center mb-4'>
            <p className=' '>Create An Account</p>
            <p className='text-[14px] text-gray-400 font-normal' >Already have an account? <Link className='underline text-blue-500' to='/login'>Login</Link></p>
            </div>
            <form onSubmit={handleFormSubmit} className='flex flex-col gap-4 w-full'>
            <div className='flex flex-col gap-1 '>
                <label className=' font-semibold text-[24px] '>Name</label>
                <input type='text' placeholder='Name' className='border-b-2 shadow-inner border-gray-500 rounded-lg p-2' name='name' />
                </div>
                <div className='flex flex-col gap-1'>
                <label className=' font-semibold text-[24px] '>Email</label>
                <input type='email' placeholder='Email' className=' border-b-2 shadow-inner border-gray-500  rounded-lg p-2' name='email' />
                </div>
                <div className='flex flex-col gap-1'>
                <label className=' font-semibold text-[24px] '>Password</label>
                <input type='password' placeholder='Password' className='border-b-2 shadow-inner border-gray-500 rounded-lg p-2' name='password' />
                </div>
                <div className='flex flex-col gap-1'>
                <label className=' font-semibold text-[24px] '>Confirm Password</label>
                <input type='password' placeholder='Password' className='border-b-2 shadow-inner border-gray-500 rounded-lg p-2' name='confirmPassword' />
                </div>
                <button disabled = {loadingSignupButton} className='bg-black  text-white rounded-lg p-2 text-center'>{loadingSignupButton ? 'Loading...' : 'Signup'}</button>
            </form>
        </div>
      
    </div>
  )
}

export default Signup