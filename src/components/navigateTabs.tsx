import { useContext, useEffect, useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./App";

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
  }
  return tab;
}

interface NavTebsProp {
  idTab: number;
  onLogOut: () => void;
}

export function NavigateTabs({ idTab, onLogOut }: NavTebsProp) {
  const [value, setValue] = useState(idTab);
  const navigate = useNavigate();
  const user = useContext(UserContext);

  useEffect(() => {
    setValue(idTab);
  }, [idTab]);

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
        user.userEmail.length === 0 ? navigate("/signup") : onLogOut();
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
            sx={
              user.userEmail.length === 0 || !user.isAdmin
                ? { display: "none" }
                : {}
            }
            // disabled={user.userEmail.length === 0 || !user.isAdmin}
            icon={<AddCircleOutlineOutlinedIcon />}
            iconPosition="start"
            label="Add new film"
          />
          <Tab
            icon={
              user.userEmail.length === 0 ? (
                <LoginOutlinedIcon />
              ) : (
                <LogoutIcon />
              )
            }
            iconPosition="start"
            sx={{ marginLeft: "auto" }}
            label={user.userEmail.length === 0 ? "Login" : "Logout"}
          />
        </Tabs>
      </Box>
    </>
  );
}
