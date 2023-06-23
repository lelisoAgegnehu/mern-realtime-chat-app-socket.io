import { Box, Typography, useTheme } from "@mui/material";

export const Welcome = ({ currentUser }) => {
  const theme = useTheme();
  return (
    <Box
      color={theme.palette.secondary.light}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box display="flex" justifyContent="center" alignItems="center">
        <img height="200rem" src="robotDance.gif" alt="Rebot" />
      </Box>
      <Box>
        <Typography variant="h2">
          Welcome,
          <em>
            <strong> {currentUser.userName}</strong>
          </em>
        </Typography>
        <h3>Please, select a chat to Start Messaging .</h3>
      </Box>
    </Box>
  );
};
