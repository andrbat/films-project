import { Box, Button, Grid, Modal } from "@mui/material";
import { ifilm } from "../types/type";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import "./films.css";
import Film from "./film";
import React, { useContext } from "react";
import EditFilm from "./editFilm";
import { emptyF } from "./data/data";
import { UserContext } from "./App";

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
  onDelete: (id: string) => void;
  onEdit: (film: ifilm) => void;
  onFavorite: (filmId: string, checkFav: boolean) => void;
}

function Films({ curFilms, onDelete, onEdit, onFavorite }: HomeProps) {
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [editFilm, setEditFilm] = React.useState<ifilm>(emptyF);
  const [description, setDescription] = React.useState("");
  const user = useContext(UserContext);

  function handleOpen(d: string) {
    setOpen(true);
    setDescription(d);
  }
  const handleClose = () => setOpen(false);
  const handleCloseEdit = () => setEdit(false);

  return (
    <>
      <Grid container spacing={2}>
        {curFilms.map((e) => (
          <Grid item xs={12} md={4} xl={3} key={e.id}>
            <div className="films">
              <Film
                curFilm={e}
                handlerClick={handleOpen}
                onFavorite={onFavorite}
              />
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
                  onClick={() => onDelete(e.id)}
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
          <EditFilm onNew={onEdit} initVal={editFilm} />
        </Box>
      </Modal>
      <Modal keepMounted open={open} onClose={handleClose}>
        <Box sx={style}>{description}</Box>
      </Modal>
    </>
  );
}

export default Films;
