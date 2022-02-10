import { useContext, useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
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
}

export function NavigateTebs({ idTab }: NavTebsProp) {
  const [value, setValue] = useState(idTab);
  const navigate = useNavigate();
  const user = useContext(UserContext);

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
            icon={<LoginOutlinedIcon />}
            iconPosition="start"
            sx={{ marginLeft: "auto" }}
            label={user.length === 0 ? "Login" : "Singout"}
          />
        </Tabs>
      </Box>
    </>
  );
}
