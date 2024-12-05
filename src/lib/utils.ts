import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const initialNodes = [
  { id: '22', position: { x: 0, y: 200 }, type : 'addLeadNode' , data: { source : 'abcdfdds' },  }
];