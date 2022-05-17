import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewCollection } from '../../features/collections/collectionsSlice';
import { FormHelperText } from '@mui/material';
import Alert from '../Alert';

const DialogAdd = ({ isOpen, handleClose }) => {
  const inputValue = useRef('');
  const dispatch = useDispatch();
  const [inputError, setInputError] = useState('');
  const [snackBar, setSnackBar] = useState(false);

  const error = inputError !== '';

  const AddNewCollection = () => {
    dispatch(addNewCollection(inputValue.current));
    handleClose();
    setSnackBar(true);
  };

  const checkInput = () => {
    if (inputValue.current === '') {
      setInputError('No name. No page ¯\\_(ツ)_/¯');
    } else {
      AddNewCollection();
    }
  };

  return (
    <>
      <Dialog open={isOpen} onClose={null}>
        <DialogTitle>Add New Collection</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter collection name</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Collection Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={e => (inputValue.current = e.target.value)}
            onKeyUp={e => (e.code === 'Enter' ? checkInput() : null)}
          />
          <FormHelperText error={error} id="component-error-text">
            {inputError}
          </FormHelperText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={checkInput}>Save</Button>
        </DialogActions>
      </Dialog>
      <Alert
        isOpen={snackBar}
        message="Collection has been created"
        onHandleClose={() => setSnackBar(false)}
      />
    </>
  );
};

export default DialogAdd;
