import { Box, Button, Grid, Modal } from "@mui/material";
import { ifilm } from "../types/type";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import "./films.css";
import Film from "./film";
import React from "react";
import EditFilm from "./editFilm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface HomeProps {
  curFilms: ifilm[];
  onDelete: (id: string) => void;
  onEdit: (e: React.MouseEvent<HTMLButtonElement>, film: ifilm) => void;
}

function Films({ curFilms, onDelete, onEdit }: HomeProps) {
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [editFilm, setEditFilm] = React.useState<ifilm>({
    id: "",
    title: "",
    director: "",
    duration: 0,
    price: -1,
    img: "",
    featured: false,
    description: "",
  });
  const [description, setDescription] = React.useState("");
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
          <Grid item xs={12} md={6} xl={4} key={e.id}>
            <div className="films">
              <Film curFilm={e} handlerClick={handleOpen} />
              <div className="films_buttons">
                <Button
                  variant="outlined"
                  size="medium"
                  startIcon={<NoteAltOutlinedIcon />}
                  onClick={() => {
                    setEdit(true);
                    setEditFilm(e);
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
      <Modal keepMounted open={open} onClose={handleClose}>
        <Box sx={style}>{description}</Box>
      </Modal>
      <Modal keepMounted open={edit} onClose={handleCloseEdit}>
        <Box sx={style}>
          <EditFilm onNew={onEdit} initVal={editFilm} />
        </Box>
      </Modal>
    </>
  );
}

export default Films;
