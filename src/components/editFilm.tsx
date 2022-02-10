import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, InputAdornment } from "@mui/material";
import TocOutlinedIcon from "@mui/icons-material/TocOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupsIcon from "@mui/icons-material/Groups";
import React from "react";
import { ifilm } from "../types/type";

import DoNotDisturbAltOutlinedIcon from "@mui/icons-material/DoNotDisturbAltOutlined";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";

interface EditFilmProps {
  onNew: (film: ifilm) => void;
  initVal: ifilm;
}

export default function EditFilm({ onNew, initVal }: EditFilmProps) {
  const [film, setFilm] = React.useState<ifilm>(initVal);
  const [verify, setVerify] = React.useState(false);

  React.useMemo(() => {
    setFilm(initVal);
  }, [initVal]);

  function handeChangeS(
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    name: "img" | "title" | "director" | "description"
  ) {
    setFilm((oldState) => {
      const newState = { ...oldState };
      newState[name] = e.target.value;
      return newState;
    });
  }

  function handeChangeN(
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    name: "price" | "duration"
  ) {
    setFilm((oldState) => {
      const newState = { ...oldState };
      newState[name] = Number(e.target.value);
      return newState;
    });
  }

  React.useEffect(() => {
    setVerify(
      film.title.trim().length > 0 &&
        film.img.trim().length > 0 &&
        film.director.trim().length > 0 &&
        film.duration > 0 &&
        film.price >= 0
    );
  }, [film]);

  return (
    <Box component="form" noValidate autoComplete="off" sx={{ maxWidth: 700 }}>
      <div>
        <TextField
          fullWidth
          label="Link on image"
          sx={{ marginBottom: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AttachFileOutlinedIcon />
              </InputAdornment>
            ),
          }}
          value={film.img}
          onChange={(e) => handeChangeS(e, "img")}
          error={film.img.trim().length === 0}
        />
      </div>
      <div>
        <TextField
          fullWidth
          label="Title"
          sx={{ marginBottom: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <TocOutlinedIcon />
              </InputAdornment>
            ),
          }}
          value={film.title}
          onChange={(e) => handeChangeS(e, "title")}
          error={film.title.trim().length === 0}
        />
      </div>
      <div>
        <TextField
          fullWidth
          label="Director"
          sx={{ marginBottom: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <GroupsIcon />
              </InputAdornment>
            ),
          }}
          value={film.director}
          onChange={(e) => handeChangeS(e, "director")}
          error={film.director.trim().length === 0}
        />
      </div>
      <div>
        <TextField
          fullWidth
          type="number"
          label="Duration"
          sx={{ marginBottom: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccessTimeIcon />
              </InputAdornment>
            ),
          }}
          error={film.duration <= 0}
          helperText={film.duration <= 0 ? "Incorrect entry." : ""}
          value={film.duration}
          onChange={(e) => handeChangeN(e, "duration")}
        />
      </div>
      <div>
        <TextField
          fullWidth
          label="Price"
          type="number"
          sx={{ marginBottom: 1 }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          error={film.price < 0}
          helperText={film.price < 0 ? "Incorrect entry." : ""}
          value={film.price}
          onChange={(e) => handeChangeN(e, "price")}
        />
      </div>
      <div>
        <TextField
          fullWidth
          label="Desctiption"
          multiline
          rows={5}
          sx={{ marginBottom: 1 }}
          value={film.description}
          onChange={(e) => handeChangeS(e, "description")}
        />
      </div>
      <div className="films_buttons">
        <Button
          variant="outlined"
          size="medium"
          startIcon={<BookmarkAddedOutlinedIcon />}
          disabled={!verify}
          onClick={(e) => {
            onNew(film);
            setFilm(initVal);
          }}
        >
          Save
        </Button>
        <Button
          variant="outlined"
          size="medium"
          color="error"
          startIcon={<DoNotDisturbAltOutlinedIcon />}
          onClick={() => setFilm(initVal)}
        >
          Cancel
        </Button>
      </div>
    </Box>
  );
}
