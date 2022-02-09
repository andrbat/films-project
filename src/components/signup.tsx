import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";

import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import DoNotDisturbAltOutlinedIcon from "@mui/icons-material/DoNotDisturbAltOutlined";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

export function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box component="form" noValidate autoComplete="off" sx={{ maxWidth: 400 }}>
      <div>
        <TextField
          fullWidth
          label="User Name"
          sx={{ marginBottom: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonAddAltOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          label="Password"
          type={showPassword ? "text" : "password"}
          sx={{ marginBottom: 1 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          label="Email address"
          sx={{ marginBottom: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AttachFileOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <FormControlLabel control={<Checkbox />} label="agree" />
      <div className="films_buttons">
        <Button
          variant="outlined"
          size="medium"
          startIcon={<BookmarkAddedOutlinedIcon />}
        >
          Save
        </Button>
        <Button
          variant="outlined"
          size="medium"
          color="error"
          startIcon={<DoNotDisturbAltOutlinedIcon />}
        >
          Cancel
        </Button>
      </div>
    </Box>
  );
}
