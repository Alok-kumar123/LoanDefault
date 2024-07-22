import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const AboutBox = styled(Box)({
  margin: '40px',
  padding: '16px',
  borderRadius: '8px',
  backgroundColor: '#ffffff',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const About = () => {
  return (
    <AboutBox>
      <Typography variant="h4" gutterBottom>
        About Loan Default Predictor
      </Typography>
      <Typography variant="body1" paragraph>
        The Loan Default Predictor is a powerful tool designed to help financial institutions assess the likelihood of loan defaults. 
        Using advanced machine learning techniques, this application provides accurate predictions based on a range of borrower and loan attributes.
      </Typography>
      <Typography variant="body1" paragraph>
        Our model utilizes the GradientBoostingClassifier, which has been fine-tuned through extensive hyperparameter optimization to ensure high accuracy 
        and robustness. Key features considered by the model include borrower age, income, loan amount, credit score, employment status, and more.
      </Typography>
      <Typography variant="body1" paragraph>
        This application is built with a modern web stack, featuring a React frontend for a responsive user interface and a FastAPI backend for efficient 
        processing of prediction requests. The backend leverages a trained machine learning model to provide real-time predictions and insights.
      </Typography>
      <Typography variant="body1" paragraph>
        Whether you are a loan officer, financial analyst, or simply interested in understanding the risk of loan defaults, this tool offers a user-friendly 
        interface and reliable predictions to support your decision-making process.
      </Typography>
    </AboutBox>
  );
};

export default About;
