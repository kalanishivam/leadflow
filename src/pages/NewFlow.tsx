import React, { useMemo, useRef, useState } from 'react'
import { Clock1, Mail } from 'lucide-react';
import { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  NodeProps,
  NodeResizer,type Node,
  addEdge, Connection, 
} from '@xyflow/react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import '@xyflow/react/dist/style.css';
import AddLeadNode, { AddLeadNodeType } from '../components/nodes/AddLeadNode';
import EmailTemplateNode, {  EmailTemplateNodeType } from '../components/nodes/EmailTemplateNode';
const initialNodes :  Node[] = [
    { id: '22', position: { x: 500, y: 50 }, type : 'addLeadNode' , data: {  },  },
    { id: 'email-template-1', position: { x: 200, y: 100 }, type : 'emailTemplateNode' , data: {  },  }
  ];
  const initialEdges = [{ id : '1',  source: '1', target: '2' }];
  const NewFlow = () => {
    const [openNewNodeDialog , setOpenNewNodeDialog] = useState(false);
    const yPos = useRef(50);
    const nodeTypes = useMemo(() => ({ 
        addLeadNode: (props: NodeProps<AddLeadNodeType>) => (
          <AddLeadNode 
            {...props} 
            updateNodeData={(source) => {
              setNodes(nodes => 
                nodes.map(node => 
                  node.id === props.id 
                    ? { ...node, data: { ...node.data, source } }
                    : node
                )
              )
            }} 
          />
        ),
        emailTemplateNode: (props: NodeProps<EmailTemplateNodeType>) => (
          <EmailTemplateNode  {...props} 
          updateNodeData={(source) => {
            setNodes(nodes => 
              nodes.map(node => 
                node.id === props.id 
                  ? { ...node, data: { ...node.data, source } }
                  : node
              )
            )
          }}   />
        )
      }), []);
      const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
      console.log(nodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const addNode = useCallback(() => {
    console.log('in here')
    yPos.current += 50;
    setNodes((nodes : Node[]) => {
      console.log(nodes);
      return [
        ...nodes,
        {
          id: Math.random().toString(),
          position: { x: 100, y: yPos.current },
          data: { label: "yo" }
        }];});}, []);
  const onConnect = useCallback((params : Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
    return (
        <div className='w-[screen] h-[80vh] border-2 border-black'>
            <Dialog open = {openNewNodeDialog} onOpenChange = {setOpenNewNodeDialog}>
              <DialogTrigger asChild>
            <button className='bg-black rounded-xl w-fit px-5 py-1  text-white' >Add New Node</button>
            </DialogTrigger>
            <DialogContent className="md:min-w-fit bg-gray-100">
            <DialogHeader>
          <DialogTitle>Select Node Type </DialogTitle>
          </DialogHeader>
          <DialogDescription className='font-bold '>Please Select a node type</DialogDescription>
          <div className='grid grid-cols-2  gap-10 max-md:gap-2 max-sm:grid-cols-1'>
            <div className='bg-white py-6 px-2.5 flex gap-3 items-center rounded-xl cursor-pointer' style={{border : '1px solid gray'}} >
              <Mail style={{border : '1px solid #CBC3E3'}} width={80} height={60} className='text-purple-200 p-1 rounded-xl bg-purple-600 text-[40px]' />  
              <div className='flex flex-col text-[1.125rem] text-gray-600'>
                <p>Cold Email</p>
                <p>Send an Email To a lead</p>
              </div>
              </div> 
              <div className='bg-white py-6 px-2.5 flex gap-3 items-center rounded-xl cursor-pointer' style={{border : '1px solid gray'}}>
              <Clock1 style={{border : '1px solid #CBC3E3'}} width={80} height={60} className='text-purple-200 p-1 rounded-xl bg-purple-600 text-[40px]' />  
              <div className='flex flex-col text-[1.125rem] text-gray-600'>
                <p>Wait/Delay</p>
                <p>Add a delay between blocks</p>
              </div>
              </div> 
          </div>
          </DialogContent>
            </Dialog>
        <ReactFlow  
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        nodeClickDistance={5}  >
        <MiniMap />
        <Controls />
        <NodeResizer />
        <Background />
      </ReactFlow>
     
       </div>
      )
}

export default NewFlow