
import { BASE_URL } from "../utils/baseUrl";
import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`${BASE_URL}/assets/${image}`} />

        </Box>
    )
}


export default UserImage;
//user image represents the dp or the profile picture 