export interface SnackbarProps {
    showSnackbar: boolean;
    displayDuration: number;
    message: string;
    closeSnackbar: () => void;
}