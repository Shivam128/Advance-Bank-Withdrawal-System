import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Layout/Header/Header.js";
import LandingPage from "./components/HomePage/LandingPage";
import Footer from "./components/Layout/Footer/Footer.js";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./components/Layout/Footer/Footer.css";
import Withdrawal from "./components/Transaction/Withdrawal/Withdrawal";
import Login from "./components/Layout/Login/LoginPage";
import BasicCard from "./components/Layout/Card/Card";

// cobination of notes as given in the question

const noteValues = [10,20,50,100,200,500,1000]

// I have taken a dummy array. Initially I choose firebase but then again I have to change the values of notes and balance of each user, So finally I perform operations on Dummy array.
const accountDetails =   [{
  name: "Shivam",
  balance: 20000,
  cardNumber: 12345678,
  pin: 12341,
},
{
  name: "Sarthak",
  balance: 20000,
  cardNumber: 12345678,
  pin: 12342,
},
{
  name: "Abhishek",
  balance: 20000,
  cardNumber: 12345678,
  pin: 12343,
},
{
  availableNotes: [10, 50, 10, 10, 10, 10, 10],
}]


function App() {
  const [landingValue,setValue]=useState({}); 
  const [result,setResult]=useState([]);
  const [credential,setCredential]=useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  // UseEffect for the token generated in login page, Noa from this I will give functionality to my login page that after logout on pressing back history key the user will directly redirect to the login page instead of any other page
  useEffect(() => {
    let token = localStorage.getItem("access_token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);


  const resultFn = (res)=>{

   if(res.length!==0){
    console.log(accountDetails)
    setResult(res);
    res.forEach((valArray)=>{
        let index1 = noteValues.findIndex((val) => val===valArray[0])
        
        // Updating the notes in the original account array 
            let st = accountDetails[accountDetails.length-1].availableNotes[index1]
            if(st-valArray[1]>=0){
              accountDetails[accountDetails.length-1].availableNotes[index1] -= valArray[1]; 
   }
  })
  // updating the balance of the logged in user
  let value  = res.reduce((acc,val)=>{
    return acc+val[0]*val[1];
   },0)
        accountDetails[credential.indexCheck].balance-=value;
}
  }

  // function used for prop drilling to get the credential from login page and other details
  const resultFn1 = (credentials)=>{
    setCredential(credentials);
    setValue({'name':credentials.valueCheck.name,'balance':credentials.valueCheck.balance})
  } 

return (
    <>
      <Router>
        {isLoggedIn && <Header setIsLoggedIn={setIsLoggedIn} />}

        <Routes>
          {isLoggedIn && (
            <>
              <Route exact path="/" element={<LandingPage details={landingValue} />} />
              <Route
                exact
                path="/withdrawal"
                element={<Withdrawal resultFn={resultFn} inputVal={landingValue} loginData={accountDetails} />}
              />
              <Route exact path="/amount" element={<BasicCard value='card-3' result={result} />} />
              <Route exact path="/balance" element={<BasicCard value='card-4' details={landingValue}/>} />
            </>
          )}
          {!isLoggedIn && (
            <Route
              path="/login"
              element={
                <Login
                  setIsLoggedIn={setIsLoggedIn}
                  loginData={accountDetails}
                  credentiallFn = {resultFn1}
                />
              }
            />
          )}
          {isLoggedIn && <Route path="*" element={<Navigate to="/" />} />}

          {!isLoggedIn && <Route path="*" element={<Navigate to="/login" />} />}
        </Routes>
      </Router>
      {isLoggedIn && <Footer />}
    </>
  );
}

export default App;
