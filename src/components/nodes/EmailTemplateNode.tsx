import { Handle, Position, type Node } from '@xyflow/react'
import  { useEffect, useState } from 'react'
import {  Plus, Mail } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ComboBox } from '../ComboBox'
import { createEmailTemplate, getEmailTemplates } from '@/api/apiClient'
// import { Toaster } from '../ui/toaster'
import { useToast } from '@/hooks/use-toast'


export type EmailTemplate = {
  id : string
  name: string
  // subject: string
  // body: string
}
export type EmailTemplateNodeType = Node<EmailTemplate, 'emailTemplateNode'>;

const EmailTemplateNode = ({updateNodeData} : { updateNodeData?: (emailTemplate: EmailTemplate) => void }) => {
    const [allAvailableEmailTemplates , setAllAvailableEmailTemplates] = useState<EmailTemplateApiResponse[]>([]);
    const [openCreateEmailDialog , setOpenCreateEmailDialog] = useState(false);
    const [emailSelectNodeDialog , setEmailSelectNodeDialog] = useState(false);
    const [emailTemplate , setEmailTemplate] = useState<EmailTemplate | null>(null);
    const [selectedTemplateValue , setSelectedTemplateValue] = useState<string>('');
    const [refreshApiCallForEmailTemplate , setRefreshApiCallForEmailTemplate] = useState(false);
    const {toast} = useToast()

    useEffect(()=>{
      const getAllTemplatefOfUser = async()=>{
        try{
          const userTemplate : GetEmailTemplatesResponse = await getEmailTemplates();
          if("error" in userTemplate){
            throw new Error('Failed to get email templates');
          }
          setAllAvailableEmailTemplates(userTemplate);
          console.log(allAvailableEmailTemplates)
        }catch(error){
          console.log(error)
        }
      }
      getAllTemplatefOfUser();
    } , [refreshApiCallForEmailTemplate])

    const handleSubmitCreateNewEmailTemplate = async(event : React.FormEvent<HTMLFormElement>)=>{
      try{
      event.preventDefault();
      console.log('in here in the siubmit the form of emailtmep ate create new ')
      const formData = new FormData(event.target as HTMLFormElement);
      const name = formData.get('name');
      const subject = formData.get('subject');
      const body = formData.get('body');
      if(typeof name !== 'string' || typeof subject !== 'string' || typeof body !== 'string'){
        throw new Error('Name, subject or body is missing or invalid');
      }
      const createTemplate = await createEmailTemplate({name , subject , body});
      if("error" in createTemplate){
        throw new Error('Failed to create email template');
      }
      toast({
        title: "Success",
        description: "Successfully Created Template",
        variant : 'default',
        style : {backgroundColor : 'lightgreen'}
      })
      setOpenCreateEmailDialog(false);
      setRefreshApiCallForEmailTemplate(prev=>!prev);
    }catch(error){
      toast({
        title: "Error",
        description: "Error creating email template",
        variant : 'destructive'
      })
      console.log(error);
    }
    }
    const handleInseertEmailTemplateClick = async()=>{
      try{
        const template = allAvailableEmailTemplates.find((template) => template.name === selectedTemplateValue);
        if(!template){
          throw new Error('Template not found');
        }
        updateNodeData?.({id : template.id , name : template.name});
        setEmailTemplate({id : template.id , name : template.name});
        setEmailSelectNodeDialog(false);
      }catch(error){
        console.log(error)
      }
    }
  return (
    <>
      <Handle type='target' position={Position.Top} id='a222' />
      <Handle type='source' position={Position.Bottom} id='a22' />
      <Dialog open={emailSelectNodeDialog} onOpenChange={setEmailSelectNodeDialog}>
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
            <Dialog open={openCreateEmailDialog} onOpenChange={setOpenCreateEmailDialog}>
            <DialogTrigger>
            <div className='border-2 border-blue-500 rounded-lg flex gap-1 items-center px-2 py-1 cursor-pointer'>
            <p className=' font-bold text-black  '>New Template 
                </p><Plus color='blue' className=' rounded-full' style={{border : "2px solid #93c5fd"}} /></div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>Create New Template</DialogHeader>
                    <form className='flex flex-col gap-1 w-full' onSubmit={handleSubmitCreateNewEmailTemplate}>
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
          <ComboBox emailTemplate={allAvailableEmailTemplates} value={selectedTemplateValue} setValue={setSelectedTemplateValue} />
          <DialogFooter>
            <button onClick={handleInseertEmailTemplateClick} type='submit' className='bg-black text-white font-semibold px-4 rounded-lg  p-2'>Insert</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
    </>
  )
}

export default EmailTemplateNode