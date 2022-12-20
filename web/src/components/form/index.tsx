import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Input(props: InputProps) {
  return (
    <input
      {...props}
      className='relative block w-full mt-1 shadow-sm appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-[#1958c2] focus:outline-none focus:ring-[#1958c2] sm:text-sm'
    />
  )
}

export function Textarea(props: TextareaProps) {
  return (
    <textarea
      {...props}
      className='relative block w-full shadow-sm appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-[#1958c2] focus:outline-none focus:ring-[#1958c2] sm:text-sm'
    ></textarea>
  );
}