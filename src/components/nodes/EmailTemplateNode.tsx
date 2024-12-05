import { Handle, type NodeProps, Position, type Node } from '@xyflow/react'
import React, { useState, useEffect } from 'react'
import { UserRound, Search, Plus, Mail } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ComboBox } from '../ComboBox'


export type EmailTemplate = {
  name: string
  subject: string
  body: string
}
export type EmailTemplateNodeType = Node<EmailTemplate, 'emailTemplateNode'>;

const EmailTemplateNode = ({updateNodeData} : { updateNodeData?: (emailTemplate: EmailTemplate) => void }) => {
    const [emailTemplate , setEmailTemplate] = useState<EmailTemplate | null>(null);
  return (
    <>
      <Handle type='target' position={Position.Top} id='a222' />
      <Handle type='source' position={Position.Bottom} id='a22' />
      <Dialog>
        <DialogTrigger asChild>
        <div 
            className="flex flex-col  items-center justify-center text-gray-400 rounded-md p-2 text-[1.125rem] bg-white transition"
            style={{
              border: '1px solid gray',
              width: '14rem',
              height: '6rem',
            }}
          >
            {emailTemplate == null ? (
              <>
                <p className="text-2xl">+</p>
                <p>Add Email Template</p>
                <p>Click to Add Template</p>
              </>
            ) : (
              <div className="flex gap-2 items-center">
                <Mail style={{border : '1px solid #CBC3E3'}} width={80} height={60} className='text-purple-200 p-1 rounded-xl bg-purple-600 text-[40px]' />  
                <div className="flex flex-col gap-1">
                  <p>Email Template : <span className='text-purple-400'>{emailTemplate.name}</span></p>
                </div>
              </div>
            )}
          </div>
        </DialogTrigger>
        <DialogContent className='md:min-w-fit absolute  bg-gray-100'>
        <DialogHeader>
          <DialogTitle className='text-black font-bold text-[18px]'>Cold Email</DialogTitle>
          </DialogHeader>
          <DialogDescription className='font-bold '>Send an Email To a lead</DialogDescription>
          <div className='self-end flex justify-end items-center '>
            <Dialog>
            <DialogTrigger>
            <div className='border-2 border-blue-500 rounded-lg flex gap-1 items-center px-2 py-1 cursor-pointer'>
            <p className=' font-bold text-black  '>New Template 
                </p><Plus color='blue' className=' rounded-full' style={{border : "2px solid #93c5fd"}} /></div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>Create New Template</DialogHeader>
                    <form className='flex flex-col gap-1 w-full'>
                        <label htmlFor='name'>Name</label>
                        <input required min={5} type='text' id='name' name='name' style={{border : '1px solid black'}} className=' rounded-lg p-2' />
                        <label htmlFor='subject'>Subject</label>
                        <input min={5} required type='text' id='subject' name='subject' style={{border : '1px solid black'}} className=' rounded-lg p-2'  />
                        <label htmlFor='body'>Body</label>
                        <textarea required id='body' name='body' style={{border : '1px solid black'}} className=' rounded-lg p-2' ></textarea>
                        <button className='bg-black text-white font-bold rounded-lg  p-2' type='submit'>Create Template</button>
                    </form>
                </DialogContent>
                </Dialog>
                </div>
          <ComboBox />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default EmailTemplateNode