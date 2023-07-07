import { Box, Typography } from "@mui/material";

const ChatContainer = ({ currentChat }) => {
  console.log({ currentChat });
  return (
    currentChat && (
      <Box display="flex" alignItems="center" gap={1}>
        <Box>
          <img
            src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
            alt="avatar"
            style={{
              height: "50px",
              borderRadius: "50%",
              padding: "2px",
            }}
          />
        </Box>
        <Box>
          <Typography variant="body1" color="white">
            {currentChat.userName}
          </Typography>
        </Box>
      </Box>
    )
  );
};

export default ChatContainer;
