import { IconButton } from "@mui/material";
import React from "react";
import { OutlinedInput } from "@mui/material";
import { InputLabel } from "@mui/material";
import { InputAdornment } from "@mui/material";
import { FormControl } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";
import "./Login.css";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  registerError,
  registerLoading,
  registerSuccess,
} from "../../Features/Register/actions";
// import { Header } from "../Home/Header";
// import { Footer } from "../Home/Footer";

export const Register = () => {
  const [form, setForm] = useState({});
  const [email, setEmail] = useState(true);
  const [fName, setfName] = useState(true);
  const [lName, setlName] = useState(true);
  const [password, setPassword] = useState(true);

  const { loading, register, error } = useSelector((state) => ({
    loading: state.registerState.loading,
    register: state.registerState.register,
    error: state.registerState.error,
  }));

  const dispatch = useDispatch();

  const handlerRegisterChange = ({ target: { name, value } }) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (!form.email.match("[a-z0-9]+@[a-z]+.[a-z]{2,3}")) {
      setEmail(false);
    } else if (form.first_name.length < 1) {
      setfName(false);
    } else if (form.last_name.length < 1) {
      setlName(false);
    } else if (form.password.length < 6) {
      setPassword(false);
    } else {
      dispatch(registerLoading());
      fetch("/register", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((d) => d.json())
        .then((res) => {
          dispatch(registerSuccess(true));
        })
        .catch((err) => {
          dispatch(registerError());
        });
    }
  };

  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setForm({ ...form, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  if (register) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div>
      {/* <Header /> */}
      <div className="formReg">
        <div className="staticTextOne">Create Account</div>

        <div className="inforCard">
          <img src="credit-card.png" alt="#" />
          <div>Check out faster</div>
        </div>

        <div className="inforCard">
          <img src="delivery-truck.png" alt="#" />
          <div>Track orders easily</div>
        </div>

        <div className="inforCard">
          <img src="cloud.png" alt="#" />
          <div>Use one sign-in across our brands</div>
        </div>

        <FormControl
          size="medium"
          sx={{ m: "auto", mt: "20px", mb: "10px", width: "350px" }}
          variant="outlined"
          error={email === false}
        >
          <InputLabel
            htmlFor="outlined-adornment-password"
            sx={{ fontSize: "12px" }}
          >
            Email
          </InputLabel>
          <OutlinedInput
            label="Email"
            sx={{ fontSize: "12px" }}
            name="email"
            onChange={handlerRegisterChange}
          />
        </FormControl>

        <FormControl
          size="medium"
          sx={{ m: "auto", mt: "10px", mb: "10px", width: "350px" }}
          variant="outlined"
          error={fName === false}
        >
          <InputLabel
            htmlFor="outlined-adornment-password"
            sx={{ fontSize: "12px" }}
          >
            First name
          </InputLabel>
          <OutlinedInput
            label="First name"
            sx={{ fontSize: "12px" }}
            name="first_name"
            onChange={handlerRegisterChange}
          />
        </FormControl>

        <FormControl
          size="medium"
          sx={{ m: "auto", mt: "10px", mb: "10px", width: "350px" }}
          variant="outlined"
          error={lName === false}
        >
          <InputLabel
            htmlFor="outlined-adornment-password"
            sx={{ fontSize: "12px" }}
          >
            Last name
          </InputLabel>
          <OutlinedInput
            label="Last name"
            sx={{ fontSize: "12px" }}
            name="last_name"
            onChange={handlerRegisterChange}
          />
        </FormControl>

        <FormControl
          size="medium"
          sx={{ m: "auto", mt: "10px", mb: "10px", width: "350px" }}
          variant="outlined"
          error={password === false}
        >
          <InputLabel
            htmlFor="outlined-adornment-password"
            sx={{ fontSize: "12px" }}
          >
            Password
          </InputLabel>
          <OutlinedInput
            sx={{ fontSize: "12px" }}
            id="outlined-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  size="small"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

        <div className="staticTextTwo">
          By creating an account, you agree to our Privacy Policy and Terms &
          Conditions.
        </div>

        <button onClick={handleSubmit} className="signInButton">
          Create Account
        </button>

        <div className="staticTextTwo">
          Already have an account?
          <Link to={"/login"}>Login here</Link>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};
