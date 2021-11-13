import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Box
} from '@mui/material';

export default function ComfirmationDialog({ open, handleClose, title, content, yesText, yesCallback, noText, noCallback }) {

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <Box sx={{ padding: 2 }}>
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={noCallback}  >
                        {noText}
                    </Button>
                    <Button onClick={yesCallback} autoFocus>
                        {yesText}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
}