import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import state, { setFriends } from "../state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { useNavigate } from "react-router-dom";


const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {_id } = useSelector((state) => state.use);
    const token = useSelector((state) => state.token);
    //grab friends from useSelector
    const friends = useSelector((state) => state.user.friends);


    //colors
    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;


    //check if user is a friend we want to show icon that they can remove a friend 
    //if they are not a friend we can add them as friend icon

    const  isFriend = friends.find((friend) => friend._id === friendId);

    //make api call wheter they gona add friend or not 

    const patchFriend = async () => {
        const response = await fetch(`${BASE_URL}/users/${_id}/${friendId}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        dispatch(setFriends({ friends: data }));
    };

    return (
        <FlexBetween>
            <FlexBetween gap="1rem">
                <UserImage image={userPicturePath} size="55px" />
                <Box
                    onClick={() => {
                        navigate(`/profile/${friendId}`);
                        //basicaly it will go to next user page and refreshes the page 
                        navigate(0);
                    }}
                >
                    <Typography
                        color={main}
                        variant="h5"
                        fontWeight="500"
                        sx={{
                            "&:hover": {
                                color: palette.primary.light,
                                cursor: "pointer"
                            }
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography color={medium} fontSize="0.75rem">
                        {subtitle}
                    </Typography>
                </Box>
            </FlexBetween>
            <IconButton
                onClick={() => patchFriend()}
                sx={{ backgroundColor: primaryLight, p: "0.6rem"}}
            >
                {/*if he is a friend we gona add icon personremove outlined*/} 
                {isFriend ? (
                    <PersonRemoveOutlined sx={{ color: primaryDark}} />
                ) : (
                    <PersonAddOutlined sx={{ color: primaryDark}} />
                )}

            </IconButton>
        </FlexBetween>
    )

}

export default Friend;