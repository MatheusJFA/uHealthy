import React from 'react';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide
} from '@material-ui/core';

import CustomButton from '../CustomButton';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props}/>;
});

function Modal({ title, onCancel, isOpen, form, actions }) {
  const handleClose = () => {
    onCancel && onCancel();
  };

  return (
    <Dialog
      maxWidth="md"
      fullWidth
      open={isOpen}
      onClose={handleClose}
      scroll="body"
      TransitionComponent={Transition}>
      <DialogTitle disableTypography className="bg-white text-red-500 text-2xl">
        {title}
      </DialogTitle>
      <DialogContent>{form}</DialogContent>
      <DialogActions>
        {actions &&
          actions.map((action) => (
            <CustomButton
              key={action.label}
              label={action.label}
              icon={action.icon}
              disable={action.disabled ?? false}
              onClick={action.action}
            />
          ))}
      </DialogActions>
    </Dialog>
  );
}


export default React.memo(Modal);
