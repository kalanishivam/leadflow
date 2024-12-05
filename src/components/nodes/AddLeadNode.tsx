import { Handle, type NodeProps, Position, type Node } from '@xyflow/react'
import React, { useState, useEffect } from 'react'
import { UserRound, Search, Plus } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

// Define the lead object type
export type Lead = {
  id: string
  email: string
  name: string
}

// Update the node data type to be an array of leads
export type AddLeadNodeData = {
  leads: Lead[]
}

export type AddLeadNodeType = Node<AddLeadNodeData, 'addLeadNode'>

const AddLeadNode = ({ updateNodeData }: { 
  updateNodeData?: (leads: Lead[]) => void 
}) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [manualLead, setManualLead] = useState<Omit<Lead, 'id'>>({ email: '', name: '' });

  // Placeholder for existing leads (would be replaced with actual API call)
  const existingLeads: Lead[] = [
    { id: '1', name: 'John Doe', email: 'john@example.com' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
    { id: '3', name: 'Alice Johnson', email: 'alice@example.com' },
  ];

  const filteredLeads = existingLeads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddExistingLead = (lead: Lead) => {
    const updatedLeads = [...leads, lead];
    setLeads(updatedLeads);
    updateNodeData?.(updatedLeads);
  }

  const handleAddManualLead = () => {
    if (manualLead.email && manualLead.name) {
      const newLead = {
        id: Math.random().toString(),
        ...manualLead
      };
      const updatedLeads = [...leads, newLead];
      setLeads(updatedLeads);
      updateNodeData?.(updatedLeads);
      // Reset manual lead input
      setManualLead({ email: '', name: '' });
    }
  }

  return (
    <>
      <Handle type='source' position={Position.Bottom} id='a1' />
      <Dialog>
        <DialogTrigger>
          <div 
            className="flex flex-col items-center justify-center text-gray-400 rounded-md p-2 text-[1.125rem] bg-white transition"
            style={{
              border: '1px solid gray',
              width: '14rem',
              height: '6rem',
            }}
          >
            {leads.length === 0 ? (
              <>
                <p className="text-2xl">+</p>
                <p>Add Lead Source</p>
                <p>Click to Add Lead</p>
              </>
            ) : (
              <div className="flex gap-2 items-center">
                <UserRound />
                <div className="flex flex-col gap-1">
                  <p>Leads</p>
                  <p>{leads.length} Lead(s)</p>
                </div>
              </div>
            )}
          </div>
        </DialogTrigger>
        <DialogContent className="m">
          <div className="flex flex-col space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text"
                placeholder="Search existing leads"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Existing Leads List */}
            <div className="max-h-40 overflow-y-auto">
              {filteredLeads.map((lead) => (
                <div 
                  key={lead.id}
                  className="flex justify-between items-center p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleAddExistingLead(lead)}
                >
                  <div>
                    <p className="font-medium">{lead.name}</p>
                    <p className="text-sm text-gray-500">{lead.email}</p>
                  </div>
                  <Plus className="text-green-500" size={20} />
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <p className="text-lg font-semibold mb-2">Add New Lead Manually</p>
              <div className="space-y-2">
                <input 
                  type="text"
                  placeholder="Name"
                  value={manualLead.name}
                  onChange={(e) => setManualLead(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-2 border rounded-md"
                />
                <input 
                  type="email"
                  placeholder="Email"
                  value={manualLead.email}
                  onChange={(e) => setManualLead(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full p-2 border rounded-md"
                />
                <button 
                  onClick={handleAddManualLead}
                  className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
                >
                  Add Manual Lead
                </button>
              </div>
            </div>

            {/* Added Leads Preview */}
            <div className="max-h-40 overflow-y-auto">
              <p className="font-semibold mb-2">Added Leads</p>
              <p>{leads.length} - Selected</p>
              {leads.map((lead, index) => (
                <div key={index} className="flex justify-between border-b p-2">
                  <div>
                    <p>{lead.name}</p>
                    {/* <p className="text-sm text-gray-500">{lead.email}</p> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AddLeadNode