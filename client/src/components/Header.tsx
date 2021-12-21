import { Container, AppBar, ButtonGroup, Button, Toolbar, Box, IconButton, MenuItem } from '@material-ui/core';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import { Typography } from '@mui/material';
import { useState } from 'react';


interface Props {
    pages: string[];
    loggedIn: boolean;
}

const loginOrRegisterBtns = (
    <ButtonGroup variant="contained">
        <Button
            color="default"
            variant="contained"
        >
            Login
        </Button>
        <Button color="secondary" variant="contained">
            Register
        </Button>
    </ButtonGroup>
);

const Header: React.FC<Props> = ({ pages, loggedIn }) => {

    const [navAnchor, setNavAnchor] = useState<null | HTMLElement>(null);

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
                                        onClick={handleCloseNavMenu}
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
                                    color="inherit">
                                    {page}
                                </Button>
                            ))}
                        </Box>
                        <Box sx={{ flexGrow: 0 }}>
                            {loggedIn ? null : loginOrRegisterBtns}
                        </Box>
                    </Toolbar>
                    {/* <ButtonGroup variant="contained">
                            <Button color="primary" variant="contained">Login</Button>
                            <Button color="secondary" variant="contained">Register</Button>
                        </ButtonGroup> */}
                </Container>
            </AppBar>
        </header >
    );
};

export default Header;