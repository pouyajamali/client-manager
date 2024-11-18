import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import FilledInput from "@mui/material/FilledInput";
import InputAdornment from "@mui/material/InputAdornment";
import Autocomplete from "@mui/material/Autocomplete";

import "./CreateNewDocument.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { LocalizationProvider, DateField } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { DateTime } from "luxon";
const steps = ["Step 1", "Step 2", "Step 3"];
const factors = ["Income", "Life Style", "Growing Liquid Assets"];

export default function CreateNewDocument() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [generalInfo, setGeneralInfo] = React.useState({
    policyName: "",
    date: DateTime.now(),
    owner: "",
    insured: "",
  });
  const [InsuredSameAsOwner, setInsuredSameAsOwner] = React.useState(true);
  const [termPolicyYearAmount, setTermPolicyYearAmount] = React.useState([
    {
      years: null,
      amount: null,
      // , yearsOther: null
    },
  ]);
  const [currentPolicyYearAmount, setCurrentPolicyYearAmount] = React.useState({
    years: null,
    amount: null,
  });
  const [customerExistingPlans, setCustomerExistingPlans] =
    React.useState(false);
  const CompanyNames = ["Equitable Life", "Fidelity", "IA"];
  const navigate = useNavigate();
  const location = useLocation();
  const { values } = location.state || {};
  const PolicyTypes = {
    PermanentLife: "pl",
    TermLife: "tl",
  };
  const PermLifeSubtype = {
    WholeLife: "Whole Life",
    UniversalLife: "Universal Life",
  };
  const RetirementStrategy = {
    IFA: "IFA",
    IRP: "IRP",
  };
  const [selectedPolicyType, setSelectedPolicyType] = React.useState(
    PolicyTypes.PermanentLife
  );

  const [plSubType, setPlsubtype] = React.useState("");
  const [retirementStrategy, setRetirementStrategy] = React.useState("");
  const [plAmount, setPlAmount] = React.useState(0);
  const [fna, setFna] = React.useState(0);
  const [cashflow, setCashflow] = React.useState(0);
  const [monthlyContrib, setMonthlyContrib] = React.useState(0);
  const [contributionPeriod, setContributionPeriod] = React.useState(0);
  const [ror, setRor] = React.useState(0);
  const [surrenderPeriod, setSurrenderPeriod] = React.useState(0);

  const handlePolicyType = (event) => {
    setSelectedPolicyType(event.target.value);
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCancel = () => {
    navigate(`/${values.id}`);
  };

  const handleDone = () => {
    const policyData = {
      generalInfo: {
        ...generalInfo,
        insured: InsuredSameAsOwner && generalInfo.owner,
      },
      policyInfo: {
        policyType: selectedPolicyType,
        plSubType,
        plAmount,
        tl: termPolicyYearAmount,
        FNA: fna,
        cashflow,
        monthlyContrib,
      },
    };
    console.log(policyData);
    navigate(`/${values.id}`);
  };

  const handleTermLifeAdd = () => {
    if (currentPolicyYearAmount.amount && currentPolicyYearAmount.years) {
      setTermPolicyYearAmount([
        ...termPolicyYearAmount,
        currentPolicyYearAmount,
      ]);
      setCurrentPolicyYearAmount({ amount: null, years: null });
    }
  };

  return (
    <div className="Wizard">
      <Stepper activeStep={activeStep} className="DocumentStepper">
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleDone}>Done</Button>
          </Box>
        </>
      ) : (
        <>
          {activeStep === 0 ? (
            <div className="FieldContainer">
              <TextField
                id="outlined-required"
                label="Policy"
                variant="filled"
                className="TwoColumnSpan"
                value={generalInfo.policyName}
                onChange={(e) =>
                  setGeneralInfo((prevState) => ({
                    ...prevState,
                    policyName: e.target.value,
                  }))
                }
              />
              <LocalizationProvider dateAdapter={AdapterLuxon}>
                <DateField
                  label="Date"
                  id="outlined-required"
                  variant="filled"
                  className="TwoColumnSpan"
                  format="DD"
                  renderInput={(params) => <TextField {...params} />}
                  value={generalInfo.date}
                  onChange={(e) =>
                    setGeneralInfo((prevState) => ({
                      ...prevState,
                      date: e.target.value,
                    }))
                  }
                />
              </LocalizationProvider>
              <TextField
                id="filled-required"
                label="Owner"
                variant="filled"
                defaultValue={values.name}
                className="TwoColumnSpan"
                value={generalInfo.owner}
                onChange={(e) =>
                  setGeneralInfo((prevState) => ({
                    ...prevState,
                    owner: e.target.value,
                  }))
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    checked={InsuredSameAsOwner}
                    onChange={(e) => {
                      setInsuredSameAsOwner(e.target.checked);
                    }}
                  />
                }
                label="Insured same as the Owner"
                className="TwoColumnSpan"
              />
              <TextField
                id="outlined-required"
                label="Insured"
                variant="filled"
                value={generalInfo.insured}
                onChange={(e) =>
                  setGeneralInfo((prevState) => ({
                    ...prevState,
                    insured: e.target.value,
                  }))
                }
                className={`TwoColumnSpan ${
                  InsuredSameAsOwner ? "hidden" : ""
                }`}
              />
            </div>
          ) : activeStep === 1 ? (
            <div className="FieldContainer">
              <FormControl className="TwoColumnSpan">
                <FormLabel className="CompanyLabel">
                  Product Offered by
                </FormLabel>
                <FormControl fullWidth variant="filled">
                  <InputLabel>Company Name</InputLabel>
                  <Select
                    value={plSubType}
                    label="Company Name"
                    onChange={(e) => {
                      setPlsubtype(e.target.value);
                    }}
                  >
                    {CompanyNames.map((company) => (
                      <MenuItem value={company}>{company}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </FormControl>
              <FormControl className="TwoColumnSpan">
                <FormLabel>Policy Type</FormLabel>
                <RadioGroup row name="row-radio-buttons-group">
                  <FormControlLabel
                    checked={selectedPolicyType === PolicyTypes.PermanentLife}
                    onChange={handlePolicyType}
                    value={PolicyTypes.PermanentLife}
                    control={<Radio />}
                    label="Permanent Life"
                  />
                  <FormControlLabel
                    checked={selectedPolicyType === PolicyTypes.TermLife}
                    onChange={handlePolicyType}
                    value={PolicyTypes.TermLife}
                    control={<Radio />}
                    label="Term Life"
                  />
                </RadioGroup>
              </FormControl>

              {selectedPolicyType === PolicyTypes.PermanentLife ? (
                <>
                  <FormControl fullWidth variant="filled">
                    <InputLabel>Sub-type</InputLabel>
                    <Select
                      value={plSubType}
                      label="Sub-type"
                      onChange={(e) => {
                        setPlsubtype(e.target.value);
                      }}
                    >
                      <MenuItem value={PermLifeSubtype.WholeLife}>
                        {PermLifeSubtype.WholeLife}
                      </MenuItem>
                      <MenuItem value={PermLifeSubtype.UniversalLife}>
                        {PermLifeSubtype.UniversalLife}
                      </MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth variant="filled">
                    <InputLabel htmlFor="filled-adornment-amount">
                      Amount
                    </InputLabel>
                    <FilledInput
                      type="number"
                      value={plAmount}
                      onChange={(e) => {
                        setPlAmount(e.target.value);
                      }}
                      id="filled-adornment-amount"
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                    />
                  </FormControl>

                  {plSubType === PermLifeSubtype.WholeLife && (
                    <FormControl
                      fullWidth
                      variant="filled"
                      className="TwoColumnSpan"
                    >
                      <InputLabel>Retirement Strategy</InputLabel>
                      <Select
                        value={retirementStrategy}
                        onChange={(e) => {
                          setRetirementStrategy(e.target.value);
                        }}
                      >
                        <MenuItem value={RetirementStrategy.IFA}>
                          {RetirementStrategy.IFA}
                        </MenuItem>
                        <MenuItem value={RetirementStrategy.IRP}>
                          {RetirementStrategy.IRP}
                        </MenuItem>
                      </Select>
                    </FormControl>
                  )}

                  {plSubType === PermLifeSubtype.UniversalLife && (
                    <>
                      <FormControl
                        fullWidth
                        variant="filled"
                        className="TwoColumnSpan"
                      >
                        <TextField
                          label="Contribution Period (Years)"
                          variant="filled"
                          value={contributionPeriod}
                          type="number"
                          onChange={(e) => {
                            setContributionPeriod(e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormControl
                        fullWidth
                        variant="filled"
                        className="TwoColumnSpan"
                      >
                        <InputLabel htmlFor="filled-adornment-amount">
                          Rate of Return
                        </InputLabel>
                        <FilledInput
                          onChange={(e) => {
                            setRor(e.target.value);
                          }}
                          value={ror}
                          id="filled-adornment-amount"
                          startAdornment={
                            <InputAdornment position="start">%</InputAdornment>
                          }
                        />
                      </FormControl>
                      <FormControl
                        fullWidth
                        variant="filled"
                        className="TwoColumnSpan"
                      >
                        <TextField
                          label="Surrender Charge Period (Years)"
                          variant="filled"
                          value={surrenderPeriod}
                          type="number"
                          onChange={(e) => {
                            setSurrenderPeriod(e.target.value);
                          }}
                        />
                      </FormControl>
                    </>
                  )}
                </>
              ) : (
                <>
                  {termPolicyYearAmount?.map((item, index) => (
                    <>
                      <Autocomplete
                        disabled={index > 0}
                        freeSolo
                        options={[10, 20, 25, 30].map((option) =>
                          option.toString()
                        )}
                        getOptionLabel={(option) => option.toString()}
                        value={
                          index > 0
                            ? item.years?.toString() || ""
                            : currentPolicyYearAmount.years?.toString() || ""
                        }
                        inputValue={
                          index > 0
                            ? item.years?.toString() || ""
                            : currentPolicyYearAmount.years?.toString() || ""
                        }
                        onInputChange={(e, newInputValue) => {
                          setCurrentPolicyYearAmount({
                            ...currentPolicyYearAmount,
                            years: newInputValue,
                          });
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Number of Years"
                            variant="filled"
                            type="number"
                          />
                        )}
                      />

                      <div className="RemoveTermContainer">
                        <FormControl
                          fullWidth
                          variant="filled"
                          disabled={index > 0}
                        >
                          <InputLabel htmlFor="filled-adornment-amount">
                            Amount
                          </InputLabel>
                          <FilledInput
                            onChange={(e) => {
                              setCurrentPolicyYearAmount({
                                ...currentPolicyYearAmount,
                                amount: e.target.value,
                              });
                            }}
                            value={
                              index > 0
                                ? item.amount?.toString() || ""
                                : currentPolicyYearAmount.amount?.toString() ||
                                  ""
                            }
                            id="filled-adornment-amount"
                            startAdornment={
                              <InputAdornment position="start">
                                $
                              </InputAdornment>
                            }
                          />
                        </FormControl>

                        {index > 0 && (
                          <Button
                            onClick={(e) => {
                              let temp = [...termPolicyYearAmount];
                              temp.splice(index, 1);
                              setTermPolicyYearAmount(temp);
                            }}
                            className="CancelButton"
                          >
                            X
                          </Button>
                        )}
                      </div>
                    </>
                  ))}

                  <div> </div>
                  <div className="AddBtnContainer">
                    <Button onClick={handleTermLifeAdd} className="NextButton">
                      Add
                    </Button>
                  </div>
                </>
              )}

              <FormControl fullWidth variant="filled" className="TwoColumnSpan">
                <InputLabel htmlFor="filled-adornment-amount">
                  FNA Amount
                </InputLabel>
                <FilledInput
                  type="number"
                  value={fna}
                  onChange={(e) => {
                    setFna(e.target.value);
                  }}
                  id="filled-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                />
              </FormControl>
              <FormControl fullWidth variant="filled" className="TwoColumnSpan">
                <InputLabel htmlFor="filled-adornment-amount">
                  Cashflow
                </InputLabel>
                <FilledInput
                  type="number"
                  value={cashflow}
                  onChange={(e) => {
                    setCashflow(e.target.value);
                  }}
                  id="filled-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                />
              </FormControl>
              <FormControl fullWidth variant="filled" className="TwoColumnSpan">
                <InputLabel htmlFor="filled-adornment-amount">
                  Monthly Contribution
                </InputLabel>
                <FilledInput
                  type="number"
                  value={monthlyContrib}
                  onChange={(e) => {
                    setMonthlyContrib(e.target.value);
                  }}
                  id="filled-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                />
              </FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    checked={customerExistingPlans}
                    onChange={(e) => {
                      setCustomerExistingPlans(e.target.checked);
                    }}
                  />
                }
                label="Customer has existing plans"
                className="TwoColumnSpan"
              />
            </div>
          ) : activeStep === 2 ? (
            <div style={{display:'flex', flexDirection: 'column'}}>
              <FormLabel component="legend" sx={{ mt: 2, mb: 1, py: 1 }}>
                Factors accounted for in choosing the amount:
              </FormLabel>

              {factors.map((factor, index) => (
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label={factor}
                  key={index}
                />
              ))}
            </div>
          ) : (
            <>
              <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                Step {activeStep + 1}
              </Typography>{" "}
            </>
          )}

          <div className="NavigationButtonsContainer">
            <div>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Button
                // color="inherit"
                className="CancelButton"
                onClick={handleCancel}
                sx={{ mr: 1 }}
              >
                Cancel
              </Button>
            </div>
            <div>
              <Button onClick={handleNext} className="NextButton">
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
