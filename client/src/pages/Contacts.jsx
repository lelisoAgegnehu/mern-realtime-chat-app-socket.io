import { Box } from "@mui/material";
import { useEffect, useState } from "react";

export const Contacts = ({ contacts, currentUser }) => {
  console.log(contacts, currentUser);
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.userName);
      setCurrentUserImage(currentUser.avatarImage);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {};
  return (
    <Box>
      {currentUserImage && currentUserName && (
        <Box>
          <Box>
            <span>Kewa</span>
          </Box>
          <Box>
            {contacts &&
              contacts.map((contact, index) => {
                console.log({ contact });
                return (
                  <Box key={index}>
                    <h3>{contact.userName}</h3>
                  </Box>
                );
              })}
          </Box>
        </Box>
      )}
    </Box>
  );
};
