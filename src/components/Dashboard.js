import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {url} from './../App';
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom'
import Table from 'react-bootstrap/Table'

function Dashboard() {

    let [data,setData] = useState([])
    let navigate = useNavigate();


    let getData  = async()=>{
        let token = window.sessionStorage.getItem('token');

        if(token)
        {
            let res = await axios.get(`${url}/all`,{
                headers:{Authorization:`Bearer ${token}`}
            });

            if(res.data.statusCode === 200)
            {
                setData(res.data.data)
            }
            else
            {
                window.alert("Session Expired")
                window.sessionStorage.clear();
                navigate('/login')
            }
        }
        else
        {
            window.alert("Please Login to continue")
            navigate('/login')
        }


    }
    useEffect(()=>{
        getData();
    },[])
  return (
    <div>
         <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {
            data.map((e,i)=>{
                return <tr key={e._id}>
                    <td>{i+1}</td>
                    <td>{e.name}</td>
                    <td>{e.email}</td>
                    <td>{e.role}</td>
                </tr>
            })
        }
      </tbody>
    </Table>
    <Button variant="success" onClick={()=>getData()}>Refresh</Button>
    </div>
  )
}

export default Dashboard