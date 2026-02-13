import type { ReactElement } from "react"

interface ButtonProps{
    variant : "primary" | "secondary",
    text:string,
    startIcon?:ReactElement;
    onClick?:()=>void;
    fullWidth?:boolean;
    loading?:boolean; 
}

const  variantClasses = {
    "primary":" bg-blue-800 text-white rounded p-2 mr-1",
    "secondary":"bg-blue-100 text-dark rounded p-2 mr-1"
}

const defaultStyle = "px-4 py-2 rounded-md  font-light flex items-center";


export function Button({variant,text,startIcon,onClick,fullWidth,loading}:ButtonProps){

    return <button onClick={onClick}  className={variantClasses[variant] +" "+defaultStyle + `${fullWidth? "w-full flex justify-center items-center":""} ${loading ? "opacity-45" :""} `} disabled={loading}>

        <div className="flex  justify-between gap-1">
        {text}
        {startIcon}
        </div>
    </button>
}