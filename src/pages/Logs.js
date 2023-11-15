import React, { useContext, useEffect, useState } from "react";
import { LinkDataContext } from "../context/LinkDataProvider";
import { MDBTable, MDBTableHead, MDBTableBody, MDBIcon, MDBSpinner } from "mdb-react-ui-kit";
import axios from "axios";
import {baseUrl} from '../assets/constants'
import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Logs = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate  = useNavigate()
  const token = JSON.parse(localStorage.getItem("users"));
  const redirectLogin = (e)=>{
e.preventDefault()
navigate('/login')
  }
  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        const resp = await axios.get(
          `${baseUrl}/api/functionality/logs`,
          {
            headers: {
              Authorization: `Bearer ${token.token}`,
            },
          }
        );
        setData(resp.data);
      };
      fetchData();
    
    }
  }, []);
if (!token) {
  return(

    <div>
    <h1 className="text-center mt-4">You are not logged in </h1>
    
    <button className=" d-block mx-auto btn-primary btn " onClick={redirectLogin}>Login</button>
    </div>
  )
}

const handleDelete = async (e,id) => {
  e.preventDefault()
  setLoading(true)
  try {
  const resp =  await axios.delete(`${baseUrl}/api/functionality/logs/${id}`, {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    });
    setLoading(false)
    toast.success(resp.data.message)
    setData(data.filter(item => item._id !== id));
  } catch (error) {
    toast.error(error.message)
    setLoading(false)
    console.error('Error deleting item', error);
  }
};
  return (
    <div className="container">
      {
        data.length ===0?
        <>
        <h1>You don't have any logged data</h1>
        </>
        :
      <MDBTable small>
        <MDBTableHead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Link</th>
            <th scope="col">Shortend Link</th>
            <th scope="col">Visitors</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {
            data && data.map((d,k)=>(

          <tr key={k}>
            <th scope="row">{k+1}</th>
            <td> {d.redirectUrl.length>50?d.redirectUrl.substring(0,50)+'...':d.redirectUrl} </td>
            <td> <a href={`${baseUrl}/${d.shortId}`} target="_blank" rel="noopener noreferrer">{`${baseUrl}/${d.shortId}`}</a></td>
            <td>{d.visitHistory==''?0:d.visitHistory.length}</td>
            <td onClick={(e)=>handleDelete(e,d._id)}>
              {
                loading?
                <MDBSpinner  role="status">
                <span className="visually-hidden">Loading...</span>
              </MDBSpinner>
                :
                <MDBIcon fas icon="trash-alt" />
                
              }
              
              </td>
          </tr>
            ))
          }
        </MDBTableBody>
      </MDBTable>
      }
    </div>
  );
};

export default Logs;
