import React from 'react';
import { Box, Typography, IconButton, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/system';

const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const ModalContent = styled(Box)({
  padding: '20px',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  position: 'relative',
  width: '400px',
  textAlign: 'center',
});

const ProbabilityModal = ({ open, onClose, probability }) => {
  return (
    <StyledModal open={open} onClose={onClose}>
      <ModalContent>
        <IconButton
          onClick={onClose}
          style={{ position: 'absolute', top: '10px', right: '10px' }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="h2">
          Probability of Default
        </Typography>
        <Typography variant="h4" component="p" style={{ marginTop: '20px' }}>
          {probability ? `${(probability * 100).toFixed(2)}%` : 'N/A'}
        </Typography>
      </ModalContent>
    </StyledModal>
  );
};

export default ProbabilityModal;
