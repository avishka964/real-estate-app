import { useState } from 'react';
import Link from 'next/link';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import classes from './MainNavigation.module.css';

function MainNavigation() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href='/'>Real Estate Inc</Link>
      </div>
      <nav>
        <IconButton
          id='basic-button'
          aria-controls='basic-menu'
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <MenuIcon
            sx={{
              color: '#FFFF',
            }}
          />
        </IconButton>
        <Menu
          id='basic-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose}><Link href='/' passHref>Home</Link></MenuItem>
          <MenuItem onClick={handleClose}><Link href='/search' passHref>Search</Link></MenuItem>
          <MenuItem onClick={handleClose}><Link href='/search?purpose=for-sale' passHref>Buy Property</Link></MenuItem>
          <MenuItem onClick={handleClose}><Link href='/search?purpose=for-rent' passHref>Rent Property</Link></MenuItem>

        </Menu>
      </nav>
    </header>
  );
}

export default MainNavigation;
