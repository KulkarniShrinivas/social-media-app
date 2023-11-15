// this is left  part with small box

import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
  } from "@mui/icons-material";

  import { Box, Typography, Divider, useTheme } from "@mui/material";
  import UserImage from "../../components/UserImage";
  import FlexBetween from "../../components/FlexBetween";
  import WidgetWrapper from "../../components/WidgetWrapper";
  import { UseSelector, useSelector } from "react-redux";
  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
import state from "state";
import { BASE_URL } from "utils/baseUrl";

  const UserWidget = ({ userId, picturePath }) => {
    //this is how we are going to grab user from backend
    const [user, setUser] = useState();
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    //when we enter the home page we want to grab the user information so we gona call api to grab the info
    const getUser = async () => {
        const response = await fetch(`${BASE_URL}/users/${userId}`, 
        {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,}

        });

        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
      getUser();
    }, []) //eslint-disable-line react-hooks/exaustive-deps

    if(!user){
      return null;
    }

    const {
      firstName,
      lastName,
      location,
      occupation,
      viewedProfile,
      impressions,
      friends,

    } = user;

    return (
      //This is about the left widget under sections of profile first row and second row for example location, dp, social media handles
      <WidgetWrapper>
      {/* FIRST ROW */}
        <FlexBetween 
          gap="0.5rem"
          pb="1.1rem"
          onClick={() => navigate(`/profile/${userId}`)}
        >
          <FlexBetween gap="1rem">
            <UserImage image={picturePath} />
            <Box>
              <Typography 
                variant="h4"
                color={dark}
                fontWeight="500"
                sx= {{
                  "&:hover": palette.primary.light,
                  cursor:"pointer"
                }} >
                  {firstName} {lastName}
                </Typography>
                <Typography color={medium}>{friends.length} friends</Typography>
            </Box>

            <ManageAccountsOutlined />

          </FlexBetween>

        </FlexBetween>

      </WidgetWrapper>
    )
  };