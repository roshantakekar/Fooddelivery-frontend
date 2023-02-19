import { Grid, Paper, Box, Typography, CardMedia, Divider, Button } from '@mui/material'
import axios from 'axios';
import { SERVER_HOST } from '../constants';
//import { prepareDataForValidation } from 'formik';
import React, { useContext, useEffect, useState } from 'react'
//import { Link } from 'react-router-dom';
import ConfirmPaymentButton from './ConfirmPaymentButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { LoggedInUserContext } from './Authenticator';




function CartDetails() {
  // const [allFood,setallFood]=useState([]);
  // const [uniqueFood,setuniqueFood]=useState({});
  const { userCartData,setUserCartData, userLoggedData } = useContext(LoggedInUserContext);
  
  //const [userCartPrice, setUserCartPrice] = useState([]);
  const [resultData, setResultData] = useState({});
  console.log("ucd", userCartData);

  const removeItem = async (e) => {
    const atoken = sessionStorage.getItem("atoken");
    if (atoken === "null") {
      alert("Kindly Login First");
    }
    else {
      const tempData = await axios.delete(`${SERVER_HOST}/usercartdata/deleteItem/${e.target.id}`, { headers: { "Authorization": `Bearer ${atoken}` } });
      debugger
      if(tempData.status===200)
      {
        let temp=userCartData;
        console.log("tttteeeeeeee",temp);
        temp = temp.filter(function( obj ) {
          debugger
          return obj._id !== e.target.id;
        });
        setUserCartData(()=>[...temp]);

        
      }else{
        console.log("Error occurred");
      }
      
      
    }
  }

  useEffect(() => {

    async function getResult() {


      const tempData = await axios.get(`${SERVER_HOST}/getUserCartPrice/${userLoggedData.id}`);
      debugger
      setResultData(tempData.data);
      console.log("RRR", userCartData);

    }


    getResult();



    // eslint-disable-next-line
  }, [userCartData.length])




  return (
    <Grid container p={10} direction="row" spacing={3}>
      <Grid item xs={6}>
        {resultData.finalResult && resultData.finalResult.map((x, i) => {
          return (
            <Paper elevation={3} sx={{ width: '100%', marginBottom: '2%' }} key={i} >
              <Box sx={{ display: 'flex' }} p={3}>
                <Box sx={{ width: '40%' }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`${process.env.PUBLIC_URL}/fruit-salad.jpg`}
                    alt={x.foodName}
                  />
                </Box>
                <Box sx={{ width: '60%' }} p={2}>
                  <Typography gutterBottom variant="h6" component="div" sx={{ fontFamily: 'Rock Salt' }}>
                    {x.foodName}&nbsp;&nbsp;x&nbsp;&nbsp;<Typography variant="body" sx={{ fontFamily: 'Rock Salt' }} >{x.totalItems}</Typography>
                  </Typography>
                  <Typography variant="h6" color="text.secondary" fontWeight={600} sx={{ fontFamily: 'Rock Salt' }} pt={3}>
                    ₹ {x.priceItem}
                  </Typography>

                  <Typography component={"div"} align="right">
                    
                    {userCartData[i] &&<Button variant="outlined" startIcon={<DeleteIcon />} id={userCartData[i]._id} onClick={removeItem}>
                      Delete
                    </Button>}
                  </Typography>




                </Box>
              </Box>

            </Paper>
          )
        })
        }

      </Grid>


      <Grid item xs={6} sx={{ fontFamily: 'Rock Salt' }}>
        <Paper elevation={5} sx={{ width: '100%', padding: '5%' }} >
          <Grid container justifyContent="right" >
            <Grid item xs={12}>Items Ordered</Grid>

          </Grid>
          <Divider />

          {resultData.finalResult && resultData.finalResult.map((x, i) => {
            return (
              <Grid container justifyContent={'center'} py={1} key={i}>
                <Grid item xs={8}>
                  <Typography variant="body" sx={{ fontFamily: 'Rock Salt' }} >{x.foodName}</Typography>&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;<Typography variant="body" sx={{ fontFamily: 'Rock Salt' }} >{x.totalItems}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body" sx={{ fontFamily: 'Rock Salt' }} px={2}><Typography component="span" sx={{ fontSize: '1.5rem' }}>&#x20b9;</Typography>&nbsp;{x.price}</Typography>
                </Grid>

              </Grid>
            )
          })}

          <Divider />
          <Grid container justifyContent={'center'} py={1}>
            <Grid item xs={8}>
              {resultData.totalCartItems && <><Typography variant="body" sx={{ fontFamily: 'Rock Salt' }} >Total Items</Typography>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Typography variant="body" sx={{ fontFamily: 'Rock Salt', fontWeight: 'bold' }} >{resultData.totalCartItems}</Typography></>}
            </Grid>
            <Grid item xs={4}>
              {resultData.totalPrice && <Typography variant="body" sx={{ fontFamily: 'Rock Salt', fontWeight: 'bold' }} px={2}><Typography component="span" sx={{ fontSize: '1.5rem' }}>&#x20b9;</Typography>&nbsp;{resultData.totalPrice}</Typography>}
            </Grid>

          </Grid>


        </Paper>
        <Grid container justifyContent="center">
          <Grid item mt={5}>
            <ConfirmPaymentButton totalAmount={resultData.totalPrice} orderSummary={resultData} userId={userLoggedData.id} />
          </Grid>
        </Grid>

      </Grid>
    </Grid>
  )
}

export default CartDetails