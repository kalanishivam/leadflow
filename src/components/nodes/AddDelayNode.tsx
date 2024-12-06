import { Handle, Position, type Node } from '@xyflow/react'
import { useState } from 'react'
import { Clock7, ChevronDown } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { ComboBox } from '../ComboBox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@radix-ui/react-dropdown-menu'

export type DelayNode = {
    waitTime: number
    type: string
}
export type DelayNodeType = Node<DelayNode, 'addDelayNode'>;

const AddDelayNode = ({ updateNodeData }: { updateNodeData?: (delayTime: DelayNode) => void }) => {
    const [delayTime, setDelayTime] = useState<DelayNode | null>(null);
    const [delayType , setDelayType] = useState('Minutes');
    const [openDialog ,setOpenDialog] = useState(false);

    const handleFormSubmit = async(event: React.FormEvent<HTMLFormElement>)=>{
        try{
            event.preventDefault();
            if(delayType ==''){
                return;
            }
            const formData = new FormData(event.target as HTMLFormElement);
           const time = formData.get('time');
            const timeSelected = {
                id : Math.random().toString(),
                waitTime : Number(time),
                type : delayType
            }
            setDelayTime(timeSelected)
            updateNodeData?.(timeSelected);
           }
        catch(error){
            console.log(error)
        }finally{
            setOpenDialog(false)
        }
    }

    return (
        <>
            <Handle type='target' position={Position.Top} id='a222' />
            <Handle type='source' position={Position.Bottom} id='a22' />
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                    <div
                        className="flex flex-col  items-center justify-center text-gray-400 rounded-md p-2 text-[1.125rem] bg-white transition"
                        style={{
                            border: '1px solid gray',
                            width: '14rem',
                            height: '6rem',
                        }}
                    >
                        {delayTime == null ? (
                            <>
                                <p className="text-2xl">+</p>
                                <p>Add Delay</p>
                                <p>Click to Add Delay</p>
                            </>
                        ) : (
                            <div className="flex gap-2 items-center">
                                <Clock7 style={{ border: '1px solid #CBC3E3' }} width={80} height={60} className='text-purple-200 p-1 rounded-xl bg-purple-600 text-[40px]' />
                                <div className="flex flex-col gap-1">
                                    <p>Delay : <span className='text-purple-400'>{delayTime.waitTime} {delayTime.type}</span></p>
                                </div>
                            </div>
                        )}
                    </div>
                </DialogTrigger>
                <DialogContent className='md:min-w-fit absolute  bg-gray-100'>
                    <DialogHeader>
                        <DialogTitle className='text-black font-bold text-[18px]'>Wait/Delay</DialogTitle>
                    </DialogHeader>
                    <DialogDescription className='font-bold '>Add Delay to a block</DialogDescription>
                    <form onSubmit={handleFormSubmit} className='flex flex-col  w-full gap-4'>
                        {/* <label htmlFor='time'>Time</label> */}
                        <input placeholder='Time' required min={0} type='number' id='' name='time' style={{ border: '1px solid black' }} className=' rounded-lg p-2' />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className='flex justify-between p-2 rounded-lg' style={{border : '1px solid black'}} >
                                <button className=''>{delayType == '' ? 'Select Days'  : delayType}</button>
                                <ChevronDown  color="black" />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-full">
                                <DropdownMenuLabel>Delay Type</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup className='w-full flex flex-col gap-2 cursor-pointer' value={delayType} onValueChange={setDelayType}>
                                    <DropdownMenuRadioItem  value="Days">Days</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="Hours">Hours</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="Minutes">Minutes</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    <DialogFooter>
                        <button type='submit' className='bg-black text-white font-semibold px-4 rounded-lg  p-2'>Insert</button>
                    </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default AddDelayNode