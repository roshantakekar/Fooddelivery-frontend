import React from 'react'
import { Grid, Typography } from '@mui/material'
import FoodCard from './FoodCard'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_HOST } from '../constants';

function Home() {

    const [cardData, setCardData] = useState([""]);

    useEffect(() => {
        debugger;

        const getFoodData = async () => {
            const result = await axios.get(`${SERVER_HOST}/fooddata`);
            debugger
            console.log('res', result);
            setCardData(result.data);
            debugger;
        }
        getFoodData();

    }, [])
    return (
        <>
            <Grid container alignItems="center" justifyContent="center" sx={{ backgroundImage: `url(${process.env.PUBLIC_URL}/food-banner.jpg)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '35rem' }}>
                <Grid item >
                    <Typography variant='h3' sx={{ fontWeight: '600', fontFamily: 'Rock Salt' }} color={"#F7B24A"}>HELLO FOODIE!</Typography>
                </Grid>

            </Grid>
            <Grid container p={10} direction="row" spacing={5}>
                {cardData && cardData.map((data,i) => {
                    return (
                        <Grid item key={i}>
                            <FoodCard {...data}/>
                        </Grid>
                    )
                })
                }



            </Grid>
        </>
    )
}

export default Home