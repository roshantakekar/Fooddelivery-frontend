import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Formik, Form, Field } from 'formik';
import loginSchema from '../schemas/loginSchema';
import { FormHelperText } from '@mui/material';
import axios from "axios";
import { SERVER_HOST } from "../constants.js";
import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useContext,useEffect } from 'react';
import { LoggedInUserContext } from './Authenticator';
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const theme = createTheme();

export default function Login() {
    debugger
    const [open, setOpen] =useState(false);
    const [msg, setMsg] =useState("");
    const [severity, setSeverity] =useState("");
    const initialLoginValues = { email: '', password: '' };
    const {setLoggedIn,authChecker,setUserLoggedData,setUserCartData}=useContext(LoggedInUserContext);
    const navigate = useNavigate();

    useEffect(() => {
        authChecker();
    
    // eslint-disable-next-line  
    }, [])
    


    
    
    

    const handleLogin = async(data,{resetForm}) => {
        
        debugger;
        try {
            const result = await axios.post(`${SERVER_HOST}/login`, data)
            debugger
            if(result.data.status){
                debugger
                sessionStorage.setItem("atoken",result.data.token);
                setOpen(true);
                setMsg("Login Success");
                setSeverity("success");
                setLoggedIn(true);
                debugger;
                setUserLoggedData(result.data.userLoggedData);
                debugger;
                const tempID=result.data.userLoggedData.id;
                const result2= await axios.get(`${SERVER_HOST}/usercartdata/${tempID}`);
                setUserCartData(result2.data);
                resetForm(initialLoginValues);  
                navigate("/");
            }else{
                setOpen(true);
                setMsg("Invalid email/password");
                setSeverity("error");
                
            }
        } catch (e) {
            setOpen(true); 
            setMsg(e);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Snackbar anchorOrigin={{horizontal:'center',vertical:'top'}} open={open} autoHideDuration={3500} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                        {msg}
                    </Alert>
                </Snackbar>
                <Grid container flexDirection="column" p={5}>
                    <Grid item sm={12} xs={12} >

                        <Avatar sx={{ m: "auto", bgcolor: 'secondary.main' }}  >
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" align='center'>
                            Sign in
                        </Typography>

                        <Formik
                            initialValues={initialLoginValues}
                            validationSchema={loginSchema}
                            onSubmit={handleLogin}>
                            {
                                (props) => {
                                    return (

                                        <Form noValidate>
                                            <Box sx={{ mt: 1 }} >
                                                <Field as={TextField}
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="email"
                                                    label="Email Address"
                                                    name="email"
                                                    autoComplete="email"
                                                    autoFocus
                                                />
                                                <FormHelperText error={true} sx={{ mb: 2 }}>{props.errors.email}</FormHelperText >
                                                <Field as={TextField}
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    name="password"
                                                    label="Password"
                                                    type="password"
                                                    id="password"
                                                    autoComplete="current-password"
                                                />
                                                <FormHelperText error={true} sx={{ mb: 2 }}>{props.errors.password}</FormHelperText >
                                                {/* <FormControlLabel
                                            control={<Checkbox value="remember" color="primary" />}
                                            label="Remember me"
                                            /> */}
                                                <Button
                                                    type="submit"
                                                    fullWidth
                                                    variant="contained"
                                                    sx={{ mt: 3, mb: 2 }}
                                                >
                                                    Sign In
                                                </Button>
                                                <Grid container>
                                                    {/* <Grid item xs>
                                                    <Link to="/forgotpassword">
                                                    Forgot password?
                                                    </Link>
                                                </Grid> */}
                                                    <Grid item>
                                                        <Link to="/signup" >
                                                            {"Don't have an account? Sign Up"}
                                                        </Link>

                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Form>

                                    )
                                }
                            }


                        </Formik>
                    </Grid>
                </Grid>

            </Container>
        </ThemeProvider>
    );
}