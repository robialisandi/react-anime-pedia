/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';

const Component = ({ isMobile, items }) => {
  if (isMobile) {
    return (
      <>
        {items.map(item => (
          <MenuItem key={item.label}>
            <Link to={item.linkTo} css={linkStyle}>
              <p>{item.label}</p>
            </Link>
          </MenuItem>
        ))}
      </>
    );
  }

  return (
    <>
      {items.map(item => (
        <Link to={item.linkTo} css={linkStyle} key={item.label}>
          <IconButton size="large" aria-label={item.label} color="inherit">
            <p css={label}>{item.label}</p>
          </IconButton>
        </Link>
      ))}
    </>
  );
};

const linkStyle = css`
  text-decoration: none !important;
  opacity: 0.8;
  transition: all 0.3s;
  margin: 0 2px;
  color: white;

  &:hover,
  &.active {
    color: #5add65;
    opacity: 1;
  }
`;
const label = css`
  font-size: 14px;
  font-weight: 600;
  margin-left: 2px;
`;
export default Component;
