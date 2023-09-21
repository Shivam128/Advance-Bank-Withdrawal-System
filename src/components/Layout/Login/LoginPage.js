import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CryptoJS from 'crypto-js';
import {useNavigate} from "react-router-dom"
import {useState} from 'react'
import './loginPage.css';
import ErrorModal from '../ErrorModal/ErrorModel';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn(props) {
    const navigate = useNavigate();
    const [error,setError] = useState(false);
    const [errorMessage,setErrorMessage] = useState(false);

    // Adding useEffect to store the token in the local storage for further accessing the value, so that the user get logged in.
    React.useEffect(()=> {
        let token = localStorage.getItem('access_token')
          if(token){
            navigate("/")
          }else{
          }
        },[])

        // function for key pin validationa along with setting some routes fot login and home page i.e landingpage
  const handleSubmit = (event) => {
    event.preventDefault();
    debugger;
    const formdata = new FormData(event.currentTarget);
    const data = {'card':Number(formdata.get('card')),'pin':Number(formdata.get('pin'))}
    if(data.card && data.pin) { 
      const valueCheck = props.loginData.find(detail => detail.cardNumber ===Number(data.card) && detail.pin ===Number(data.pin))
      const indexCheck = props.loginData.findIndex(detail => detail.cardNumber ===Number(data.card) && detail.pin === Number(data.pin))
          if(valueCheck){
            props.credentiallFn({valueCheck,indexCheck});
              const encJson = CryptoJS.AES.encrypt(JSON.stringify(process.env.REACT_APP_INCRYPTION), process.env.REACT_APP_SECURITY_KEY).toString()
        const encData = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encJson))
        localStorage.setItem('access_token',encData)
        props.setIsLoggedIn(true)
        navigate("/")
          }
          else{
            setError(true)
          setErrorMessage('Invalid Credential!')
          }
        }
        else {
          setError(true);
          setErrorMessage('Credentials not entered correctly')
          // navigate('/')
        }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" style={{border:'1px solid voilet', marginTop:'7rem',borderRadius:'5px',boxShadow:'0px 2px 4px rgb(45 35 66 / 40%), 0px 7px 13px -3px rgb(45 35 66 / 30%), inset 0px -3px 0px '}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height:'25rem'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Enter Details
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              
              required
              fullWidth
              id="card"
              type="number"
              label="Enter Card Number"
              name="card"
              autoComplete="email"
              autoFocus
              InputProps={{
                  inputProps: {
                    minLength: 0, // Minimum length
                    maxLength: 8, // Maximum length
                  } 
                }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="pin"
              label="Enter Pin"
              type="password"
              id="pin"
              autoComplete="current-password"
            />
<Button  type="submit"
              fullWidth
              variant="contained"
              style={{marginTop:'3rem',backgroundColor:'#7f467f'}}
              sx={{ mt: 3, mb: 2 }} color="success">Login
          </Button>
          </Box>
          {error && <ErrorModal onClose={() => {
            setError(false);
          }} >{errorMessage}</ErrorModal>}
        </Box>
      </Container>
      <div className="test-cases">
        <p>Login Credentials: </p>
        <p>Card Number: 12345678</p>
        <p>Password for Shivam(user-1): 12341</p>
        <p>Password for Sarthak(user-2): 12342</p>
        <p>Password for Abhishek(user-2): 12342</p>
        <p>Login Credentials: </p>
      </div>
    </ThemeProvider>
  );
}