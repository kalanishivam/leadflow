import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const initialNodes = [
  { id: '22', position: { x: 0, y: 200 }, type : 'addLeadNode' , data: { source : 'abcdfdds' },  }
];

export function generateSecureObjectId() {
  // Generate 12 random bytes (24 hex characters)
  const randomBytes = crypto.getRandomValues(new Uint8Array(12));
  return Array.from(randomBytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

