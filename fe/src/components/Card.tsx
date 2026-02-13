import {   TrashIcon } from "../Icons/trashIcon";
import Notebook from "../Icons/Notebook";
import { ShareIcon } from "../Icons/ShareIcon";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface CardProps{
    _id: string;
    title : string;
    link: string;
    type: "x" | "youtube";
}


export function Card({title,link,type,_id}:CardProps){

    async function deleteContent(){
    await axios.delete(`${BACKEND_URL}api/v1/content/${_id}`,{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    })

    window.location.reload(); // quick fix (later replace with state update)
  }




    return  <div>
        
        <div className="p-8 bg-white rounded-md shadow-md broder-white max-w-96">
            <div className="flex justify-between ">
                <div className="flex text-md items-center">
                    <div className="text-gray-500 pr-2"> 
                        <Notebook/>
                    </div>
                        {title}
                </div>
                <div className="flex">

                    <div onClick={deleteContent} className="pr-2 text-gray-500">
                            {/* <a href={link}  target="_blank"></a> */}
                            <TrashIcon/>
                    </div>
                    <div className="pr-2 text-gray-500">
                            <ShareIcon/>
                    </div>
                </div>
            </div>



        <div className="pt-4">

        {type === "youtube" && <iframe className="w-full"  src={link.replace("watch?v=", "embed/")} 
        title="YouTube video player" 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerPolicy="strict-origin-when-cross-origin" 
        allowFullScreen></iframe>}


        
        { type === 'x' && <blockquote className="twitter-tweet">
            <a href={link.replace("x.com","twitter.com")} ></a>
        </blockquote>}  
        </div>
        
        </div>
    </div>
} 