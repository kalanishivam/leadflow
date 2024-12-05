import { Handle, type NodeProps, Position , type Node } from '@xyflow/react'
import React from 'react'
import { Dialog, DialogContent, DialogDescription,  DialogHeader,  DialogTitle, DialogTrigger,} from "@/components/ui/dialog"


export type AddLeadNode =  Node<AddLeadNodeData, 'addLeadNode'>
export type AddLeadNodeData = {
  source : string;
}

const AddLeadNode = ({data }:  NodeProps<AddLeadNode>) => {
    // const [leadDetails , setLEad]
    console.log('componenet is re rendered')
  return (
    <>
        <Handle type='source' position={Position.Bottom} id='a1'  />
        <Dialog>
        <DialogTrigger>
      <div className='flex flex-col items-center justify-center text-gray-400 rounded-md p-2 text-[1.125rem] bg-white ' style={{border : '1px solid gray'}}>
         <p>+</p>
         <p>{data.source}</p>
         <p>Add Lead Source</p>
         <p>Click to Add Lead Source</p>
    </div>
    </DialogTrigger>
    <DialogContent>hellllo</DialogContent>
    </Dialog>
    </>
  )
}

export default AddLeadNode