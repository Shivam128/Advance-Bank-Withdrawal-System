import React, { useState} from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@material-ui/core";
import image from '../../../images/onlinebanking.png'
import { useNavigate} from "react-router-dom";
import ErrorModal from "../../Layout/ErrorModal/ErrorModel";


const Withdrawal = (props) => {

  //declararing states and const variables
  const [error,setError]=useState(false)
  const [errorMessage,setErrorMessage]=useState(false)
  const navigate = useNavigate();
  let inputAmount = 0;
  const [denomination,setDenomination]=useState(0); 
  let ans = [];
 let notesArray = [10, 20, 50, 100, 200, 500, 1000];

  
// to handle input amount  entered
const handleAmount = (e) => {
  inputAmount = Number(e.target.value);
   };
 
   // to handle input denomination if any exists
   const handleDemomination = (e) => {
   setDenomination(e.target.value);
   };

    // main submit function run on submission of the withdraw form
  const submitHandler = (e) => {
    e.preventDefault();
    debugger;
    
     if((inputAmount%10)===0 && inputAmount!==0  && inputAmount<=props.inputVal.balance && inputAmount>=(denomination?denomination:1)){
   let totalNoteCount =[...(props.loginData.find(detail =>detail.availableNotes)).availableNotes];
    let denominationKey = denomination
    ? notesArray.findIndex((value) => value === denomination)
    :-1;
    let possiblility = checkPossible(notesArray,totalNoteCount,inputAmount);
    if(possiblility){
      let maxDenomination =main(notesArray,totalNoteCount,inputAmount,denomination);
      inputAmount-=maxDenomination*denomination;
      totalNoteCount[denominationKey]-=maxDenomination;
      let arr=find_ans(notesArray,totalNoteCount,inputAmount,denominationKey);
      if(denomination!==0 && maxDenomination && arr!==false) {
        arr.push([denomination, maxDenomination]);
      } 
      if(arr.length>=0){
         props.resultFn(arr);
      }
      navigate('/amount');
  }
  else {setError(true); setErrorMessage('Not able to dispense Cash')}
     } else if(inputAmount>props.inputVal.balance){
      debugger;
      setError(true); setErrorMessage('Insufficient Balance')
     }
   else if((inputAmount%10)!==0 || inputAmount===0)
   {
    setError(true); setErrorMessage('Please Enter a valid Amount')
   }
 else {setError(true); setErrorMessage('Not able to dispense Cash')}
};



 //  declaring some funtion definitions for further use in my submit handler function




 // Checking whether the entered combination is valid or not with optimaised approach
 function checkPossible(NotesArray, NotesArrayCountCopy, inputAmountValue, notes=0, index=0, denominations=0) {
  let NotesArrayCount = [...NotesArrayCountCopy];
 
  inputAmountValue -= denominations * notes;
  NotesArrayCount[index] -= notes;
  let i = NotesArray.length - 1;
  while (i >= 0) {
      if (inputAmountValue >= NotesArray[i] && NotesArrayCount[i] !== 0) {
          if (NotesArrayCount[i] >= Math.floor(inputAmountValue/NotesArray[i])) {
              inputAmountValue -= Math.floor(inputAmountValue / NotesArray[i])*NotesArray[i];
              NotesArrayCount[i] -= Math.floor(inputAmountValue/NotesArray[i]);

          } else {
              inputAmountValue -= NotesArrayCount[i]*NotesArray[i];
              NotesArrayCount[i] = 0;
          }
      }
      i--;
  }
  return inputAmountValue === 0;
}


// finding the answer with the optimised approach and checking whether the given possibility suits or not
  function find_ans(amountCopy,totalNoteCountCopy,inputAmount,denominationKey){
    let notesArray = [...amountCopy]
    let totalNoteCount = [...totalNoteCountCopy]
  let i = 6;
  for (; i >= 0; i--) {
    if (i === denominationKey) continue;
    if (inputAmount === 0) break;
    let note = Math.floor(inputAmount / notesArray[i]);
    if (totalNoteCount[i] - note >= 0) {
      inputAmount -= notesArray[i] * note;
      totalNoteCount[i] -= note;
      if(note!==0)
    ans.push([notesArray[i], note]);
    } else {
      inputAmount -= totalNoteCount[i] * notesArray[i];
      if(totalNoteCount[i]!==0)
    ans.push([notesArray[i], totalNoteCount[i]]);
      totalNoteCount[i] = 0;
    }
  }
  if(inputAmount===0) return ans;
  return false;
}
  


 


// helper function to find denomination index
function findDemIdx(coins, dem) {
  for (let i = 0; i < coins.length; i++) {
      if (coins[i] === dem) {
          return i;
      }
  }
}

// This function is doing the main optimisation by using binary search while finding combinations for minimum notes with denomination
function main(noteArray,actualNoteArray,amount,dem) {
  const idx = findDemIdx(noteArray, dem);
  let maxNotesTaken = Math.min(Math.floor(amount / dem), actualNoteArray[idx]);
  let minNotes = 0;
  let ans1 = 0;
  while (maxNotesTaken >= minNotes) {
      let mid =   Math.floor((maxNotesTaken + minNotes) / 2);
      if (checkPossible(noteArray, actualNoteArray, amount, mid, idx, dem)) {
          ans1 = mid;
          minNotes = mid + 1;
      } else {
          maxNotesTaken = mid - 1;
      }
  }
  return ans1;
}
  return (
    <div style={{margin:'auto !important'}}>
      <FormControl style={{ width: "30vw",marginTop:'8rem',marginLeft:'8rem'}}>
        <InputLabel id="demo-simple-select-label">
          Choose Denomination Pereference
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          placeholder="Want to Choose Denomination Pereference Select Here"
          label="Want to Choose Denomination Pereference Select Here"
          onClick={handleDemomination}
        >
          <MenuItem value={10}>10 Rupee Note</MenuItem>
          <MenuItem value={20}>20 Rupee Note</MenuItem>
          <MenuItem value={50}>50 Rupee Note</MenuItem>
          <MenuItem value={100}>100 Rupee Note</MenuItem>
          <MenuItem value={200}>200 Rupee Note</MenuItem>
          <MenuItem value={500}>500 Rupee Note</MenuItem>
          <MenuItem value={1000}>1000 Rupee Note</MenuItem>
        </Select>
        <TextField
            required
          id="standard-basic"
          label="Amount"
          onChange={handleAmount}
          variant="standard"
        />
        <Button style={{marginTop:'2rem',background:'violet'}} onClick={submitHandler} >Withdraw</Button>
        {error && <ErrorModal onClose={() => {
            setError(false);
          }} >{errorMessage}</ErrorModal>}
      </FormControl>
      <img src={image}  style={{width:'30%',marginLeft:'7rem',marginTop:'4rem'}} alt="Description" />
    </div>
  );
};

export default Withdrawal;
