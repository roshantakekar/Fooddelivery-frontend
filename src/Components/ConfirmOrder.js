import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { SERVER_HOST } from '../constants';
import { Grid, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, Paper } from '@mui/material';

const ConfirmOrder = () => {
    const { state } = useLocation();
    const [confirmOrder, setConfirmOrder] = useState(false);
    const [orderConfirmedData, setOrderConfirmedData] = useState({});


    useEffect(() => {
        try {
            const getConfirmOrder = async () => {
                const confirmedOrderData = await axios.get(`${SERVER_HOST}/confirmOrder/${state.confirmId}`);
                if (confirmedOrderData.status === 200) {
                    setConfirmOrder(true);
                    setOrderConfirmedData({ ...confirmedOrderData.data });
                } else {
                    setConfirmOrder(false);
                }
                debugger;
                //console.log(confirmedOrderData);
            }
            getConfirmOrder();

        } catch (e) {
            console.log(e);
        }



    }, [state.confirmId])




    return (
        <>
            {confirmOrder &&
                <Grid container>

                    <Grid container justifyContent={"center"} mt={5}>
                        <Grid item>
                            <Typography sx={{ 'fontWeight': 'bold' }} align="center" variant='h5'>Thank You!</Typography>
                            <Typography sx={{ 'fontWeight': 'bold' }} >Your Order is Confirmed!! Order Id is {orderConfirmedData._id.substr(orderConfirmedData._id.length - 5)}</Typography>
                            <Typography sx={{ 'fontWeight': 'bold' }} align="center">Total Cost: <Typography component="span" sx={{ fontSize: '1.2rem' }}>&#x20b9;</Typography>&nbsp;{orderConfirmedData.totalPrice}</Typography>
                        </Grid>
                    </Grid>

                    <Grid container py={1} justifyContent={"center"}>
                        <Grid item >
                            <Paper elevation={3}>
                                {orderConfirmedData.itemsOrdered && orderConfirmedData.itemsOrdered.map((x, i) => {
                                    return (


                                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} key={i}>
                                            <ListItem alignItems="flex-start" justifyContent="center">
                                                <ListItemAvatar>
                                                    <Avatar alt={x.foodName} src={`${process.env.PUBLIC_URL}/fruit-salad.jpg`} />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={x.foodName}
                                                    secondary={
                                                        <React.Fragment>
                                                            <Typography
                                                                sx={{ display: 'inline' }}
                                                                component="span"
                                                                variant="body2"
                                                                color="text.primary"
                                                            >
                                                                Qty : {x.totalItems}
                                                            </Typography>
                                                            <Typography
                                                                sx={{ display: 'block' }}
                                                                component="span"
                                                                variant="body2"
                                                                color="text.primary"
                                                            >
                                                                <Typography component="span" sx={{ fontSize: '1rem' }}>&#x20b9;</Typography>&nbsp;{x.priceItem}
                                                            </Typography>
                                                        </React.Fragment>
                                                    }
                                                />
                                            </ListItem>
                                            <Divider variant="inset" component="li" />

                                        </List>


                                    )
                                })}
                            </Paper>
                        </Grid>
                    </Grid>

                </Grid>
            }
        </>
    )
}

export default ConfirmOrder