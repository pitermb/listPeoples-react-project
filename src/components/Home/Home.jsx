import * as React from "react";
import { useState } from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import AddCircle from "@mui/icons-material/AddCircle";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Check from "@mui/icons-material/Check";
import Edit from "@mui/icons-material/Edit";
import Clear from "@mui/icons-material/Clear";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { arrayPessoas } from "../../utils/listaPessoas";
import calculoIMC from "../export/calculoIMC";
import initialState from "./initialState";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Home() {
  const [values, setValues] = useState(initialState);
  const [valuesEdit, setValuesEdit] = useState(initialState);
  const [newPerson, setNewPerson] = useState([initialState()]);
  const [idNewPerson, setIdNewPerson] = useState();
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [listPeoples, setListPeoples] = useState(arrayPessoas);

  function onChange(e) {
    const { value, name } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  }

  function cadastrarPessoa(obj) {
    const { name, idade, altura, peso } = obj;
    if (name !== "" && idade !== "" && altura !== "" && peso !== "") {
      setListPeoples((prevList) => [...prevList, values]);
      setValues(initialState);
    } else {
      setOpen(true);
    }
  }

  function deletPerson(_index) {
    const newPeoples = listPeoples.filter((pessoa, index) => index !== _index);
    setListPeoples(newPeoples);
  }

  function modalPerson(_index) {
    setOpenModal(true);
    const newPessoa = listPeoples.filter((pessoa, index) => index === _index);
    setNewPerson(newPessoa);
    setValuesEdit(newPessoa[0]);
    setIdNewPerson(_index)
  }

  function onChangeEdit(e) {
    const { value, name } = e.target;
    setValuesEdit({
      ...valuesEdit,
      [name]: value,
    });
  }

  function confirmEditPerson(_item) {
    const { name, idade, altura, peso } = _item;
    const newPeoples = listPeoples.filter(
      (pessoa, index) => pessoa.name !== name
    );
    if (name !== "" && idade !== "" && altura !== "" && peso !== "") {
      listPeoples[idNewPerson] = valuesEdit
      setOpenModal(false);
    } else {
      setOpen(true);
    }
  }

  function deletaUserModal(_name) {
    const newPeoples = listPeoples.filter(
      (pessoa, index) => pessoa.name !== _name
    );
    setListPeoples(newPeoples);
    setOpenModal(false);
  }

  return (
    <Container maxWidth="m">
      <Divider sx={{ m: 2 }} />
      <Box
        component="form"
        sx={{ "& button ": { m: 1, width: "26ch" } }}
        validate
      >
        <TextField
          id="outlined-basic"
          label="Nome"
          variant="outlined"
          name="name"
          value={values.name}
          onChange={onChange}
        />
        <TextField
          id="outlined-basic"
          label="Idade"
          variant="outlined"
          name="idade"
          value={values.idade}
          onChange={onChange}
        />
        <TextField
          id="outlined-basic"
          label="Altura"
          variant="outlined"
          name="altura"
          value={values.altura}
          onChange={onChange}
        />
        <TextField
          id="outlined-basic"
          label="Peso"
          variant="outlined"
          name="peso"
          value={values.peso}
          onChange={onChange}
        />
        <Button
          variant="contained"
          size="medium"
          onClick={() => cadastrarPessoa(values)}
          startIcon={<AddCircle />}
        >
          Cadastrar Pessoa
        </Button>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert
          variant="filled"
          severity="error"
          onClose={() => setOpen(false)}
          sx={{ width: "100%" }}
        >
          <AlertTitle>Erro</AlertTitle>
          Usuario não cadastrado — <strong>Preencha todos os campos!</strong>
        </Alert>
      </Snackbar>
      <Divider sx={{ m: 2 }} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="right">Idade</TableCell>
              <TableCell align="right">Altura&nbsp;(cm)</TableCell>
              <TableCell align="right">Peso&nbsp;(kg)</TableCell>
              <TableCell align="right">IMC</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listPeoples.map((row, index) => {
              let imcCalc = Number(calculoIMC(row.altura, row.peso)).toFixed(2);
              return (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.idade}</TableCell>
                  <TableCell align="right">{row.altura}</TableCell>
                  <TableCell align="right">{row.peso}</TableCell>
                  <TableCell align="right">{imcCalc}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="delete"
                      size="small"
                      onClick={() => deletPerson(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      aria-label="edit"
                      size="small"
                      onClick={() => modalPerson(index)}
                    >
                      <Edit />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Divider sx={{ m: 2 }} />
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edite as informações do usuario
            </Typography>
            <Divider sx={{ m: 1 }} />
            {newPerson.map((item, index) => {
              return (
                <Box
                  key={index}
                  component="form"
                  id="modal-modal-description"
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "41ch" },
                  }}
                  validate
                  autoComplete="off"
                >
                  <TextField
                    required
                    id="outlined-required"
                    label="Nome"
                    name="name"
                    value={valuesEdit.name}
                    onChange={onChangeEdit}
                  />
                  <TextField
                    required
                    id="outlined-required"
                    label="Idade"
                    name="idade"
                    value={valuesEdit.idade}
                    onChange={onChangeEdit}
                  />
                  <TextField
                    required
                    id="outlined-required"
                    label="Altura"
                    name="altura"
                    value={valuesEdit.altura}
                    onChange={onChangeEdit}
                  />
                  <TextField
                    required
                    id="outlined-required"
                    label="Peso"
                    name="peso"
                    value={valuesEdit.peso}
                    onChange={onChangeEdit}
                  />
                  <Divider sx={{ m: 1 }} />
                  <div style={{ display: "flex", gap: "10px" }}>
                    <Button
                      variant="contained"
                      size="medium"
                      onClick={() => confirmEditPerson(item)}
                      startIcon={<Check />}
                    >
                      Atualizar Dados
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<Clear />}
                      onClick={() => deletaUserModal(item.name)}
                    >
                      Deletar Usuario
                    </Button>
                  </div>
                </Box>
              );
            })}
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
}
