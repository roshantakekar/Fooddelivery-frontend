//import logo from './logo.svg';
import './App.css';
import { Grid, createTheme, ThemeProvider } from "@mui/material";
import Header from './Components/Header';
import Home from './Components/Home';
import Footer from './Components/Footer';
import Signup from './Components/Signup';
import Login from './Components/Login';
import CartDetails from './Components/CartDetails';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Authenticator from './Components/Authenticator';
import ConfirmOrder from './Components/ConfirmOrder';
import Account from './Components/Account';
import YourOrders from './Components/YourOrders';

function App() {
  

  


  const theme = createTheme({
    typography: {
      fontFamily: [
        'Mukta'
      ].join(','),
    },
  });

  
  return (
    <Authenticator>
    <ThemeProvider theme={theme}>
      <Router>
        <Grid container style={{ height: '100vh'}}>
          <Grid item xs={12}>
            <Header />
          </Grid>
          <Grid item xs={12} pt={8}>

            <Routes>
              <Route element={<Home />} path="/"></Route>
              <Route element={<Signup />} path="/signup"></Route>
              <Route element={<Login />} path="/login"></Route>
              <Route element={<Account />} path="/account"></Route>
              <Route element={<CartDetails />} path="/cartdetails"></Route>
              <Route element={<ConfirmOrder />} path="/confirmOrder"></Route>
              <Route element={<YourOrders />} path="/yourOrders"></Route>
              
              
            </Routes>

          </Grid>
          <Grid item  xs={12}>
            <Footer />
          </Grid>
        </Grid>
      </Router>
    </ThemeProvider>
    </Authenticator>
  );
}

export default App;
