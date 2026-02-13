interface SibebarItemProps{
    text:string;
    icon:React.ReactNode;
}

export function SidebarItem({text,icon}:SibebarItemProps){
    return(
        <div className="flex hover:bg-gray-100 text-gray-700 cursor-pointer py-2">
            <div className="pr-2">
                {icon}
            </div>
            <span>{text}</span>
        </div>
    )
}