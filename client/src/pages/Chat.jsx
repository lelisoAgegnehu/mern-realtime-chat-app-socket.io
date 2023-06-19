import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Chat() {
  const navigater = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigater("/login");
    }
  }, []);
  return <div>Chat</div>;
}

export default Chat;
