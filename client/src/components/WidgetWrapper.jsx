import { Box, styled } from "@mui/material";

const WidgetWrapper = styled(Box) (({ theme }) => ({
    //top right bottom left clockwise
    padding:  "1.5rem 1.5rem 0.75rem 1.5rem",
    backgroundColor: theme.palette.background.alt,
    borderRadius: "0.75rem"
}));

//this will wrap widget 

export default WidgetWrapper;

//this represents the whole styling of each widgets that are boxes present in the home page