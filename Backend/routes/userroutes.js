const express=require('express');
const UserModel=require('../model/user_model');

const router=express.Router();

router.post('/', async(req, res)=>{

    try {
        const {name, email, username, password}=req.body;
        if(!name ||!email||!username||!password){
            return res.status(403).send('All Fields are Mandatory');
        }

        let user= await UserModel.findOne({email});
        if (user){
            return res.status(403).send({message:"Email id is already registered with us!"})
        }

        user = await UserModel.findOne({username});

        if (user){
            return res.status(403).send({message:"User name is already registered with us!"})
        }

        const newUser = new UserModel ({name, email, username, password});
        const resp=await newUser.save();
        return res.status(201).send({message:'user created successfuly!',data:resp});

    } catch (error) {
        console.log(error);
        res.status(500).send({message:"Some Internal Error Occured",Error:error});

    }
});

module.exports=router;


