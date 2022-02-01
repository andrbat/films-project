import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import { film } from "../types/type";
import "./App.css";
import { testfilms } from "./films";
import Home from "./home";

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
  const [value, setValue] = React.useState(0);
  const [films, setFilms] = React.useState<film[]>([]);

  React.useEffect(() => setFilms(testfilms), []);

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: any
  ) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Home" />
          <Tab label="+ Add new film" />
          <Tab label="... ..." />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Home curFilms={films} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
}

export default App;
