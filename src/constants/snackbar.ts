import { SnackbarProps } from "../interfaces/snackbar";

export const DEFAULT_SNACKBAR_STATE: SnackbarProps = { 
    showSnackbar: false,
    message: '',
    displayDuration: 0,
    closeSnackbar: () => {}
};