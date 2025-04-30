import React , {useState,useEffect} from 'react';
import axios from 'axios';

function Form() {
    const [name ,setName] = useState('');
    const [email,setEmail] = useState('');
    const [users,getUsers] = useState([]);
    const [upname ,setUpName] = useState('');
    const [upemail,setUpEmail] = useState('');
    const [delname,setDelName] = useState('');
    
    const handleSubmit = async(e)=> {
        e.preventDefault();
        await axios.post('http://localhost:3000/register',{name,email});
        fetchUser();
    }
    const fetchUser = async ()=>{
        const res = await axios.get('http://localhost:3000/users');
        getUsers(res.data);
        fetchUser();
    }
    const submitUpdate = async(e)=>{
        e.preventDefault();
        await axios.post('http://localhost:3000/update',{name:upname,email:upemail})
        fetchUser();
    }
    const deleteData = async(e)=>{
        e.preventDefault();
        await axios.post('http://localhost:3000/delete',{name:delname})
        fetchUser();
    }
    useEffect (()=>{
        fetchUser();
    },[])
    return (
        <div>
            <h1>Entry</h1>
        <form onSubmit= {handleSubmit}>
            <input type="text" value = {name} onChange={(e)=> setName(e.target.value) } />
            <br />
            <input type="text" value = {email} onChange={(e)=> setEmail(e.target.value) } />
            <br />
            <button type='submit'>Submit</button>
        </form>
        <h1>Update</h1>
        <form onSubmit= {submitUpdate}>
            <input type="text" value = {upname} onChange={(e)=> setUpName(e.target.value) } />
            <br />
            <input type="text" value = {upemail} onChange={(e)=> setUpEmail(e.target.value) } />
            <br />
            <button type='submit'>Submit</button>
        </form>
        <h1>Delete</h1>
        <br />
        <form onSubmit= {deleteData}>
            <input type="text" value = {delname} onChange={(e)=> setDelName(e.target.value) } />
            <button type='submit'>Submit</button>
        </form>
        <br />
        <h1>Display</h1>
            <button type='button' onClick={fetchUser}>Display</button>
            <ul>
                {users.map((u)=>(
                    <li key = {u._id}>{u.name}-{u.email}</li>
                ))}
            </ul>
        </div>
    )
}

export default Form;