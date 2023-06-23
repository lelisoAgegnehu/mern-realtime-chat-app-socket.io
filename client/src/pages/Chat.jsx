import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { allUserRoute } from "../utils/api";
import { Box, useTheme } from "@mui/material";
import { Contacts } from "./Contacts";
import { Welcome } from "./Welcome";
import ChatContainer from "./ChatContainer";

function Chat() {
  const [currentUser, setCurrentUser] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const navigater = useNavigate();
  const theme = useTheme();
  useEffect(() => {
    async function getUserInfo() {
      if (!localStorage.getItem("user")) {
        navigater("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("user")));
      }
    }
    getUserInfo();
  }, []);

  useEffect(() => {
    async function setUserInfo() {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          axios.get(`${allUserRoute}/${currentUser._id}`).then(({ data }) => {
            setContacts(data.users);
          });
          setIsLoading(true);
        } else {
          navigater("/setAvatar");
        }
      }
    }
    setUserInfo();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt="10vh">
      <Box bgcolor={theme.palette.primary.dark} height="80vh" width="80vw">
        <Box display="flex">
          <Contacts
            changeChat={handleChatChange}
            contacts={contacts}
            currentUser={currentUser}
          />
          {isLoading && currentChat === undefined ? (
            <Welcome currentUser={currentUser} />
          ) : (
            <ChatContainer currentChat={currentChat} />
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Chat;
