import React from 'react';
import { Button, CircularProgress } from '@mui/material';

interface Props {
  submitFormHandler: (e: React.FormEvent) => Promise<void>;
  editUserLoading: boolean;
}

const EditButton: React.FC<Props> = ({ submitFormHandler, editUserLoading }) => {
  return (
    <Button
      onClick={submitFormHandler}
      variant="contained"
      size="small"
      sx={{ mt: 1 }}
      disabled={editUserLoading}
      startIcon={editUserLoading ? <CircularProgress size={16} color="inherit" /> : null}
    >
      {editUserLoading ? 'Сохранение...' : 'Сохранить'}
    </Button>
  );
};

export default EditButton;
