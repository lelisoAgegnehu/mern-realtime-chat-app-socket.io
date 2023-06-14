import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Form, Link } from "react-router-dom";

function Register() {
  const [values, setValues] = useState({
    userName: "",
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
    <Box sx={{ flexGrow: 1 }} height="100vh">
      <Grid container>
        <Grid item xs={12} md={6} sm={12}>
          <Box component="img" src="bg.png" width="100%" height="100vh" />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
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
                    name="username"
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
