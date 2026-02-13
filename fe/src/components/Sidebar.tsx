import { Logo } from "../Icons/Logo";
import { XIcon } from "../Icons/XIcon";
import { YoutubeIcon } from "../Icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItems";

export default function Sidebar(){
        return <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6" >
            <div className="flex text-2xl pt-4 justify-center">   
                <div className="pr-2 text-purple-700">
                    <Logo/>
                </div>
                Brainly
            </div>
                <div className="pt-4">
                    <SidebarItem text="Twwiter"  icon={<XIcon/>}/>
                    <SidebarItem text="Youtube"  icon={<YoutubeIcon/>}/>
                </div>
        </div>
}