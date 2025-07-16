import axios from "axios";

const URL_API = 'http://localhost:8081/api/matricula/v1/estudiantes';

//Guardar
const guardar = async (body) => {
    const data = axios.post(`${URL_API}`, body).then(r => r.data);
    console.log(data);
}

//Actualizar
const actualizar = async (body,id) => {
    axios.put(`${URL_API}/${id}`, body).then(r => r.data);
}

//Actualizar Parcial
const actualizarParcial = async (body,id) => {
    axios.patch(`${URL_API}/${id}`, body).then(r => r.data);
}

//Borrar
const borrar = async (id) => {
    axios.delete(`${URL_API}/${id}`).then(r => r.data);
}

// -----------------------------------------

//Fachadas
export const guardarFachada = async (body) => {
    await guardar(body);
}

export const actualizarFachada = async (body,id) => {
    await actualizar(body,id);
}

export const actualizarParcialFachada = async (body,id) => {
    await actualizarParcial(body, id);
}

export const borrarFachada = async (id) => {
    await borrar(id);
}