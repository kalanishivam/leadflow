"use client"

import * as React from "react"
import { Check, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


export function ComboBox({emailTemplate , value , setValue} : { emailTemplate : EmailTemplateApiResponse[] , value : string , setValue : React.Dispatch<React.SetStateAction<string>> }) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="flex p-2 items-center w-full border-2 justify-between border-black rounded-md">
        <button
          role="combobox"
          aria-expanded={open}
        >
          {value
            ? emailTemplate.find((template) => template.name === value)?.name
            : "Select Email Template..."}
        </button>
            <ChevronDown color="black"  />
         
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-full bg-white">
        <Command className="w-full bg-white">
          <CommandInput placeholder="Search Email Templates" />
          <CommandList className="max-h-[200px] overflow-y-auto scrollbar-thin ">
            <CommandEmpty>No Template found.</CommandEmpty>
            <CommandGroup>
              {emailTemplate.map((framework) => (
                <CommandItem
                  key={framework.name}
                  value={framework.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {framework.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
