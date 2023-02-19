import {  Grid, Typography} from '@mui/material'
import FastfoodIcon from '@mui/icons-material/Fastfood';

function Footer() {
    return (
        <Grid container sx={{height:'15rem',color:'#ffffff',backgroundColor:'#A87301'}} mt={10} alignItems="center"
        justifyContent="center"  align="center">
            <Grid sm={12}  item >
                {/* <FormHelperText sx={{color:'#ffffff ',textAlign:'center'}}><CopyrightIcon sx={{fontSize:'.70rem'}}/> Copyright 2023</FormHelperText> */}
                <FastfoodIcon sx={{fontSize:'4rem'}}/>
                <Typography variant='h5' sx={{fontFamily:'Rock Salt'}}>Enjoy ur Meals!</Typography>
            </Grid>
            
        </Grid>
    )
}

export default Footer