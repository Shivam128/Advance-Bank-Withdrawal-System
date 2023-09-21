import React from "react";
import { Box,AppBar,Typography,Toolbar,Button } from "@material-ui/core";
import {useNavigate} from "react-router-dom"


const Header = ({setIsLoggedIn})=>{
  const navigate = useNavigate();
  
  const logout  =()=>{
  localStorage.removeItem("access_token");
  setIsLoggedIn(false)
  navigate('/login')
}

    return <> <Box sx={{ flexGrow: 1 }}>
    <AppBar className="appBarCSS" position="static">
      <Toolbar style={{justifyContent:"space-between",margin:"0 5rem 0 5rem"}}>
        <Typography variant="h6" component="div" style={{marginTop:'-15px'}} sx={{ flexGrow: 1 }}>
          I-Bank Account
        </Typography>
        <Button  onClick={logout} style={{marginTop:'-15px',background:'#44d1cb',borderRadius:'grey'}} color="inherit">Logout</Button>
      </Toolbar>
    </AppBar>
  </Box></>
}

export default Header