//this is for like share 
import { ChatBubbleOutline, 
    FavoriteBorderOutlined,
     FavoriteOutlined, 
     ShareOutlined } from "@mui/icons-material";

     import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
     import FlexBetween from "../../components/FlexBetween";
     import Friend from "../../components/Friend";
     import WidgetWrapper from "../../components/WidgetWrapper";
     import { useState } from "react";
     import { useDispatch, useSelector } from "react-redux";
     import { setPost } from "../../state";

    likes = {
        "userid1": true,
        "userid2": true
    }

const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
  }) => {
    //this determines we have opened comments list or not will keep this false
    const {isComments, setIsComments} = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;


    //colors
    const { palette } = useTheme();
    // const primaryLight = palette.primary.light;
    // const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const primary = palette.neutral.main;

    //count number of likes
    const patchLike = async () => {
        const response = await fetch(`${BASE_URL}/posts/${postId}/like`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: loggedInUserId }),
        });

        //respone return the updated post

        const updatedPosst = await response.json();
        dispatch(setPost({ post: updatedPosst }));
    } ;

    return(
        <WidgetWrapper m="2rem 0">
            <Friend 
                friendId={postUserId}
                name={name}
                subtitle={location}
                userPicturePath={userPicturePath}
            />
            <Typography color={main} sx={{ mt: "1rem"}}>
                {description}
            </Typography>
            {picturePath && (
                <img 
                    width="100%"
                    height="auto"
                    alt="post"
                    style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                    src={`${BASE_URL}/assets/${picturePath}`}
                />
            )}
            <FlexBetween mt="0.5rem">
                <FlexBetween gap="1rem">
                    <FlexBetween gap="0.3rem"> 
                        {/*determine someone has been liked or not */}
                        <IconButton onClick={patchLike}>
                            {isLiked ? (
                                <FavoriteOutlined sx={{ color: primary}} />
                            ) : (
                                <FavoriteOutlined />
                            )}
                        </IconButton>
                        <Typography>{likeCount}</Typography>
                    </FlexBetween>
                    <FlexBetween gap="0.3rem">
                       
                    </FlexBetween>
                </FlexBetween>
            </FlexBetween>
        </WidgetWrapper>
    )
  }

  export default PostWidget;