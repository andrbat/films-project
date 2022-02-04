import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import { ifilm } from "../types/type";
import "./App.css";
import { testfilms, uid } from "./arrfilms";
import Films from "./films";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import EditFilm from "./editFilm";

interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function App() {
  const [value, setValue] = React.useState(1);
  const [films, setFilms] = React.useState<ifilm[]>([]);

  React.useEffect(() => setFilms(testfilms), []);

  const handleDelete = (id: string) => {
    setFilms((oldF) => {
      return oldF.filter((e) => e.id !== id);
    });
  };

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: any
  ) => {
    setValue(newValue);
  };

  const handleAddEdit = (
    e: React.MouseEvent<HTMLButtonElement>,
    film: ifilm
  ) => {
    setFilms((oldF) => {
      const newF = [...oldF];
      const idx = newF.findIndex((e) => e.id === film.id);
      if (idx === -1) {
        newF.push(film);
      } else {
        newF[idx].img = film.img;
        newF[idx].title = film.title;
        newF[idx].director = film.director;
        newF[idx].duration = film.duration;
        newF[idx].price = film.price;
        newF[idx].description = film.description;
      }
      return newF;
    });
  };

  return (
    <Box sx={{ maxWidth: "1400px", width: "100%", margin: "auto" }}>
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
            label="Singup"
          />
          <Tab
            icon={<LoginOutlinedIcon />}
            iconPosition="start"
            label="Login"
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Home Item
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Films
          curFilms={films}
          onDelete={handleDelete}
          onEdit={handleAddEdit}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <EditFilm
          onNew={handleAddEdit}
          initVal={{
            id: uid(),
            title: "",
            director: "",
            duration: 0,
            price: -1,
            img: "",
            featured: false,
            description: "",
          }}
        />
      </TabPanel>
    </Box>
  );
}

export default App;
