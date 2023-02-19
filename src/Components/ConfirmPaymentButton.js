import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
//import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
import axios from 'axios';
import { SERVER_HOST } from '../constants';
import { useContext } from 'react';

import { LoggedInUserContext } from './Authenticator';

import { useNavigate } from "react-router-dom";



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #ffffff',
    boxShadow: 24,
    p: 4,
    borderRadius: '3px'
};

export default function ConfirmPaymentButton({ totalAmount,orderSummary,userId }) {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const { setUserCartData } = useContext(LoggedInUserContext);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const confirmPaymentFunc=async()=>{
        console.log("os",orderSummary);
        const confirmOrderData={
            userRef:userId,
            itemsOrdered:orderSummary.finalResult,
            totalCartItems:orderSummary.totalCartItems,
            totalPrice:orderSummary.totalPrice
        }
        const orderConfirmedData=await axios.post(`${SERVER_HOST}/confirmOrder`,confirmOrderData);
        debugger;


        const atoken = sessionStorage.getItem("atoken");
        if (atoken === "null") {
          alert("Kindly Login First");
        }
        else {
          //const result2 = await axios.post(`${SERVER_HOST}/usercartdata`, cartData, { headers: { "Authorization": `Bearer ${atoken}` } });


        const emptyCart=await axios.delete(`${SERVER_HOST}/usercartdata/${userId}`,{ headers: { "Authorization": `Bearer ${atoken}` } })
        debugger;
        if(orderConfirmedData.status===200 && emptyCart.status===200) {
            setOpen(false);
            setUserCartData([]);
            navigate("/confirmOrder",{state:{ confirmId: orderConfirmedData.data._id }});

        }else{
            setOpen(false);
            navigate("/cartdetails");
        }
    }
    }

    return (
        <div>
            <Button onClick={handleOpen} variant="contained">Pay</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Grid container justifycontent="center">
                    <Grid item >

                        <Box sx={style} >
                            
                            <Typography variant="h5" sx={{ textAlign: "center",fontWeight:'bold' }} >
                                <Typography component="span" sx={{ fontSize: '1.5rem' }}>&#x20b9;</Typography>&nbsp;{totalAmount}
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2, textAlign: "center" }} >
                                {/* <Link to="/your-orders" style={{textDecoration:'none'}}> */}
                                    <Button variant='contained' onClick={confirmPaymentFunc}>Confirm Payment</Button>
                                {/* </Link> */}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Modal>
        </div>
    );
}