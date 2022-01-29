import { Container, AppBar, ButtonGroup, Button, Toolbar, Box, IconButton, MenuItem } from '@material-ui/core';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';


interface Props {
    pages: string[];
}

const loginOrRegisterBtns = (
    <ButtonGroup variant="contained">
        <Button
            color="primary"
            variant="contained"
            component={Link}
            to="/login">Login
        </Button>
        <Button
            color="secondary"
            variant="contained"
            component={Link}
            to="signup">
            Register
        </Button>
    </ButtonGroup>
);

const Header: React.FC<Props> = ({ pages }) => {

    const [navAnchor, setNavAnchor] = useState<null | HTMLElement>(null);
    const { currentUser, setCurrentUser } = useAuth();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setNavAnchor(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setNavAnchor(null);
    };

    return (
        <header>
            <AppBar color="primary" position="static">
                <Container>
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        >
                            PromptIt
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="medium"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={navAnchor}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                                keepMounted
                                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                                open={Boolean(navAnchor)}
                                onClose={handleCloseNavMenu}
                                sx={{ display: { xs: 'block', md: 'none' } }}
                            >
                                {pages.map((page) => (
                                    <MenuItem
                                        key={page}
                                        component={Link}
                                        to={"/" + page.toLowerCase()}
                                    >
                                        <Typography align="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                        >
                            PromptIt
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    color="inherit"
                                    component={Link}
                                    to={page.toLowerCase()}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>
                        <Box sx={{ flexGrow: 0 }}>
                            {currentUser.username.length ? null : loginOrRegisterBtns}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </header >
    );
};

export default Header;