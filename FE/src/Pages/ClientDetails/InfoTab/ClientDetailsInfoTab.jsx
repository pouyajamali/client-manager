import "./ClientDetailsInfoTab.scss";
import { useState, useEffect } from "react";
import * as React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import ProfilePicture from "../../../Assets/Logos/heather_kent.svg";
import Button from "@mui/material/Button";
import { addClient, updateClient } from "../../../Apis/Clients";
import { useParams, useNavigate } from "react-router-dom";

function ClientDetailsInfoTab(values) {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    fullAddress: "",
  });
  const [errors, setErrors] = useState({
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    fullAddress: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhoneNumber = (phoneNumber) => {
    const re = /^[0-9]{10}$/;
    return re.test(String(phoneNumber));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = {};
    let isValid = true;

    if (!formData.fullName.trim()) {
      formErrors.fullName = "Full Name is required";
      isValid = false;
    }

    if (!formData.emailAddress.trim()) {
      formErrors.emailAddress = "Email Address is required";
      isValid = false;
    } else if (!validateEmail(formData.emailAddress)) {
      formErrors.emailAddress = "Invalid email format";
      isValid = false;
    }

    if (!formData.phoneNumber.trim()) {
      formErrors.phoneNumber = "Phone Number is required";
      isValid = false;
    } else if (!validatePhoneNumber(formData.phoneNumber)) {
      formErrors.phoneNumber = "Invalid phone number format";
      isValid = false;
    }

    if (!formData.fullAddress.trim()) {
      formErrors.fullAddress = "Full Address is required";
      isValid = false;
    }

    setErrors(formErrors);

    if (!isValid) {
      return;
    }

    if (clientId === "new") {
      const newClient = await addClient(formData);
      navigate(`/${newClient.id}`);
    } else {
      await updateClient(values.values.id, formData);
    }
  };

  useEffect(() => {
    setFormData({
      fullName: values?.values?.name,
      emailAddress: values?.values?.email,
      phoneNumber: values?.values?.phone,
      fullAddress: values?.values?.address,
    });
  }, [values]);

  return (
    <div className="TabContainer">
      <form onSubmit={handleSubmit} className="TabContainer">
        <div className="ProfileHeaderCard">
          <img
            src={ProfilePicture}
            alt="BrainFlix"
            className="ProfilePicture"
          />
          <div>
            <Typography fontSize={"50px"} fontWeight={700}>
              {formData.fullName}
            </Typography>
            <Typography color={"#ADADAD"}>June 7th, 1997</Typography>
          </div>
        </div>
        <Typography className="TextFieldHeader">Full Name:</Typography>
        <TextField
          className="InfoTextfield"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          error={!!errors.fullName}
          helperText={errors.fullName}
          required
        />
        <Typography className="TextFieldHeader">Email Address:</Typography>
        <TextField
          className="InfoTextfield"
          name="emailAddress"
          value={formData.emailAddress}
          onChange={handleInputChange}
          error={!!errors.emailAddress}
          helperText={errors.emailAddress}
          required
        />
        <Typography className="TextFieldHeader">Phone Number:</Typography>
        <TextField
          className="InfoTextfield"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber}
          required
        />
        <Typography className="TextFieldHeader">Full Address:</Typography>
        <TextField
          className="InfoTextfield"
          name="fullAddress"
          value={formData.fullAddress}
          onChange={handleInputChange}
          error={!!errors.fullAddress}
          helperText={errors.fullAddress}
          required
        />
        <Button type="submit" variant="contained" className="SubmitButton">
          Save Info
        </Button>
      </form>
    </div>
  );
}

export default ClientDetailsInfoTab;
