<template>
  <div>
    <button v-on:click="guardar()">Guardar</button>
    <button v-on:click="actualizar()">Actualizar</button>
    <button v-on:click="actualizarParcial()">Actualizar Parcial</button>
    <button v-on:click="borrar()">Borrar</button>
  </div>
</template>

<script>
import {
  guardarFachada,
  actualizarFachada,
  actualizarParcialFachada,
  borrarFachada
} from "../clients/EstudianteClient";
export default {
  methods: {
    async guardar() {
      let fecha = "2000-10-02";
      const estudianteToBody = {
        nombre: "Edgar",
        apellido: "Tipan",
        fechaNacimiento: fecha + "T00:00:00",
        genero: "M",
      };
      await guardarFachada(estudianteToBody);
    },
    async actualizar() {
      let fecha = "2000-11-02";
      const estudianteToBody = {
        nombre: "EdgarActualizado",
        apellido: "Tipan",
        fechaNacimiento: fecha + "T00:00:00",
        genero: "M",
      };
      await actualizarFachada(estudianteToBody, 1);
    },
    async actualizarParcial() {
      const estudianteToBody = {
        apellido: "TipanParchado",
      };
      await actualizarParcialFachada(estudianteToBody, 1);
    },
    async borrar() {
        await borrarFachada(7);
    },
  },
};
</script>

<style scoped>
button {
  margin: 10px;
}
</style>