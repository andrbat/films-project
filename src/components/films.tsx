import { Box, Button, Grid, Modal } from "@mui/material";
import { ifilm } from "../types/type";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import "./films.css";
import Film from "./film";
import React from "react";
import EditFilm from "./editFilm";
import { emptyF } from "./data/data";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/storeTypes";
import { deleteFilmThunk, editFilmThunk } from "../store/films/filmsThunks";

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface HomeProps {
  curFilms: ifilm[];
}

function Films({ curFilms }: HomeProps) {
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [editFilm, setEditFilm] = React.useState<ifilm>(emptyF);
  const [description, setDescription] = React.useState("");
  const user = useSelector((e: RootState) => e.user.user);
  const dispatch = useDispatch();

  function handleOpen(d: string) {
    setOpen(true);
    setDescription(d);
  }
  const handleClose = () => setOpen(false);
  const handleCloseEdit = () => setEdit(false);

  const handleDelete = (id: number) => {
    dispatch(deleteFilmThunk(id));
  };

  const handleEditFilm = (film: ifilm) => {
    dispatch(editFilmThunk(film));
  };

  return (
    <>
      <Grid container spacing={2}>
        {curFilms.map((e) => (
          <Grid item xs={12} md={4} xl={3} key={e.id}>
            <div className="films">
              <Film key={e.id} curFilm={e} handlerClick={handleOpen} />
              <div className="films_buttons" hidden={!user.isAdmin}>
                <Button
                  variant="outlined"
                  size="medium"
                  startIcon={<NoteAltOutlinedIcon />}
                  onClick={() => {
                    setEditFilm(e);
                    setEdit(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  size="medium"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDelete(e.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
      <Modal keepMounted open={edit} onClose={handleCloseEdit}>
        <Box sx={style}>
          <EditFilm onNewEdit={handleEditFilm} initVal={editFilm} />
        </Box>
      </Modal>
      <Modal keepMounted open={open} onClose={handleClose}>
        <Box sx={style}>{description}</Box>
      </Modal>
    </>
  );
}

export default Films;
