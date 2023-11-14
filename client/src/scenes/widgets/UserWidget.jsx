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
  };