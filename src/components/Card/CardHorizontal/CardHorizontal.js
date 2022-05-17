/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import NoImage from '../../../assets/images/noImage.jpg';
import { deleteCollection } from '../../../features/collections/collectionsSlice';

const CardHorizontal = ({ data }) => {
  const linkTo = `/collection/${data.id}`;
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();

  const length = data.list.length;
  const collectionExist = length > 0;

  const showConfirm = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };
  const handleDelete = id => {
    setOpenDialog(false);
    console.log('sudah terdelete', id);
    dispatch(deleteCollection(id));
  };

  return (
    <div css={card}>
      <div css={imageContainer}>
        <Link to={linkTo}>
          {collectionExist ? (
            <img
              css={image}
              src={data.list[length - 1].coverImage.medium}
              alt="cover image"
            />
          ) : (
            <img css={image} src={NoImage} alt="cover image" />
          )}
        </Link>
      </div>
      <Link to={linkTo} css={cardContainer}>
        <div css={infoContainer}>
          <Link to={linkTo} className="nameLink">
            {data.title}
          </Link>
        </div>
      </Link>
      <Button
        size="small"
        color="error"
        variant="text"
        onClick={() => showConfirm()}
      >
        <span>Delete</span>
      </Button>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Delete'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this collection?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleDelete(data.id)} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const card = css`
  border-radius: 3px;
  display: flex;
  min-height: 72px;
  justify-content: space-between;
  background-color: white;
  transition: all 0.3s linear;
  box-shadow: 0 14px 30px rgba(black, 0.15), 0 4px 4px rgba(black, 0.05);
`;

const imageContainer = css`
  display: flex;
  margin-right: 16px;
`;

const image = css`
  width: 54px;
  height: 100%;
  vertical-align: middle;

  animation: opacity 0.3s;

  @include breakpoint(md) {
    width: 48px;
  }
`;

const cardContainer = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-decoration: none;

  @include breakpoint(md) {
    justify-content: space-between;
    flex-direction: row;
  }
`;

const infoContainer = css`
  display: flex;
  flex: 1;
  align-items: center;

  .nameLink {
    color: black;
    // font-weight: 500;
    // margin-bottom: 8px;
    font-size: 14px;

    display: block;
    text-decoration: none;

    &:hover {
      color: #48b151;
    }
  }
`;

export default CardHorizontal;
