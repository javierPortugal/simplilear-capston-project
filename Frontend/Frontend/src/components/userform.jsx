
import axios from 'axios';
import { useState } from 'react';


function UserForm({fetchData}){
    const [user,setUser]=useState({name:'',email:'',username:'',password:''});
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const resp=await axios.post('http://localhost:5000/api/user/',user);
        console.log(resp);
        if(resp.status==201){
            alert('User Registered Successfully');
            fetchData();
            setUser({name:'',email:'',username:'',password:''});
        }else{
            alert('Error in Registration');
        }
    }
    return(<div>
        <form onSubmit={handleSubmit}>
            <div className='mb-3'>
                <label>Name</label>
                <input type='text' placeholder='Enter Your Name' className='form-control'
                value={user.name} onChange={(e)=> setUser({...user,name:e.target.value})}></input>
            </div>
            <div className='mb-3'>
                <label>UserName</label>
                <input type='text' placeholder='Enter Your Username' className='form-control'
                value={user.username} onChange={(e)=> setUser({...user,username:e.target.value})}></input>
            </div>

            <div className='mb-3'>
                <label>Email</label>
                <input type='text' placeholder='Enter Your Username' className='form-control'
                value={user.email} onChange={(e)=> setUser({...user,email:e.target.value})}></input>
            </div>

            <div className='mb-3'>
                <label>Password</label>
                <input type='text' placeholder='Enter Your Username' className='form-control'
                value={user.password} onChange={(e)=> setUser({...user,password:e.target.value})}></input>
            </div>
            <button type='submit' className='btn btn-primary mt-3'>Register</button>
            
        </form>
    </div>
    );
}

export default UserForm;