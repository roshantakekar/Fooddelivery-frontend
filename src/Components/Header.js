import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { LoggedInUserContext } from './Authenticator';
import CustomBadges from './CustomBadges';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router-dom";


const pages = [];
//const settings = [<Link to='/profile'>Profile</Link>,<Link to="/logout" onClick={logout}>Logout</Link>];

function Header() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate = useNavigate();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const { loggedIn, authChecker,userLoggedData,userCartData } = useContext(LoggedInUserContext);
    console.log('uuuuuuuuuuuuuu',userCartData);

    async function logout() {
        sessionStorage.setItem('atoken', null);
        // eslint-disable-next-line
        const xx=await authChecker();
        navigate("/");

    }
    console.log("uld",userLoggedData)





    return (
        <AppBar position="fixed" sx={{ backgroundColor: '#A87301' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <FastfoodIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap

                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <Link to='/' style={{ textDecoration: 'none', color: '#ffffff' }}>FOOD DELIVERY</Link>
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                            <MenuItem>
                                <Typography textAlign="center"><Link to="/signup" style={{ color: '#000000', textDecoration: 'none' }}>Signup</Link></Typography>
                            </MenuItem>
                            <MenuItem>
                                <Typography textAlign="center"><Link to="/login" style={{ color: '#000000', textDecoration: 'none' }}>Login</Link></Typography>
                            </MenuItem>



                        </Menu>
                    </Box>
                    <FastfoodIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <Link to='/' style={{ textDecoration: 'none', color: '#ffffff' }}>FOOD DELIVERY</Link>
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                        <Button sx={{ my: 2, color: 'white', display: 'block' }}><Link to="/signup" style={{ color: 'white', textDecoration: 'none' }}>Signup</Link></Button>
                        <Button sx={{ my: 2, color: 'white', display: 'block' }}><Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link></Button>
                    </Box>


                    <Box sx={{ flexGrow: 0 }}>



                        {loggedIn &&
                            <>
                                <Box component="span" mr={4}> 
                                <Link to="/cartdetails"><CustomBadges items={userCartData&&userCartData.length}><ShoppingCartIcon sx={{ color: 'white',fontSize:'2rem' }}/></CustomBadges></Link>
                                </Box>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt={userLoggedData.firstName} src="/static/images/avatar/2.jpg" />
                                    </IconButton>
                                </Tooltip>
                            </>}
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >

                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">Profile</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserMenu}>
                                    <Link to="/yourOrders" style={{textDecoration:'none',color:'#000000'}} ><Typography textAlign="center" >Your Orders</Typography></Link>
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center" onClick={logout}>Logout</Typography>
                            </MenuItem>

                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Header;
