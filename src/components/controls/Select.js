import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { InputBase } from "@mui/material";
import { useTheme } from "@mui/material/styles";

/* Muchas de estas "opciones" puede que esten por gusto.  Solo me las copie
 * del ejemplo de Mui.  Cuidado al modificar */
const StyledInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    // display: "none",
    marginTop: theme.spacing(2),
    color: theme.palette.primary.main,
  },
  "& .MuiInputBase-input": {
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "18px",
    border: ".4px solid #BBBBBB30",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderRadius: "18px",
    },
  },
}));

export default function Select(props) {
  const theme = useTheme();

  const {
    name,
    label,
    value,
    error = null,
    onChange,
    options,
    variant,
    ...other
  } = props;
  return (
    <FormControl
      sx={{
        "& .MuiInputLabel-root": {
          color: theme.palette.primary.light,
          fontWeight: "500",
          fontSize: 17,
          transform: "translate(1px, -8px) scale(1)",
        },
      }}
      variant={variant || "outlined"}
      {...(error && { error: true })}
    >
      <InputLabel id="PR-customized-select-label" mb={3}>
        {label}
      </InputLabel>

      <MuiSelect
        labelId="PR-customized-select-label"
        input={<StyledInput />}
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        hover={false}
        defaultValue="" // NO USAR
        sx={{
          borderRadius: "18px",
          boxShadow: " 0px 3px 3px rgba(0, 0, 0, 0.25)",
          borderColor: "hsl(0, 0%, 0%, 0)",
          "& fieldset": {
            borderColor: "hsl(0, 0%, 0%, 0)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: " hsl(0, 0%, 0%, 0)",
          },
          "&:hover": {
            "&& fieldset": {
              border: "0.5px solid #BBBBBB30",
            },
          },
        }}
        disableUnderline
        {...other}
      >
        {options.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            <Box display="flex" alignItems="center" ml={2}>
              {item.icon}
              {item.nombre || item.title}
            </Box>
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
