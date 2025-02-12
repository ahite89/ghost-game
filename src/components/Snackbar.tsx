import { Box, Snackbar as MuiSnackbar } from "@mui/material";
import { SnackbarProps } from "../interfaces/snackbar";

export default function Snackbar({showSnackbar, displayDuration, message, closeSnackbar}: SnackbarProps) {
    const vertical = 'top';
    const horizontal = 'center';

    return (
        <Box sx={{ width: 500 }}>
          <MuiSnackbar
            anchorOrigin={{ vertical, horizontal }}
            open={showSnackbar}
            autoHideDuration={displayDuration}
            onClose={closeSnackbar}
            message={message}
            ContentProps={{sx: {backgroundColor: "rgb(218, 218, 218)", color: "black"}}}
            key={vertical + horizontal}
            sx={{
              "&.MuiSnackbar-root": { top: "13rem" }
            }}
          />
        </Box>
      );
}