import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Formik, Form, Field } from 'formik';
import signupSchema from '../schemas/signupSchema';
import { FormHelperText } from '@mui/material';
import axios from "axios";
import { SERVER_HOST } from "../constants.js";
import { useState,useContext,useEffect } from 'react';
import { LoggedInUserContext } from './Authenticator';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const theme = createTheme();

export default function SignUp() {
    const [open, setOpen] =useState(false);
    const [msg, setMsg] =useState("");
    const [severity, setSeverity] =useState("");
    const initialSignupValues = { firstName: '', lastName: '', email: '', password: '' };
    const {authChecker}=useContext(LoggedInUserContext);

    useEffect(() => {
        authChecker()
    // eslint-disable-next-line
    }, [])
    


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
    const handleSignUp = async (data) => {
        try {
            const result = await axios.post(`${SERVER_HOST}/signup`, data)
            debugger
            if (result.data.exist) {
                setOpen(true);
                setMsg("User Already Exists");
                setSeverity("error");
            } else {
                setOpen(true);
                setMsg("Sign Up Successfull");
                setSeverity("success");
                
            }
        } catch (e) {
            debugger
            console.log(`error ${e}`);
            setOpen(true);
            setMsg(e);
        }

    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <Snackbar anchorOrigin={{horizontal:'center',vertical:'top'}} open={open} autoHideDuration={3500} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                        {msg}
                    </Alert>
                </Snackbar>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box sx={{ mt: 3 }}>
                        <Formik
                            initialValues={initialSignupValues}
                            validationSchema={signupSchema}
                            onSubmit={handleSignUp}>
                            {
                                (props) => {
                                    return (
                                        <Form noValidate>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm={6}>
                                                    <Field as={TextField} autoComplete="given-name"
                                                        name="firstName"
                                                        required
                                                        fullWidth
                                                        id="firstName"
                                                        label="First Name"
                                                        autoFocus
                                                    />
                                                    <FormHelperText error={true} sx={{ mb: 2 }}>{props.errors.firstName}</FormHelperText >

                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Field as={TextField}
                                                        required
                                                        fullWidth
                                                        id="lastName"
                                                        label="Last Name"
                                                        name="lastName"
                                                        autoComplete="family-name"
                                                    />
                                                    <FormHelperText error={true} sx={{ mb: 2 }}>{props.errors.lastName}</FormHelperText >
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Field as={TextField}
                                                        required
                                                        fullWidth
                                                        id="email"
                                                        label="Email Address"
                                                        name="email"
                                                        autoComplete="email"
                                                    />
                                                    <FormHelperText error={true} sx={{ mb: 2 }}>{props.errors.email}</FormHelperText >
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Field as={TextField}
                                                        required
                                                        fullWidth
                                                        name="password"
                                                        label="Password"
                                                        type="password"
                                                        id="password"
                                                        autoComplete="new-password"
                                                    />
                                                    <FormHelperText error={true} sx={{ mb: 2 }}>{props.errors.password}</FormHelperText >
                                                </Grid>

                                            </Grid>
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2 }}
                                            >
                                                Sign Up
                                            </Button>
                                        </Form>

                                    )
                                }
                            }

                        </Formik>
                        <Grid container justifyContent="flex-end">
                            <Grid item>

                                <Link to="/login" >
                                    Already have an account? Sign in
                                </Link>

                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}