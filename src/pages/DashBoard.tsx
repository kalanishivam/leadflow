// import React, { useMemo } from 'react'
import { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  // useNodesState,
  useEdgesState,
  NodeResizer,
  addEdge, Connection, 
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
// import AddLeadNode from '../components/nodes/AddLeadNode';

// const initialNodes = [
//     { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
//     { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
//     { id: '3', position: { x: 0, y: 300 }, data: { label: '4' } },
//     { id: '22', position: { x: 0, y: 200 }, type : 'addLeadNode' , data: { source : 'abcdfdds' },  }
//   ];
  
  const initialEdges = [{ id : '1',  source: '1', target: '2' }];
  
  const DashBoard = () => {
    // const nodeTypes = { addLeadNode: AddLeadNode };
    // const nodeTypes = useMemo(() => ({ addLeadNode: AddLeadNode }), []);
    // const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params : Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  return (
    <div className='w-[screen] h-[80vh] border-2 border-black'>
        {/* dashboard */}
   
    <ReactFlow  
    // nodes={nodes}
    edges={edges}
    // onNodesChange={onNodesChange}
    onEdgesChange={onEdgesChange}
    // nodeTypes={nodeTypes}
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

export default DashBoard