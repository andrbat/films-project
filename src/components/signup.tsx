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
import { useEffect, useState } from "react";

interface iuser {
  name: string;
  password: string;
  email: string;
  agree: boolean;
}

const emptyU = { name: "", password: "", email: "", agree: false };

export function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [curUser, setCurUser] = useState<iuser>(emptyU);
  const [verify, setVerify] = useState(false);

  useEffect(() => {
    setVerify(
      curUser.name.trim().length > 0 &&
        curUser.password.trim().length > 0 &&
        curUser.email.trim().length > 0 &&
        curUser.agree
    );
  }, [curUser]);

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setCurUser({
      ...curUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeCheck = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setCurUser({
      ...curUser,
      [event.target.name]: event.target.checked,
    });
  };

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
          name="name"
          value={curUser.name}
          onChange={handleChange}
          error={curUser.name.trim().length === 0}
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
          name="password"
          value={curUser.password}
          onChange={handleChange}
          error={curUser.password.trim().length === 0}
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
          name="email"
          value={curUser.email}
          onChange={handleChange}
          error={curUser.email.trim().length === 0}
        />
      </div>
      <FormControlLabel
        control={
          <Checkbox
            checked={curUser.agree}
            onChange={handleChangeCheck}
            name="agree"
          />
        }
        label="agree"
      />
      <div className="curUsers_buttons">
        <Button
          variant="outlined"
          size="medium"
          startIcon={<BookmarkAddedOutlinedIcon />}
          disabled={!verify}
        >
          Save
        </Button>
        <Button
          variant="outlined"
          size="medium"
          color="error"
          startIcon={<DoNotDisturbAltOutlinedIcon />}
          onClick={() => setCurUser(emptyU)}
        >
          Cancel
        </Button>
      </div>
    </Box>
  );
}
