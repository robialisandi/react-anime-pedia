/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { memo, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import AddIcon from '@mui/icons-material/Add';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useSelector } from 'react-redux';
import Dialog from '../Dialog';
import { allListCollections } from '../../features/collections/collectionsSlice';

const StyledMenu = styled(props => (
  <Menu
    color="#ffffff"
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const CustomizedMenus = ({
  title = 'Add Collection',
  onHandleClick,
  anime,
}) => {
  const { collects } = useSelector(state => state.collections);
  const allCollection = useSelector(allListCollections);
  console.log('allListCollections', allCollection);

  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        css={btnCollection}
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {title}
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {collects.map((item, index) => {
          const isDisabled = allCollection.some(el => {
            return el.idAnime === anime.id && el.idCollection === item.id;
          });

          console.log(
            `${index} ${item.title} ${item.id} =============== `,
            isDisabled,
            item.id,
            anime.id,
            anime?.title?.english
          );
          return (
            <MenuItem
              key={item.id}
              onClick={() => {
                onHandleClick({ id: item.id, data: anime });
                setAnchorEl(null);
              }}
              disableRipple
              disabled={isDisabled}
            >
              <CollectionsBookmarkIcon />
              {item.title}
            </MenuItem>
          );
        })}
        <Divider sx={{ my: 0.5 }} />
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            setOpenDialog(true);
          }}
          disableRipple
        >
          <AddIcon />
          Add new collection
        </MenuItem>
      </StyledMenu>
      <Dialog isOpen={openDialog} handleClose={() => setOpenDialog(false)} />
    </div>
  );
};

const btnCollection = css`
  background: #5add65;
  color: black;
  font-size: 12px;
  &:hover {
    background: black;
    color: #5add65;
  }
`;

export default memo(CustomizedMenus);
