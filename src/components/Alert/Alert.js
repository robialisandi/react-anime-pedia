import { Fragment, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function CustomizedSnackbars({
  isOpen,
  onHandleClose,
  message,
}) {
  // const handleClose = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }
  //   setOpen(false);
  // };

  const action = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={onHandleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={onHandleClose}
      message={message}
      action={action}
    />
  );
}
