import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import {url} from './../App';
function Signup() {

        let [name,setName] = useState("");
        let [email,setEmail] = useState("");
        let [password,setPassword] = useState("");
        let [message,setMessage] = useState("");
        let navigate = useNavigate();


        let handleSubmit = async()=>{
            console.log(name,email,password)
           let res = await axios.post(`${url}/add-user`,{
                name,
                email,
                password,
                role:'student'
            })

            if(res.data.statusCode===200) {
                navigate('/login');
            }
            else{
                setMessage(res.data.message)
            }
        }


  return (
    <div>
        <h2 style={{textAlign: 'center'}}>Signup</h2>
        <Form>
        <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Name" onChange={(e)=>setName(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
        <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
      </Form.Group>

      <Button variant="primary" onClick={()=>handleSubmit()}>
        Submit
      </Button>
    </Form>
        {message?<div style={{color: 'red'}}>{message}</div>:<></>}
    </div>
  )
}

export default Signup