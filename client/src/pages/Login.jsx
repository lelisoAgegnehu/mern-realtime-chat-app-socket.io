import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import { loginRoute } from "../utils/api";
import { useSnackbar } from "notistack";

function Login() {
  const navigater = useNavigate();
  const [values, setValues] = useState({
    userName: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigater("/");
    }
  }, []);
  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { userName, password } = values;
    axios
      .post(loginRoute, {
        userName,
        password,
      })
      .then(({ data }) => {
        if (data) {
          localStorage.setItem("user", JSON.stringify(data?.user));
          navigater("/");
        }
      })
      .catch(({ response }) => {
        console.log({ response });
        enqueueSnackbar(response?.data?.msg, {
          variant: "error",
          preventDuplicate: true,
        });
      });
  };
  const theme = useTheme();
  return (
    <Box
      sx={{ flexGrow: 1 }}
      color={theme.palette.secondary.light}
      bgcolor={theme.palette.primary.dark}
    >
      <Grid container height="100vh">
        <Grid item xs={12} md={6}>
          <Box component="img" src="bg.png" width="100%" height="100%" />
        </Grid>
        <Grid item xs={12} md={6}>
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
            <Box>
              <Form onSubmit={handleSubmit}>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  gap={2}
                >
                  <TextField
                    id="username"
                    name="userName"
                    label="UserName"
                    onChange={(e) => handleEventChange(e)}
                  />
                  <TextField
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    onChange={(e) => handleEventChange(e)}
                  />
                  <Button variant="contained" type="submit">
                    Submit
                  </Button>
                </Box>
              </Form>
            </Box>
            <Box>
              <Typography>
                Don`t have an account? <Link to="/register">Sign Up</Link>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Login;
