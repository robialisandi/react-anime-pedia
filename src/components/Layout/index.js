/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { css } from '@emotion/react';
import { Link, Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Box, IconButton } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '../Drawer';
import NavBar from '../NavBar';

const AppLayout = () => {
  const browseItems = [
    { label: 'Home', linkTo: '/' },
    { label: 'Collections', linkTo: '/collections' },
  ];
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMobileDrawerOpen = Boolean(mobileMoreAnchorEl);
  const mobileDrawerId = 'mobile drawer';

  const handleMobileDrawerOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleMobileDrawerClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const renderMobileDrawer = (
    <Drawer
      browseItems={browseItems}
      open={isMobileDrawerOpen}
      onClose={handleMobileDrawerClose}
    />
  );

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" css={header}>
          <Toolbar>
            <Link to="/" css={logo}>
              <span>ANIME</span>
            </Link>
            <Box sx={{ flexGrow: 1 }} />
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                flexGrow: 1,
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <NavBar items={browseItems} />
              </Box>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileDrawerId}
                aria-haspopup="true"
                onClick={handleMobileDrawerOpen}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileDrawer}
      </Box>
      <div css={container}>
        <Outlet />
      </div>
      <div>Footer</div>
    </>
  );
};

const header = css`
  padding: 0 calc((100% - 1200px) / 2);

  // background-color: rgba(255, 255, 255, 0.97);
  background-color: black;
  height: 60px;
  box-shadow: 0 0.0625rem 0.125rem 0 rgb(0 0 0 / 7%);
`;

const logo = css`
  text-decoration: none;
  color: #5add65;
`;
const container = css`
  max-width: 1300px;
  min-height: 100vh;
  width: 85%;
  margin: 0 auto 50px auto;

  /* tablet */
  @media (min-width: 640px) and (max-width: 800px) {
    width: 90%;
  }
  /* mobile */
  @media (max-width: 640px) {
    width: 92%;
  }
`;

export default AppLayout;
