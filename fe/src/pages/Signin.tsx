import { useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/Input";
import { Button } from "../components/button";

export default function SignIn(){
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();//

            async function signin(){
                const username = usernameRef.current?.value;
                console.log(usernameRef.current)
                const password = passwordRef.current?.value;
                const response =  await axios.post(BACKEND_URL + "api/v1/signin",{         
                        username,
                        password
                })
                const jwt = response.data.token;
                localStorage.setItem("token",jwt);
                //redirect the user to the dashbord
                navigate("/dashboard");//
                alert("You have signed up!")
            }
    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            
            <div className="bg-white rounded-xl border min-w-48 p-8" >
                <Input  reference= {usernameRef} placeholder="Username" />
                <Input  reference= {passwordRef} placeholder="Password" />
                <div className="flex justify-center pt-4">
                <Button onClick={signin} loading={false} variant="primary" text="Signin" fullWidth={true} />
                </div>
                

           <p className="text-gray-400 text-lg">
            Or{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-blue-400 hover:text-blue-300 underline"
            >
              sign up for a new account
            </button>
            </p>
            </div>
    </div>
}