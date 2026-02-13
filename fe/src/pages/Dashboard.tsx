import { useEffect, useState } from 'react'
import { CreateComponentModel } from '../components/CreateModelComponent';
import { Button } from '../components/button';
import { PlusIcon } from '../Icons/PlusIcon';
import { ShareIcon } from '../Icons/ShareIcon';
import { Card } from '../components/Card';
import Sidebar from '../components/Sidebar';
import { useContent } from '../hooks/useContent';
import { Logout } from '../Icons/logout';
import { useNavigate } from 'react-router-dom';


export function Dashborad(){
    
    const [modelOpen,setModelOpen] = useState(false);
    const {contents,refresh} = useContent()
    const navigate = useNavigate();


    useEffect(()=>{
        refresh();
    },[modelOpen])

    function handleLogout(){
        localStorage.removeItem("token");
        navigate("/signin")
    }

    return <div>
        
      <Sidebar/>
      <div className='p-4 ml-72 '>
      <CreateComponentModel open={modelOpen} onClose={()=>{
          setModelOpen(false);
        }}/>
     
        <div className='flex justify-end gap-4'>
      <Button onClick={()=>{
          setModelOpen(true)
        }} variant="primary" text='Add Content'  startIcon={<PlusIcon/>}></Button>
      <Button  onClick={handleLogout}
      variant="secondary" text='Logout' startIcon={<Logout/>}></Button>
        </div>
    <div className="flex gap-4 flex-wrap">
  {contents.map(({ _id, type, link, title }) => (
    <Card
    key={_id}
    type={type}
    link={link}
    title={title}
    />
    ))}
    </div>

    
    </div>
    </div>
    // </div>
}