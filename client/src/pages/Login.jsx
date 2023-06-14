import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Form, Link } from "react-router-dom";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Box component="img" src="bg.png" width="100vh" height="100vh" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            gap={2}
            height="100vh"
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
