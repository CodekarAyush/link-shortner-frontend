import React, { useContext, useEffect, useState } from "react";
import { LinkDataContext } from "../context/LinkDataProvider";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import axios from "axios";
import {baseUrl} from '../assets/constants'
const Logs = () => {
  // const [tokenSet, setTokenSet] = useState([]);
  // useEffect(() => {
  //   const token = JSON.parse( localStorage.getItem('users'))
  //   setTokenSet(token)
  // }, []);

  // console.log(tokenSet.token);
  const [data, setData] = useState([]);
  console.log(data);
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("users"));
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
  return (
    <div className="container">
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
            data && data.map(d=>(

          <tr>
            <th scope="row">1</th>
            <td> {d.redirectUrl.length>50?d.redirectUrl.substring(0,50)+'...':d.redirectUrl} </td>
            <td> <a href={`${baseUrl}/${d.shortId}`} target="_blank" rel="noopener noreferrer">{`${baseUrl}/${d.shortId}`}</a></td>
            <td>{d.visitHistory==''?0:d.visitHistory.length}</td>
          </tr>
            ))
          }
        </MDBTableBody>
      </MDBTable>
    </div>
  );
};

export default Logs;
