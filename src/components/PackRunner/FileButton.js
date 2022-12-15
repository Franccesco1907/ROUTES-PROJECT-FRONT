import { Alert, Typography } from "@mui/material";
import IconButton from "../controls/IconButton";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

export default function FileButton(props) {
  let { text, type, onClick, sx, ...other } = props;
  if (type === "addFile") {
    //Para los usuarios que carguen pedidos
    // text="Adjuntar Archivos"
    other.color = "adjuntar";
  }

  return (
    <Alert
      variant="filled"
      severity={type}
      action={
        <IconButton
          aria-label="close"
          size="small"
          onClick={onClick}
          sx={{
            mr: 0.2,
          }}
        >
          <FileDownloadOutlinedIcon sx={{ color: "#fff" }} />
        </IconButton>
      }
      sx={{
        pt: 0,
        pb: 0,
        minWidth: "140px",
        maxWidth: "250px",
        height: "40px",
        borderRadius: "20px",
        marginRight: "10px",
        marginY: "5px",
      }}
      {...other}
    >
      <Typography fontWeight="540" sx={{ color: "#fff" }}>
        {text}
      </Typography>
    </Alert>
  );
}
