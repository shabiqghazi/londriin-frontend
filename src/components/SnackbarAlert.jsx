import React, { Fragment } from 'react'
import { Snackbar, Alert } from '@mui/material'
import { useSnackbar } from '../contex/snackbarContext';

const SnackbarAlert = () => {
  const {snackbarData, closeAlert}= useSnackbar();
  const handleClose = () => {
    closeAlert();
  }
  return (
    <Fragment>
    {snackbarData.isOpen === true ? (
      <Snackbar
        open={snackbarData.isOpen}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          variant="filled"
          severity={snackbarData.type}
          sx={{ width: "100%" }}
        >
          {snackbarData.message}
        </Alert>
      </Snackbar>
    ) : (
      ""
    )}
    </Fragment>
  )
}

export default SnackbarAlert