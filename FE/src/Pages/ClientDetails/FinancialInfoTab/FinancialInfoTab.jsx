import { useState, useEffect } from "react";
import * as React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./FinancialInfoTab.scss";
import ExistingPlansCard from "../../../Components/PlansCard/PlansCard";
import DocumentCard from "../../../Components/DocumentCard/DocumentCard";

function FinancialInfoTab() {
  return (
    <div className="TabContainer">
      <Typography fontSize={"20px"} fontWeight={700}>
        Financial Info
      </Typography>
      <div className="FinancialInfoContainer">
        <Typography className="TextFieldHeader">Job Title</Typography>
        <TextField
          className="FinancialInfoTextfield"
          name="jobTitle"
          value="Software Engineer"
          // onChange={handleInputChange}
          // error={!!errors.fullName}
          // helperText={errors.fullName}
          required
        />

        <Typography className="TextFieldHeader">Company</Typography>
        <TextField
          className="FinancialInfoTextfield"
          name="company"
          value="Microsoft"
          // onChange={handleInputChange}
          // error={!!errors.fullName}
          // helperText={errors.fullName}
          required
        />
        <div className="FlexRow">
          <div className="FlexItem">
            <Typography className="TextFieldHeader">Salary</Typography>
            <TextField
              className="FinancialInfoTextfield SalaryField"
              name="salary"
              value="$90,000"
              // onChange={handleInputChange}
              // error={!!errors.fullName}
              // helperText={errors.fullName}
              required
            />
          </div>
          <div className="FlexItem">
            <Typography className="TextFieldHeader">
              Total Yearly Income
            </Typography>
            <TextField
              className="FinancialInfoTextfield"
              name="yearlyIncome"
              value="$120,000"
              // onChange={handleInputChange}
              // error={!!errors.fullName}
              // helperText={errors.fullName}
              required
            />
          </div>
        </div>

        <Typography className="TextFieldHeader">Tax Bracket</Typography>
        <TextField
          className="FinancialInfoTextfield"
          name="taxBracket"
          value="$70,000 - $130,000"
          // onChange={handleInputChange}
          // error={!!errors.fullName}
          // helperText={errors.fullName}
          required
        />
      </div>
      <div>
        <Typography fontSize={"20px"} fontWeight={700}>
          Existing Plans
        </Typography>
        <div className="ExistingPlansContainer">
          <ExistingPlansCard />
          <ExistingPlansCard />
        </div>
      </div>

      <div>
        <div className="NeedsAnalysisHeader">
          <Typography fontSize={"20px"} fontWeight={700}>
            Needs Analysis
          </Typography>
          <Button type="submit" variant="contained" className="CreateDocument">
            Create new document
          </Button>
        </div>

        <div className="ExistingPlansContainer">
          <DocumentCard />
        </div>

        <div className="ClientGoalsContainer">
          <Typography fontSize={"20px"} fontWeight={700}>
            Client Goals
          </Typography>
          <textarea
            className="ClientGoalsTextArea"
            value={
              "Financial independence by 2040. Family support in case of emergencies."
            }
          />
        </div>
        <div className="SaveButtonContainer">
          <Button type="submit" variant="contained" className="SaveButton">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FinancialInfoTab;
