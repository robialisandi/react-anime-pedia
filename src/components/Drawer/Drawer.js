/** @jsxImportSource @emotion/react */
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';

export default function Component({ browseItems, open, onClose }) {
  const [isOpen, setOpen] = React.useState(open);
  console.log(isOpen);
  const listItem = css`
    transition: all 0.3s;
    text-decoration: none;
    &:hover {
      color: $color-pr-1;
      transition: all 0.3s;
      div {
        transition: all 0.3s;
        color: $color-pr-1;
      }
    }
  `;

  const toggleDrawer = open => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpen(open);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {browseItems.map((item, index) => (
          <ListItem
            css={listItem}
            component={Link}
            to={item.linkTo}
            button
            key={item.label}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <Drawer anchor="right" open={open} onClose={onClose}>
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
