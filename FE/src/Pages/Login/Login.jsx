import "./Login.scss";
import Container from "@mui/material/Container";
import logo from "../../Assets/Logos/logo.svg";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";


export default function Login() {
    const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)

  const handleLogin = (e) => {
    if(email === "admin" && password === "admin"){
        navigate("/clients")
    }else{
        setError(true)
    }
  }

  return (
    <div className="LoginContainer">
      <Container className="EmailPassContainer">
        <img src={logo} alt="" className="LogoLogin" />
        <h5>Sign in to Client Manager</h5>
        <div className="LoginInputs">
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}

              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <Button className="LoginButton" onClick={handleLogin} fullWidth>
            Login
          </Button>
          {error && <h5 className="ErrorMessage">Wrong email or password</h5>}
        </div>
      </Container>
    </div>
  );
}
