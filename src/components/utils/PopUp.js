import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Controls } from "../controls/Controls";
import { PR } from "../PackRunner/PR";
import CloseIcon from "@mui/icons-material/Close";

export default function Popup(props) {
  const { title, children, openPopup, setOpenPopup, handleClose, size } = props;

  return (
    // Outer invisible box
    <Dialog
      open={openPopup}
      onClose={handleClose}
      maxWidth={size ? `${size}` : "lg"}
      fullWidth
      sx={{
        minHeight: "400px",
        "& .MuiDialog-paper": {
          p: 2,
          top: 5,
        },
      }}
    >
      <DialogTitle sx={{ paddingRight: 0 }}>
        <div style={{ display: "flex", alignItems: "flexStart" }}>
          <PR.Title size="big" text={title} sx={{ flexGrow: 1 }} />
          <Controls.ActionButton
            color="secondary"
            onClick={() => setOpenPopup(false)}
          >
            <CloseIcon />
          </Controls.ActionButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
}
