import React, { useState } from 'react'
import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBBtn,
    MDBSpinner
  } from 'mdb-react-ui-kit';
  import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../assets/constants';
const Login = () => {
const [toggle, setToggle] = useState('register');
const [loading, setLoading] = useState(false);
const [loginForm, setLoginForm] = useState({
    email:'',
    password:'',
});

const [registerForm, setRegisterForm] = useState({
    username:'',
    email:'',
    password:'',
    Cpassword:'',
});
const navigate = useNavigate()
const handleFormFill=(e)=>{
    setRegisterForm({...registerForm,[e.target.name]:e.target.value})
}
const handleFormLoginFill=(e)=>{
    setLoginForm({...loginForm,[e.target.name]:e.target.value})
}
const togleForm =(e)=>{
e.preventDefault()
setToggle(toggle==='register'?'login':'register')
}


const handleLogin = async (e) =>{
e.preventDefault()
setLoading(true);
if (!loginForm.email || !loginForm.password) {
  
  toast.warning("Email or password is missing ")
  setLoading(false);
}
else{

  try {
    const resp = await axios.post (`${baseUrl}/api/users/login`,{
      email:loginForm.email,
      password:loginForm.password
    },{
      withCredentials:'include'
    })   
    toast.success(resp.data.message);
    localStorage.setItem('users', JSON.stringify({ userId: resp.data.userId, email: resp.data.email, username: resp.data.username ,token:resp.data.token}));

    setLoading(false);
    navigate('/')
  } catch (error) {
    if (error.response.status === 401) {
      toast.warning(error.response.data.message)  
      setLoading(false);
    }
    else{
      toast.warning(error.data.message)  
      setLoading(false);
      
}
  }
}
}

const handleRegister = async (e)=>{
  setLoading(true);
  e.preventDefault()
  if (!registerForm.username || ! registerForm.password || !registerForm.email || ! registerForm.Cpassword) {
    toast.warning("please fill all the details")
    setLoading(false);
  }
  else if (registerForm.password !== registerForm.Cpassword) {
    toast.warning("password and confirm password do not match")
    setLoading(false);
        
    }
    else{
        try {
            
     const resp = await axios.post("http://localhost:8000/api/users/register",{
        username:registerForm.username,
        email:registerForm.email,
        password:registerForm.password
     },{
      withCredentials:'include'
     })
   toast.success(resp.data.message)  
   localStorage.setItem('users', JSON.stringify({ userId: resp.data.userId, email: resp.data.email, username: resp.data.username }));
   navigate('/')
  } catch (error) {
      console.log(error);
      if (error.response.status === 409) {
        toast.warning(error.response.data.message)  
      }
      else{
        toast.warning(error.data.message)  
        
}
        }
    }
}


    return (

  <>
<div className="container">
<div className="row justify-content-center mt-5">

  {
      toggle==='register'?
      <>
<form className='col-md-7'>
    <h1 className='text-center'>Log in Now !</h1>
      <MDBInput className='mb-4' value={loginForm.email} name='email' onChange={handleFormLoginFill} type='email' id='form1Example1' label='Email address' />
      <MDBInput className='mb-4' value={loginForm.password} name='password' onChange={handleFormLoginFill} type='password' id='form1Example2' label='Password' />

      <MDBRow className='mb-4'>
       
        <MDBCol >
       <p >Do not have account ?    <a onClick={togleForm}>Register</a></p>  
        </MDBCol>
      </MDBRow>

      <MDBBtn onClick={handleLogin} block>
      {loading ? (
                <MDBSpinner  role="status">
                  <span className="visually-hidden">Loading...</span>
                </MDBSpinner>
              ) : (
                "Log in "
              )}
      </MDBBtn>
    </form>
    </>:
    <>
    <form className='col-md-7'>
    <h1 className='text-center'>Register Now !</h1>
      <MDBInput className='mb-4' value={registerForm.username} name='username' onChange={handleFormFill} type='text' id='form1Example1' label='User name ' />
      <MDBInput className='mb-4' value={registerForm.email} name='email' onChange={handleFormFill} type='email' id='form1Example1' label='Email address' />
      <MDBInput className='mb-4' value={registerForm.password} name='password' onChange={handleFormFill} type='password' id='form1Example2' label='Password' />
      <MDBInput className='mb-4' value={registerForm.Cpassword} name='Cpassword'onChange={handleFormFill} type='password' id='form1Example2' label='Password' />

      <MDBRow className='mb-4'>
       
        <MDBCol >
       <p >Already have an account ?    <a onClick={togleForm}>Login</a></p>  
        </MDBCol>
      </MDBRow>

      <MDBBtn onClick={handleRegister} block>
        Register
      </MDBBtn>
    </form>
    </>
  }
  </div>
  </div>
  </>
  )
}

export default Login