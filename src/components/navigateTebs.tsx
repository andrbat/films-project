import { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { useNavigate } from "react-router-dom";

export function idTabs(to: string) {
  let tab = 0;
  switch (to) {
    case "/":
      tab = 0;
      break;
    case "/films":
      tab = 1;
      break;
    case "/addfilm":
      tab = 2;
      break;
    case "/signup":
      tab = 3;
      break;
    case "/login":
      tab = 4;
      break;
  }
  return tab;
}
interface NavTebsProp {
  idTab: number;
}

export function NavigateTebs({ idTab }: NavTebsProp) {
  const [value, setValue] = useState(idTab);
  const navigate = useNavigate();

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: any
  ) => {
    setValue(newValue);
    navigateTo(newValue);
  };

  function navigateTo(value: number) {
    switch (value) {
      case 0:
        navigate("/");
        break;
      case 1:
        navigate("/films");
        break;
      case 2:
        navigate("/addfilm");
        break;
      case 3:
        navigate("/signup");
        break;
      case 4:
        navigate("/login");
        break;
    }
  }

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab icon={<HomeOutlinedIcon />} iconPosition="start" label="Home" />
          <Tab
            icon={<SlideshowOutlinedIcon />}
            iconPosition="start"
            label="Films"
          />
          <Tab
            icon={<AddCircleOutlineOutlinedIcon />}
            iconPosition="start"
            label="Add new film"
          />
          <Tab
            icon={<LockOpenOutlinedIcon />}
            iconPosition="start"
            sx={{ marginLeft: "auto" }}
            label="Signup"
          />
          <Tab
            icon={<LoginOutlinedIcon />}
            iconPosition="start"
            label="Login"
          />
        </Tabs>
      </Box>
    </>
  );
}
