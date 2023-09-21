import React from "react";
import './Card.css';
import { Card,CardContent,Typography} from "@material-ui/core";
import image from '../../../images/withdraw.png'
import image1 from '../../../images/viewbalance.png'
import BasicTable from '../../Transaction/Table/Table';

const BasicCard = (props)=> {
    // console.log("card",props)
    let styleValue = '';
    if(props.value ==='card-1'){
        styleValue='card-1'
    }
    else if(props.value==='card-2-a'){
        styleValue = 'card-2-a'
    }
    else if(props.value==='card-2-b'){
        styleValue = 'card-2-b'
    }
    else if(props.value==='card-3'){
      styleValue = 'card-3'
    }
      else if([props.value=='card-4']){
      styleValue='card-4'
  }

  return (
    <Card className={styleValue} sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {styleValue==='card-3' && <><div className="card-3-text"><h2 >Congratulations, Your transaction is successful</h2>
          <h4>Amount Withdrawal:{props.result.reduce((acc,val,i)=>{ return acc+val[1]*val[0]},0)}</h4>
          </div>
          <BasicTable result={props.result}/>
          </>  }
          {styleValue==='card-2-a' && <><div className="cardStyle"> <h3>Withdraw Money </h3> 
          </div><div><img src={image}  style={{width:'65%',marginLeft:'2rem'}} alt="Description" />;</div></>}
          {styleValue==='card-2-b' && <><div className="cardStyle" ><h3>View Balance</h3> 
          </div><div><img src={image1}  style={{width:'65%',marginLeft:'2rem'}} alt="Description" />;</div></>}


          {styleValue==='card-4' && <><div className="card-3-text"><h2 >Your Remaining Balance is  :  {props.details.balance}</h2>
          </div>
          </>
         }


        </Typography>
      </CardContent>
    </Card>
  );
}

export default BasicCard