const express=require('express');
const UserModel=require('../model/user_model');

const router=express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).send(users);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Some Internal error occured", error })
    }
})
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await UserModel.findById(id);
        res.status(200).send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Some Internal error occured", error })
    }
})


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
})

router.put('/:id', async (req, res) => {
    try {
        const id= req.params.id;
        const {name, username, email, password}=req.body;
        await UserModel.findByIdAndUpdate(id,{name, username, email, password});
        res.status(200).send({message:'User updated successfully'});
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Some Internal error occured", error })
    }
})
router.delete('/:id', async (req, res) => {
    try {
        const id= req.params.id;
        const resp=await UserModel.findByIdAndDelete(id);
        if(resp)
            res.status(200).send({message:'User deleted successfully'});
        else    
        res.status(404).send({message:'No user available to delete'});
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Some Internal error occured", error })
    }
})

module.exports=router;


