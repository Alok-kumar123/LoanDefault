from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from pydantic import BaseModel
from sklearn.preprocessing import MinMaxScaler
import pickle
import pandas as pd
import sklearn


file_name='classifier.pkl'
with open(file_name,'rb') as file:
    model=pickle.load(file)

f_name="Scaler.pkl"
with open(f_name,'rb') as f:
    scaler=pickle.load(f)

class loanApp(BaseModel):
    Age:int
    Income:int
    LoanAmount:int
    CreditScore:int
    MonthsEmployed:int
    NumCreditLines:int 
    InterestRate:float
    LoanTerm:int  
    DTIRatio:float
    Education:object 
    EmploymentType:object 
    MaritalStatus:object 
    HasMortgage:object 
    HasDependents:object 
    LoanPurpose:object 
    HasCoSigner:object

def preProcess(data):
    col_replace=['HasMortgage','HasDependents','HasCoSigner']
    for col in col_replace:
        data[col]=data[col].replace({'Yes':1,'No':0})
    data['Education']=data['Education'].replace({"High School":0,"Bachelor's":1,"Master's":2,"PhD":3})
    data['EmploymentType']=data['EmploymentType'].replace({'Unemployed':0,'Part-time':1,"Self-employed":2,"Full-time":3})
    data['MaritalStatus']=data['MaritalStatus'].replace({'Divorced':0,'Single':1,'Married':2})
    data['LoanPurpose']=data['LoanPurpose'].replace({'Other':0,'Auto':1,'Business':2,'Home':3,'Education':4})
    
    data=scaler.transform(data)
    
    return data

app=FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "https://loan-default-client.vercel.app/"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins="https://loan-default-client.vercel.app/",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/predict')
async def loan_default(loan:loanApp):
    try:
        data=pd.DataFrame([loan.model_dump()])
        data=preProcess(data)
        y_pred=model.predict(data)
        proba=model.predict_proba(data)

        return JSONResponse(content={"pred":int(y_pred[0]),"prob":proba[0].tolist()})
    except Exception as e:
         return JSONResponse(content={"error":str(e)},status_code=500)
    

if __name__=="__main__":
    uvicorn.run(app,host="0.0.0.0",port=8000)


