import { Grid, Typography, Paper, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { SERVER_HOST } from '../constants';
import axios from 'axios';



const YourOrders = () => {
    const [yourOrders, setYourOrders] = useState([]);

    useEffect(() => {
        console.log("asdasd");
        const getYourOrders = async () => {
            debugger;
            const YourOrders = await axios.get(`${SERVER_HOST}/confirmOrder`);
            setYourOrders([...YourOrders.data]);
            console.log("yo", YourOrders)
            debugger;
        }
        getYourOrders();



    }, [])



    return (
        <Grid container justifyContent={"center"} spacing={3} p={5}>

            {yourOrders.length > 0 ?
                <>
                    <Grid item xs={12}>
                        <Typography sx={{ 'fontWeight': 'bold' }} align="left" variant='h5'>Your Orders</Typography>
                    </Grid>
                    {yourOrders.map((x, i) => {
                        return (
                            <Grid item xs={6} key={i}>
                                <Grid container mt={5} justifyContent={"center"}>
                                    <Grid item xs={12}>
                                        <Typography sx={{ 'fontWeight': 'bold' }} align="left" variant='h5'>Order {i + 1}</Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Paper elevation={3}>
                                            {x.itemsOrdered && x.itemsOrdered.map((y, j) => {
                                                return (

                                                   
                                                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} key={j}>
                                                            <ListItem alignItems="flex-start" >
                                                                <ListItemAvatar>
                                                                    <Avatar alt={y.foodName} src={`${process.env.PUBLIC_URL}/fruit-salad.jpg`} />
                                                                </ListItemAvatar>
                                                                <ListItemText
                                                                    primary={y.foodName}
                                                                    secondary={
                                                                        <React.Fragment>
                                                                            <Typography
                                                                                sx={{ display: 'inline' }}
                                                                                component="span"
                                                                                variant="body2"
                                                                                color="text.primary"
                                                                            >
                                                                                Qty : {y.totalItems}
                                                                            </Typography>
                                                                            <Typography
                                                                                sx={{ display: 'block' }}
                                                                                component="span"
                                                                                variant="body2"
                                                                                color="text.primary"
                                                                            >
                                                                                <Typography component="span" sx={{ fontSize: '1rem' }}>&#x20b9;</Typography>&nbsp;{y.priceItem}
                                                                            </Typography>
                                                                        </React.Fragment>
                                                                    }
                                                                />
                                                            </ListItem>
                                                            <Divider variant="inset" component="li" />

                                                        </List>

                                                    


                                                )
                                            })}

                                            <Typography variant='h6' sx={{'fontWeigh':'bold'}} p={3}>Total Price:&nbsp;<Typography component="span" sx={{ fontSize: '1.2rem' }}>&#x20b9;</Typography>&nbsp;{x.totalPrice}</Typography>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Grid>
                        )
                    })}
                </>
                :

                <Grid container mt={5}>
                    <Grid item xs={12}>
                        <Typography sx={{ 'fontWeight': 'bold' }} align="center" variant='h5'>You Dont Have any Orders!!</Typography>
                    </Grid>
                </Grid>



            }

        </Grid>
    )
}

export default YourOrders