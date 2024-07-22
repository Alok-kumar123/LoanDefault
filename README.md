# Loan Default Predictor

The Loan Default Predictor is a web application designed to help financial institutions assess the likelihood of loan defaults. By leveraging machine learning algorithms, this application provides accurate predictions based on various borrower and loan attributes.

## Features

- **Accurate Predictions:** Utilizes a GradientBoostingClassifier model, fine-tuned through hyperparameter optimization, to ensure high accuracy.
- **User-Friendly Interface:** Built with React for a responsive and intuitive user experience.
- **Real-Time Processing:** Employs FastAPI to handle prediction requests efficiently.
- **Comprehensive Inputs:** Considers multiple features including age, income, loan amount, credit score, employment status, and more.

## Technologies Used

- **Frontend:** React, Material-UI
- **Backend:** FastAPI, Scikit-learn
- **Model Training:** Scikit-learn, Pandas, NumPy
- **Deployment:** Uvicorn for serving the FastAPI app

## Getting Started

### Prerequisites

- **Node.js**: Ensure Node.js is installed for running the React app.
- **Python**: Required for running the FastAPI server and model training scripts.

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Alok-kumar/LoanDefault.git
   cd loan-default-predictor
