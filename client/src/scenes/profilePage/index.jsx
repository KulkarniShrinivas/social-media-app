import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../../scenes/navbar";
import FriendListWidget from "../../scenes/widgets/FriendListWidget";
import PostsWidget from "./../widgets/PostsWidget";
import PostWidget from "../../scenes/widgets/PostWidget";
import UserWidget from "../../scenes/widgets/UserWidget";
import state from "../../state";
import { BASE_URL } from "../../utils/baseUrl";
import MyPostWidget from "../../scenes/widgets/MyPostWidget";



const ProfilePage = () => {
    //in this case we need to set user specific state
    const [user, setUser] = useState(null);
    //getting userId specific user profile will set the id before moving to another profile
    const { userId } = useParams();
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    //getting user information of the page
    const getUser = async () => {
        const response = await fetch(`${BASE_URL}/users/${userId}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
    
        const data = await response.json();
        setUser(data);
      };

        useEffect(() => {
            getUser();
          }, []); // eslint-disable-line react-hooks/exhaustive-deps
        
          if (!user) return null;
    
          return (
            <Box>
              <Navbar />
              <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="2rem"
                justifyContent="center"
              >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                  <UserWidget userId={userId} picturePath={user.picturePath} />
                  <Box m="2rem 0" />
                  <FriendListWidget userId={userId} />
                </Box>
                <Box
                  flexBasis={isNonMobileScreens ? "42%" : undefined}
                  mt={isNonMobileScreens ? undefined : "2rem"}
                >
                  <MyPostWidget picturePath={user.picturePath} />
                  <Box m="2rem 0" />
                  <PostsWidget userId={userId} isProfile />
                </Box>
              </Box>
            </Box>
          );
        };
    
        
export default ProfilePage;