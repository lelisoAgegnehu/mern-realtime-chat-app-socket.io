import { Box, Divider, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

export const Contacts = ({ changeChat, contacts, currentUser }) => {
  console.log(contacts, currentUser);
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const theme = useTheme();
  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.userName);
      setCurrentUserImage(currentUser.avatarImage);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <Box width="20%" color={theme.palette.secondary.light} flexWrap="wrap">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        m={1}
        gap={1}
      >
        <Box>
          <img
            src="logo.png"
            alt="avatar"
            style={{
              height: "30px",
              borderRadius: "50%",
            }}
          />
        </Box>
        <Box color={theme.palette.secondary.light}>
          <h3>Kewa</h3>
        </Box>
      </Box>
      <Divider
        sx={{
          mx: 2,
        }}
      />
      {currentUserImage && currentUserName && (
        <Box m={2}>
          <Box gap={3}>
            {contacts &&
              contacts.map((contact, index) => {
                console.log({ contact });
                return (
                  <Box
                    key={index}
                    display="flex"
                    alignItems="center"
                    bgcolor={
                      currentSelected === index
                        ? theme.palette.primary.main
                        : theme.palette.background.default
                    }
                    gap={1}
                    mb={1}
                    sx={{
                      cursor: "pointer",
                      ":hover": {
                        bgcolor: theme.palette.primary.main,
                      },
                    }}
                    onClick={() => changeCurrentChat(index, contact)}
                  >
                    <Box>
                      <img
                        src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                        alt="avatar"
                        style={{
                          height: "50px",
                          borderRadius: "50%",
                          padding: "2px",
                        }}
                      />
                    </Box>
                    <Box color={theme.palette.secondary.light}>
                      <h3>{contact.userName}</h3>
                    </Box>
                  </Box>
                );
              })}
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Box>
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
                style={{
                  height: "50px",
                  borderRadius: "50%",
                  padding: "2px",
                }}
              />
            </Box>
            <Box color={theme.palette.secondary.light}>
              <h3>{currentUserName}</h3>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};
