//this is for like share 
import { Chat, ChatBubbleOutline, 
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
     import { BASE_URL } from "../../utils/baseUrl";

  
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
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

    //colors
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;

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
                        {/*opening the comments and checking comments */}
                        <IconButton onClick={() => setIsComments(!isComments) }>
                          <ChatBubbleOutline />
                        </IconButton>
                        {/*determines number of comments as well */ }
                        <Typography> {comments.length} </Typography>
                    </FlexBetween>
                </FlexBetween>

                <IconButton>
                    <ShareOutlined />
                </IconButton>  

                {/* Displaying the acutal comments*/ }  
                </FlexBetween>
                {isComments && (
                    <Box mt="0.5rem">
                    {comments.map((comment, i) => (
                        <Box key={`${name}-${i}`}>
                        <Divider />
                        <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                            {comment}
                        </Typography>
                        </Box>
                    ))}
                    <Divider />
                    </Box>
                )}
            </WidgetWrapper>
    );
    };

export default PostWidget;