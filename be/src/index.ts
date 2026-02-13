import express from "express";
import { JWT__PASSWORD, MONGO_URL, PORT } from "./config";
import mongoose from "mongoose";
import { ContentModel, userModel } from "./db";
const app = express();
import jwt from "jsonwebtoken"
import { usermiddleware } from "./middlewares";


import cors from "cors";

app.use(cors());
app.use(express.json());

app.post("/api/v1/signup",async (req,res)=>{

    const {username,password} = req.body;
    
     // Add validation
    if (!username || !password) {
        return res.status(400).json({
            message: "Username and password are required"
        });
    }

    try{
        const existingUser = await userModel.findOne({username});
        if(existingUser){
            return res.status(409).json({
                message:"User already exists"
            })
        }        
        const User = await userModel.create({
            username,password
        });
        
        
        if( User){
            res.status(201).json({  // 201 = Created
            message: "You signed up successfully",
            userId: User._id
        });
        }


    }catch(e : any){
      console.error("Signup error:", e);
        
        // Check if it's a duplicate key error
        if (e.code === 11000) {
            return res.status(409).json({  // 409 = Conflict
                message: "User already exists"
            });
        }
        
        res.status(500).json({  // 500 = Internal Server Error
            message: "Error creating user"
        });
    }

})

app.post("/api/v1/signin",async (req,res)=>{

    const {username,password} = req.body;

    try{

        
        const User = await userModel.findOne({
            username,password
        });

        
        if( User){
            
            const token =  jwt.sign({
                id:User._id
            },JWT__PASSWORD)
            
            res.json({
                token
            })
        }
    }catch(e){
        res.status(411).json({
            message:"User already exits"
        })
    }
})


app.post("/api/v1/content",usermiddleware,async (req,res)=>{


    const { title,link,type} = req.body;

    try{
        await ContentModel.create({
            title,link,type,
            // @ts-ignore
            userId:req.userId,
            // tags:[]
        })

        res.json({
            message:"Content added"
        })
    }catch(e){

        res.status(411).json({
            message:"User already exists"
        })
    }
})


app.get("/api/v1/content",usermiddleware,async(req,res)=>{
    // @ts-ignore
    const userId = req.userId;
    
    const content = await ContentModel.find({
        userId:userId
    }).populate("userId","username")

        res.json({
            content 
        })
})

app.delete("/api/v1/content",usermiddleware,async(req,res)=>{
    
    const contentId = req.body.connectId;

    const content = await ContentModel.deleteMany({
        contentId,
        //@ts-ignore
        userId:req.userId        
    }).populate("userId","username")

        res.json({
            message:"Deleted!"
        })
})

app.delete("/api/v1/content/:id", usermiddleware, async (req,res)=>{
    
    const contentId = req.params.id;

    await ContentModel.deleteOne({
        _id: contentId,
        //@ts-ignore
        userId: req.userId
    });

    res.json({
        message:"Deleted!"
    })
})


async function main(){
    await  mongoose.connect(MONGO_URL);
    console.log("database is connected! ")
    app.listen(PORT,
        ()=>console.log(`Your request is running on port ${PORT}`))
}

main();
