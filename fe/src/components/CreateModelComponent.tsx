import { useRef, useState } from "react";
import { CrossIcon } from "../Icons/CrossIcons";
import { Input } from "./Input";
import { Button } from "./button";
import axios from "axios";
import { BACKEND_URL } from "../config";

export type ContentType = "youtube" | "x";



interface CreatModelProps{
    open:boolean;
    onClose:()=>void;
}

export function CreateComponentModel({open,onClose}:CreatModelProps){
    const titleRef = useRef<HTMLInputElement>(null) 
    const linkRef = useRef<HTMLInputElement>(null) 
    const [type,setType] = useState<ContentType>("youtube");


       async function addContent(){
            const title = titleRef.current?.value;
            const link = linkRef.current?.value;

            
            console.log({ title, link, type }); // 👈 add this

            await axios.post(`${ BACKEND_URL}api/v1/content`,{
                link,title,type
            },{
               headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            onClose();
        }

    return <div>
        {open && 
            <div>

            <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center">
            </div>

            <div  className="w-screen h-screen fixed top-0 left-0 flex justify-center">

            <div className="flex flex-col justify-center">
                <span className="bg-white opacity-100 p-4 rounded">
                    <div className="flex justify-end">
                        <div onClick={onClose} className="cursor-pointer">
                            <CrossIcon/>
                        </div>
                    </div>

                    <div>
                        <Input reference={titleRef} placeholder={"Title"} />
                        <Input reference={linkRef} placeholder={"Link"} />
                    </div>
                    {/* type */}
                    <div>
                        <h1>Type</h1>
                        <div className="flex gap-4 m-5">

                        <Button text="youtube" variant={type === "youtube" ? "primary" : "secondary"} onClick={()=>{
                            setType("youtube")

                        }}/>

                        <Button text="x" variant={type === "x" ? "primary" : "secondary"} onClick={()=>{
                            setType("x")
                        }}/>
                        </div>

                    </div>


                    <div className="flex justify-center">

                        <Button onClick={addContent} variant='primary'  text="Submit"/>

                    </div>

                </span>
            </div>
        </div>
        </div>}
    </div>
}