import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import { useSnackbar } from "notistack";
import { setAvatarRoute } from "../utils/api";
import Lottie from "lottie-react";
import loading from "../assets/loading.json";

const SetAvator = () => {
  const api = "https://api.multiavatar.com/123456";
  const navigater = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectAvatar] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigater("/login");
    }
  }, []);

  const fetchProfileAvators = async () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(
        `${api}/${Math.round(Math.random() * 1000)}`
      );
      const buffer = new Buffer(image.data);
      data.push(buffer.toString("base64"));
    }
    setAvatars(data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchProfileAvators();
  }, []);

  const { enqueueSnackbar } = useSnackbar();

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      enqueueSnackbar("Please select an avatar !", {
        variant: "error",
        preventDuplicate: true,
      });
    } else {
      const user = await JSON.parse(localStorage.getItem("user"));
      axios
        .post(`${setAvatarRoute}/${user._id}`, {
          image: avatars[selectedAvatar],
        })
        .then(({ data }) => {
          console.log({ data });
          if (data.user) {
            user.isAvatarImageSet = true;
            user.avatarImage = data.image;
            localStorage.setItem("user", JSON.stringify(user));
            navigater("/");
          }
        })
        .catch(({ response }) => {
          enqueueSnackbar("Error setting avatar: please try again !", {
            variant: "error",
            preventDuplicate: true,
          });
        });
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      mt="200px"
      gap={1}
    >
      {isLoading ? (
        <Lottie animationData={loading} />
      ) : (
        <>
          <Typography>Avatar</Typography>
          <Typography>Pick an avator as your profile picture</Typography>
          <Box display="flex" justifyContent="center" gap={2}>
            {avatars.map((avatar, i) => {
              return (
                <Box
                  key={i}
                  sx={{
                    cursor: "pointer",
                  }}
                  onClick={() => setSelectAvatar(i)}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    style={{
                      height: "80px",
                      border: selectedAvatar === i ? "3px solid #33ABDE" : "",
                      borderRadius: "50%",
                      padding: "2px",
                    }}
                  />
                </Box>
              );
            })}
          </Box>
          <Button variant="contained" onClick={() => setProfilePicture()}>
            Set as Profile
          </Button>
        </>
      )}
    </Box>
  );
};

export default SetAvator;
