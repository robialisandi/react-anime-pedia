import { Fragment } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function CustomizedSnackbars({
  isOpen,
  onHandleClose,
  message,
}) {
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
