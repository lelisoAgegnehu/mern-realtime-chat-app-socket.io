import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { registerRoute } from "../utils/api";

function Register() {
  const navigater = useNavigate();
  const [values, setValues] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { enqueueSnackbar } = useSnackbar();

  const handleValidation = () => {
    const { userName, email, password, confirmPassword } = values;
    if (password.length < 5) {
      enqueueSnackbar("Password is too short!", {
        variant: "error",
        preventDuplicate: true,
      });
      return false;
    } else if (password != confirmPassword) {
      enqueueSnackbar("Password is not match!", {
        variant: "error",
        preventDuplicate: true,
      });
      return false;
    } else if (userName.length < 3) {
      enqueueSnackbar("UserName is too short !", {
        variant: "error",
        preventDuplicate: true,
      });
      return false;
    } else if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      enqueueSnackbar("Invalid email !", {
        variant: "error",
        preventDuplicate: true,
      });
      return false;
    } else {
      return true;
    }
  };
  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { userName, email, password } = values;
      axios
        .post(registerRoute, {
          userName,
          email,
          password,
        })
        .then(({ data }) => {
          if (data) {
            localStorage.setItem("user", JSON.stringify(data?.user));
            navigater("/");
          }
        })
        .catch(({ response }) => {
          enqueueSnackbar(response?.data?.msg, {
            variant: "error",
            preventDuplicate: true,
          });
        });
    }
  };

  const theme = useTheme();
  return (
    <Box
      sx={{ flexGrow: 1 }}
      color={theme.palette.secondary.light}
      bgcolor={theme.palette.primary.dark}
    >
      <Grid container height="100vh">
        <Grid item xs={12} md={6} sm={12}>
          <Box component="img" src="bg.png" width="100%" height="100%" />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            gap={2}
            height="100%"
          >
            <Box component="img" src="logo.png" height="100px" />
            <Box fontWeight="bold" fontSize="20px">
              Keawa
            </Box>
            <Box>We serve our users</Box>
            <Box>
              <Form onSubmit={handleSubmit}>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  gap={2}
                >
                  <TextField
                    id="username"
                    name="userName"
                    label="Username"
                    onChange={(e) => handleEventChange(e)}
                  />

                  <TextField
                    id="email"
                    name="email"
                    label="Email"
                    onChange={(e) => handleEventChange(e)}
                  />
                  <TextField
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    onChange={(e) => handleEventChange(e)}
                  />
                  <TextField
                    id="confirma-password"
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    onChange={(e) => handleEventChange(e)}
                  />

                  <Button fullWidth variant="contained" type="submit">
                    Create User
                  </Button>
                </Box>
              </Form>
            </Box>
            <Box>
              <Typography>
                Have an account? <Link to="/login">Sign In</Link>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Register;
