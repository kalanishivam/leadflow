import React, { useMemo, useRef, useState } from 'react'
import { Clock1, Mail, User } from 'lucide-react';
import { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  NodeProps, type Edge,
  NodeResizer, type Node,
  addEdge, Connection,
} from '@xyflow/react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { ObjectId } from 'bson';

import '@xyflow/react/dist/style.css';
import AddLeadNode, { AddLeadNodeType } from '../components/nodes/AddLeadNode';
import EmailTemplateNode, { EmailTemplateNodeType } from '../components/nodes/EmailTemplateNode';
import AddDelayNode, { DelayNodeType } from '@/components/nodes/AddDelayNode';
import { createNewWorkFlow } from '@/api/apiClient';
import { generateSecureObjectId } from '@/lib/utils';

// type ConnectionWithId = Connection & { id?: string };
// import { createNewWorkFlow } from '@/api/apiClient';
const initialNodes: Node[] = [
  { id: `${generateSecureObjectId().toString()}`, position: { x: 500, y: 50 }, type: 'addLeadNode', data: {}, },
];

const initialEdges : Edge[] = [];
const NewFlow = () => {
  const [openNewNodeDialog, setOpenNewNodeDialog] = useState(false);
  const [saveFlowLoader , setSaveFlowLoader] = useState(false);
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
        }} />
    ),
    delayNode: (props: NodeProps<DelayNodeType>) => (
      <AddDelayNode  {...props}
        updateNodeData={(source) => {
          setNodes(nodes =>
            nodes.map(node =>
              node.id === props.id
                ? { ...node, data: { ...node.data, source } }
                : node
            )
          )
        }} />
    )
  }), []);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  // console.log(nodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const addNode = useCallback((type: string) => {
    
    // console.log(nodes.length)
    if (nodes.length === 0) {
      yPos.current = 50;
    } else {
      
      yPos.current = 50 + (150*nodes.length);
      // console.log(yPos.current);
    }

    setNodes((nodes: Node[]) => {
      // console.log(nodes);
      return [
        ...nodes,
        {
          id: generateSecureObjectId().toString(),
          position: { x: 500, y: yPos.current },
          data: {},
          type: type
        },
      ];
    });
    setOpenNewNodeDialog(false)
  }, [nodes.length]);
  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  // const onConnect = useCallback(
  //   (connection : Connection) => {
  //     // connection.id = generateSecureObjectId().toString();
  //     setEdges((oldEdges) => addEdge(connection, oldEdges));
  //   },
  //   [setEdges],
  // );

  const handleSaveFlow = async()=>{
    console.log('in here')
    setSaveFlowLoader(true)
    edges.forEach(edge => {
      edge.id = generateSecureObjectId().toString();
    })
    const data = {
      nodes : nodes,
      edges : edges,
      flowName : 'test123443'
    }
    const res = await createNewWorkFlow(data);
    console.log('in herer after teh res is' )
    console.log(res)
    console.log(nodes);
    console.log(edges)
    setSaveFlowLoader(false)
  }
  return (
    <div>
      <div className='flex h-[10vh] bg-white justify-between items-center mb-2 px-4 py-1'>
        <div className='flex flex-col text-black font-bold text-[1.125rem] '>
          <p>Task For Mern Stack By Shivam Kalani</p>
          <p className='font-semibold text-[0.9rem]'>Click on the block to configure it or add a new block</p>
        </div>
        <button disabled={saveFlowLoader} className='bg-blue-700 rounded-xl text-white px-4 font-bold py-1 ' onClick={handleSaveFlow}>{saveFlowLoader ? 'Saving...' : 'Save Flow'}</button>
      </div>
    <div className='w-[screen] h-[80vh] '>
      <Dialog open={openNewNodeDialog} onOpenChange={setOpenNewNodeDialog}>
        <DialogTrigger asChild className='flex self-end mb-1'>
          <button className='bg-black rounded-xl w-fit px-5 py-1  text-white' >Add New Node</button>
        </DialogTrigger>
        <DialogContent className="md:min-w-fit bg-gray-100">
          <DialogHeader>
            <DialogTitle>Select Node Type </DialogTitle>
          </DialogHeader>
          <DialogDescription className='font-bold '>Please Select a node type</DialogDescription>
          <div className='grid grid-cols-2  gap-10 max-md:gap-2 max-sm:grid-cols-1'>
            <div onClick={() => { addNode('emailTemplateNode') }} className='bg-white py-6 px-2.5 flex gap-3 items-center rounded-xl cursor-pointer' style={{ border: '1px solid gray' }} >
              <Mail style={{ border: '1px solid #CBC3E3' }} width={80} height={60} className='text-purple-200 p-1 rounded-xl bg-purple-600 text-[40px]' />
              <div className='flex flex-col text-[1.125rem] text-gray-600'>
                <p>Cold Email</p>
                <p>Send an Email To a lead</p>
              </div>
            </div>
            <div onClick={() => { addNode('delayNode') }} className='bg-white py-6 px-2.5 flex gap-3 items-center rounded-xl cursor-pointer' style={{ border: '1px solid gray' }}>
              <Clock1 style={{ border: '1px solid #CBC3E3' }} width={80} height={60} className='text-purple-200 p-1 rounded-xl bg-purple-600 text-[40px]' />
              <div className='flex flex-col text-[1.125rem] text-gray-600'>
                <p>Wait/Delay</p>
                <p>Add a delay between blocks</p>
              </div>
            </div>
            <div onClick={() => { addNode('addLeadNode') }} className='bg-white py-6 px-2.5 flex gap-3 items-center rounded-xl cursor-pointer' style={{ border: '1px solid gray' }}>
              <User style={{ border: '1px solid #CBC3E3' }} width={80} height={60} className='text-purple-200 p-1 rounded-xl bg-purple-600 text-[40px]' />
              <div className='flex flex-col text-[1.125rem] text-gray-600'>
                <p>Add Lead</p>
                <p>Add lead block</p>
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
    
    </div>
  )
}

export default NewFlow