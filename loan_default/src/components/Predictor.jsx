import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/system';
import ProbabilityModal from './ResultModal'; // Import the new Modal component

const StyledBox = styled(Box)({
  margin: '40px 40px 10px',
  padding: '16px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  '& .MuiTextField-root': {
    margin: '8px',
    width: '25ch',
  },
  '& .MuiFormControl-root': {
    margin: '8px',
    width: '25ch',
  },
});

const SpinnerWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh', // Full viewport height to center spinner vertically
});

const Predictor = () => {
  const [form, setForm] = useState({
    Age: 0,
    Income: 0,
    LoanAmount: 0,
    CreditScore: 0,
    MonthsEmployed: 0,
    NumCreditLines: 0,
    InterestRate: 0,
    LoanTerm: 0,
    DTIRatio: 0,
    Education: '',
    EmploymentType: '',
    MaritalStatus: '',
    HasMortgage: '',
    HasDependents: '',
    LoanPurpose: '',
    HasCoSigner: '',
  });

  const [valid, setValid] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [probability, setProbability] = useState(null);
  const [loading, setLoading] = useState(false); // New state for loading

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [id]: value,
    }));
    validateForm({ ...form, [id]: value });
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    validateForm({ ...form, [name]: value });
  };

  const validateForm = (form) => {
    const isValid = Object.values(form).every((value) => value !== '' && value !== 0);
    setValid(isValid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true
    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const result = await response.json();
      setProbability(result.prob[1]); // Assuming `result` contains `probability`
      setModalOpen(true);
    } catch (error) {
      console.error('Error fetching prediction:', error);
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      {loading ? (
        <SpinnerWrapper>
          <CircularProgress />
        </SpinnerWrapper>
      ) : (
        <>
          <Typography style={{ margin: '40px 40px 40px', fontSize: 45 }}>Loan Default Predictor</Typography>
          <StyledBox component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
            <div>
              <Tooltip title="The age of the borrower.">
                <TextField required id="Age" label="Age" type="number" value={form.Age} onChange={handleChange} />
              </Tooltip>
              <Tooltip title="The annual income of the borrower.">
                <TextField required id="Income" label="Income" type="number" value={form.Income} onChange={handleChange} />
              </Tooltip>
              <Tooltip title="The amount of money being borrowed.">
                <TextField required id="LoanAmount" label="Loan Amount" type="number" value={form.LoanAmount} onChange={handleChange} />
              </Tooltip>
              <Tooltip title="The credit score of the borrower, indicating their creditworthiness.">
                <TextField required id="CreditScore" label="Credit Score" type="number" value={form.CreditScore} onChange={handleChange} />
              </Tooltip>
            </div>
            <div>
              <Tooltip title="The number of months the borrower has been employed.">
                <TextField required id="MonthsEmployed" label="Months Employed" type="number" value={form.MonthsEmployed} onChange={handleChange} />
              </Tooltip>
              <Tooltip title="The number of credit lines the borrower has open.">
                <TextField required id="NumCreditLines" label="Number of Credit Lines" type="number" value={form.NumCreditLines} onChange={handleChange} />
              </Tooltip>
              <Tooltip title="The interest rate for the loan.">
                <TextField required id="InterestRate" label="Interest Rate" type="number" value={form.InterestRate} onChange={handleChange} />
              </Tooltip>
              <Tooltip title="The term length of the loan in months.">
                <TextField required id="LoanTerm" label="Loan Term" type="number" value={form.LoanTerm} onChange={handleChange} />
              </Tooltip>
            </div>
            <div>
              <Tooltip title="The Debt-to-Income ratio, indicating the borrower's debt compared to their income.">
                <TextField required id="DTIRatio" label="DTI Ratio" type="number" value={form.DTIRatio} onChange={handleChange} />
              </Tooltip>
              <FormControl required>
                <InputLabel id="Education-label">Education</InputLabel>
                <Select
                  labelId="Education-label"
                  id="Education"
                  name="Education"
                  value={form.Education}
                  onChange={handleSelectChange}
                >
                  <MenuItem value="High School">High School</MenuItem>
                  
                  <MenuItem value="Bachelor's">Bachelor's</MenuItem>
                  <MenuItem value="Master's">Master's</MenuItem>
                  <MenuItem value="PhD">Doctorate</MenuItem>
                </Select>
              </FormControl>
              <FormControl required>
                <InputLabel id="EmploymentType-label">Employment Type</InputLabel>
                <Select
                  labelId="EmploymentType-label"
                  id="EmploymentType"
                  name="EmploymentType"
                  value={form.EmploymentType}
                  onChange={handleSelectChange}
                >
                  <MenuItem value="Full-time">Full-time</MenuItem>
                  <MenuItem value="Part-time">Part-time</MenuItem>
                  <MenuItem value="Self-employed">Self-employed</MenuItem>
                  <MenuItem value="Unemployed">Unemployed</MenuItem>
                </Select>
              </FormControl>
              <FormControl required>
                <InputLabel id="MaritalStatus-label">Marital Status</InputLabel>
                <Select
                  labelId="MaritalStatus-label"
                  id="MaritalStatus"
                  name="MaritalStatus"
                  value={form.MaritalStatus}
                  onChange={handleSelectChange}
                >
                  <MenuItem value="Single">Single</MenuItem>
                  <MenuItem value="Married">Married</MenuItem>
                  <MenuItem value="Divorced">Divorced</MenuItem>
                   
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl required>
                <InputLabel id="HasMortgage-label">Has Mortgage</InputLabel>
                <Select
                  labelId="HasMortgage-label"
                  id="HasMortgage"
                  name="HasMortgage"
                  value={form.HasMortgage}
                  onChange={handleSelectChange}
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>
              <FormControl required>
                <InputLabel id="HasDependents-label">Has Dependents</InputLabel>
                <Select
                  labelId="HasDependents-label"
                  id="HasDependents"
                  name="HasDependents"
                  value={form.HasDependents}
                  onChange={handleSelectChange}
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>
              <FormControl required>
                <InputLabel id="LoanPurpose-label">Loan Purpose</InputLabel>
                <Select
                  labelId="LoanPurpose-label"
                  id="LoanPurpose"
                  name="LoanPurpose"
                  value={form.LoanPurpose}
                  onChange={handleSelectChange}
                >
                  <MenuItem value="Home">Home</MenuItem>
                  <MenuItem value="Auto">Car</MenuItem>
                  <MenuItem value="Education">Education</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl required>
                <InputLabel id="HasCoSigner-label">Has Co-Signer</InputLabel>
                <Select
                  labelId="HasCoSigner-label"
                  id="HasCoSigner"
                  name="HasCoSigner"
                  value={form.HasCoSigner}
                  onChange={handleSelectChange}
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>
            </div>
            <Box textAlign="center" marginTop="20px">
              <Button variant="contained" color="primary" type="submit" disabled={!valid}>
                Submit
              </Button>
            </Box>
          </StyledBox>
          <ProbabilityModal
            open={modalOpen}
            onClose={handleCloseModal}
            probability={probability}
          />
        </>
      )}
    </>
  );
};

export default Predictor;
