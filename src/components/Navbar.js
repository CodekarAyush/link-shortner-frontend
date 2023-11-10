import React, { useContext, useState } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBCollapse
} from 'mdb-react-ui-kit';
import {toast} from 'react-toastify'
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';
const Navbar = () => {
    const [openBasic, setOpenBasic] = useState(false);
    
const {userData} = useContext(UserContext)
  
function clearStorageAndNavigate() {
  localStorage.clear();

  document.cookie.split(';').forEach(function(cookie) {
    const eqPos = cookie.indexOf('=');
    document.cookie = 'Authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  });

  toast.success('user logout');
    window.location.href = '/';
}
return (
    <MDBNavbar expand='lg' light bgColor='light'>
    <MDBContainer fluid>
      <MDBNavbarBrand href='#'>CroMax</MDBNavbarBrand>

      <MDBNavbarToggler
        aria-controls='navbarSupportedContent'
        aria-expanded='false'
        aria-label='Toggle navigation'
        onClick={() => setOpenBasic(!openBasic)}
      >
        <MDBIcon icon='bars' fas />
      </MDBNavbarToggler>

      <MDBCollapse navbar open={openBasic}>
        <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
          <MDBNavbarItem>
            <MDBNavbarLink active aria-current='page' >
              <Link to="/">
              Home
              </Link>
            </MDBNavbarLink>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <MDBNavbarLink ><Link to="/logs">Logs</Link></MDBNavbarLink>
          </MDBNavbarItem>
        </MDBNavbarNav>

        <form className='d-flex justify-content-center input-group w-auto'>
         {
           userData?
           <MDBBtn outline color='danger' onClick={clearStorageAndNavigate}>Logout </MDBBtn>:
           <MDBBtn outline color='primary'> <Link to="/login">Login</Link> </MDBBtn>
        } 
        </form>
      </MDBCollapse>
    </MDBContainer>
  </MDBNavbar>
  )
}

export default Navbar