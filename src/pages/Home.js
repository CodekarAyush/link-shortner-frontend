import { MDBBtn, MDBInput } from "mdb-react-ui-kit";
import React, { useState, useRef, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { LinkDataContext } from "../context/LinkDataProvider";
import { UserContext } from "../context/UserProvider";
import { baseUrl } from "../assets/constants";
const Home = () => {
  const [link, setLink] = useState("");
const {linkData, setLinkData} = useContext(LinkDataContext)

const {userData,setUserData} = useContext(UserContext)

console.log(userData);
useEffect(() => {
        
  const data =    localStorage.getItem('users')
  const parsedData = JSON.parse(data)
 setUserData(parsedData)
}, []);

  const handleLink = async (e) => {
    if (!link) {
      toast.error("please enter the link");
    } else {
      try {
        const resp = await axios.post(`${baseUrl}/api/url/shorten`, {
          url: link,
          userId : userData ? userData.userId:''
        });
        setLinkData(resp.data)
        toast.success(resp.data.message)
      } catch (error) {
        if (error) {
          console.log(error);
          toast.error("something went wrong");
        }
      }
    }
  };
  const inputRef = useRef(null);

  const handleCopyClick = () => {
    inputRef.current.select();
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    alert("Text has been copied to the clipboard");
  };
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <h1 className="text-center"> The best Link shortner app .</h1>
<p className="text-muted text-center mt-3">
        {userData?`Welcome  ${userData.username} to cromax . Hope you find our product worth . `:''}
</p>
        <div className="col-md-7 mt-3 d-flex">
          <MDBInput
            label="Paste your link here ..."
            onChange={(e) => {
              setLink(e.target.value);
            }}
            id="form1"
            type="text"
          />
          <div>
            <MDBBtn outline onClick={handleLink}>
              Shorten
            </MDBBtn>
          </div>
        </div>
        <div className="col-md-7 mt-3 d-flex">
          <MDBInput
            type="text"
            ref={inputRef}
            value={linkData.redirectUrl===''?`first give a link `:linkData.redirectUrl}
            readOnly
          />
          <button onClick={handleCopyClick}>Copy</button>
        </div>
        <div class="note note-light mt-5">
  <strong>Note :</strong> If you want to know more about the link like how many people have visited your link etc . Then please login or signup . We have a lot more interesting things that will bring the ease in your life . <br />  <b>By- Ayush Gautam (Developer)</b>
</div>
      </div>
    </div>
  );
};

export default Home;
