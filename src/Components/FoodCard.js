import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Button, Grid, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useContext, useState } from 'react';
import { LoggedInUserContext } from './Authenticator';
import axios from 'axios';
import { SERVER_HOST } from '../constants';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



export default function FoodCard({ name, description, price, image }) {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [severity, setSeverity] = useState("");
  //const {authChecker}=useContext(LoggedInUserContext);

  const { userLoggedData, setUserCartData } = useContext(LoggedInUserContext);
  const refuserId = userLoggedData.id;
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const addItemToCart = async (name, price) => {

    try {
      const cartData = {
        userCartRef: refuserId,
        foodName: name,
        price: price
      }
      debugger
      //const result=await authChecker();
     // console.log("result", result)
      debugger;

      const atoken = sessionStorage.getItem("atoken");
      if (atoken === "null") {
        setOpen(true);
        setMsg("Kindly Login First");
        setSeverity("error");
      }
      else {
        const result2 = await axios.post(`${SERVER_HOST}/usercartdata`, cartData, { headers: { "Authorization": `Bearer ${atoken}` } });
        console.log('result2', result2);
        debugger;
        if (result2.data.status) {
          setOpen(true);
          setMsg("Item Added to Cart");
          setSeverity("success");
          setUserCartData(result2.data);
          debugger;

        } else {
          setOpen(true);
          setMsg("Kindly Login First");
          setSeverity("error");
        }
      }


    } catch (e) {
      setOpen(true);
      setMsg(`Error Occured ${e}`);
      setSeverity("error");
    }

  }


  return (

    <>
      <Snackbar anchorOrigin={{ horizontal: 'center', vertical: 'top' }} open={open} autoHideDuration={1500} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {msg}
        </Alert>
      </Snackbar>
      <Card sx={{ maxWidth: 345, minHeight: 389 }} >
        <CardActionArea>
          <CardMedia
            component="img"
            height="180"
            image={`${process.env.PUBLIC_URL}/fruit-salad.jpg`}
            alt="Fruit Salad"
          />
          <CardContent sx={{ minHeight: 133 }}>
            <Typography gutterBottom variant="h5" component="div" sx={{ fontFamily: 'Rock Salt' }}>
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardContent>
          <Grid container >
            <Grid item xs={5}>
              <Typography variant='h6' sx={{ fontWeight: 'bold', fontFamily: 'Rock Salt' }}>₹ {price}</Typography>

            </Grid>
            <Grid item xs={7}>
              <Box display="flex" justifyContent="flex-end">

                <Button variant="contained" onClick={(e) => { addItemToCart(name, price) }} endIcon={<ShoppingCartIcon sx={{ color: 'white', fontSize: '2rem' }} />} >
                  Add To Cart
                </Button>
              </Box>



            </Grid>
          </Grid>

        </CardContent>

      </Card>
    </>
  );
}