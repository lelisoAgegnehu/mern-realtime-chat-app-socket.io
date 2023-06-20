import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { allUserRoute } from "../utils/api";

function Chat() {
  const [currentUser, setCurrentUser] = useState(null);
  const [contacts, setContacts] = useState([]);
  const navigater = useNavigate();
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
            setContacts[data.users];
          });
        } else {
          navigater("/setAvatar");
        }
      }
    }
    setUserInfo();
  }, [currentUser]);
  return <div>Chat</div>;
}

export default Chat;
