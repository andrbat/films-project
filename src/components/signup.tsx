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
import { iuser } from "../types/type";
import { fetchUser, pushUser } from "./data/data";
import { addNotify } from "./notyfy";
import { useDispatch } from "react-redux";
import { actionSetUser } from "../store/user/userActions";
import { useNavigate } from "react-router-dom";

const emptyU = { name: "", password: "", email: "", agree: false };

export function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [curUser, setCurUser] = useState<iuser>(emptyU);
  const [verify, setVerify] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handlerSave = () => {
    pushUser({
      name: curUser.name,
      email: curUser.email,
      password: curUser.password,
      isadmin: false,
    })
      .then((val) => {
        if (!val.email || val.email.length === 0) {
          addNotify("Wrong user!!!", true);
        } else {
          dispatch(actionSetUser(val.email, val.isadmin === "true"));
          navigate("/films");
          localStorage.setItem("token", val.token);
        }
      })
      .catch((e) => console.log("Request failed", e));
  };

  const handlerLogin = () => {
    fetchUser(login, password)
      .then((val) => {
        if (!val.email || val.email.length === 0) {
          addNotify("Wrong user or password!!!", true);
        } else {
          localStorage.setItem("token", val.token);
          dispatch(actionSetUser(val.email, val.isadmin === "true"));
          navigate("/films");
        }
      })
      .catch((e) => console.log("Request failed", e));
  };

  return (
    <Box component="form" noValidate autoComplete="off" sx={{ maxWidth: 400 }}>
      <div>
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
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          error={login.trim().length === 0}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={password.trim().length === 0}
        />
      </div>
      <div>
        <Button
          sx={{ marginBottom: 5 }}
          variant="outlined"
          size="medium"
          startIcon={<BookmarkAddedOutlinedIcon />}
          disabled={login.length === 0 || password.length === 0}
          onClick={() => handlerLogin()}
        >
          Login
        </Button>
      </div>
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
          onClick={() => handlerSave()}
        >
          Registration
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
