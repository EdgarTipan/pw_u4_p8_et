<template>
  <div class="container">
    <!-- Navegacion entre pestañas -->
    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab"
        :class="{ active: activeTab === tab }"
        @click="activeTab = tab"
      >
        {{ tab }}
      </button>
    </div>

    <!-- Pestañas -->
    <div class="tab-content">
      <!-- Guardar -->
      <div v-if="activeTab === 'Guardar'">
        <p
          v-if="message.guardar.text"
          :class="{
            success: message.guardar.status === 'success',
            error: message.guardar.status === 'error',
          }"
        >
          {{ message.guardar.text }}
        </p>
        <h2>Guardar Estudiante</h2>
        <form @submit.prevent="guardar">
          <div class="form-group">
            <label for="nombreGuardar">Nombre:</label>
            <input
              id="nombreGuardar"
              v-model="guardarForm.nombre"
              type="text"
              required
            />
          </div>
          <div class="form-group">
            <label for="apellidoGuardar">Apellido:</label>
            <input
              id="apellidoGuardar"
              v-model="guardarForm.apellido"
              type="text"
              required
            />
          </div>
          <div class="form-group">
            <label for="fechaNacimientoGuardar">Fecha de Nacimiento:</label>
            <input
              id="fechaNacimientoGuardar"
              v-model="guardarForm.fechaNacimiento"
              type="date"
              required
            />
          </div>
          <div class="form-group">
            <label for="generoGuardar">Género:</label>
            <select id="generoGuardar" v-model="guardarForm.genero" required>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>
          </div>
          <button type="submit">Guardar</button>
        </form>
      </div>

      <!-- Actualizar -->
      <div v-if="activeTab === 'Actualizar'">
        <p
          v-if="message.actualizar.text"
          :class="{
            success: message.actualizar.status === 'success',
            error: message.actualizar.status === 'error',
          }"
        >
          {{ message.actualizar.text }}
        </p>
        <h2>Actualizar Estudiante</h2>
        <form @submit.prevent="actualizar">
          <div class="form-group">
            <label for="idActualizar">ID:</label>
            <input
              id="idActualizar"
              v-model.number="actualizarForm.id"
              type="number"
              required
            />
          </div>
          <div class="form-group">
            <label for="nombreActualizar">Nombre:</label>
            <input
              id="nombreActualizar"
              v-model="actualizarForm.nombre"
              type="text"
              required
            />
          </div>
          <div class="form-group">
            <label for="apellidoActualizar">Apellido:</label>
            <input
              id="apellidoActualizar"
              v-model="actualizarForm.apellido"
              type="text"
              required
            />
          </div>
          <div class="form-group">
            <label for="fechaNacimientoActualizar">Fecha de Nacimiento:</label>
            <input
              id="fechaNacimientoActualizar"
              v-model="actualizarForm.fechaNacimiento"
              type="date"
              required
            />
          </div>
          <div class="form-group">
            <label for="generoActualizar">Género:</label>
            <select
              id="generoActualizar"
              v-model="actualizarForm.genero"
              required
            >
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>
          </div>
          <button type="submit">Actualizar</button>
        </form>
      </div>

      <!-- Actualizar Parcial -->
      <div v-if="activeTab === 'Actualizar Parcial'">
        <p
          v-if="message.actualizarParcial.text"
          :class="{
            success: message.actualizarParcial.status === 'success',
            error: message.actualizarParcial.status === 'error',
          }"
        >
          {{ message.actualizarParcial.text }}
        </p>
        <h2>Actualizar Parcial Estudiante</h2>
        <form @submit.prevent="actualizarParcial">
          <div class="form-group">
            <label for="idParcial">ID:</label>
            <input
              id="idParcial"
              v-model.number="actualizarParcialForm.id"
              type="number"
              required
            />
          </div>
          <div class="form-group">
            <label for="apellidoParcial">Apellido (Opcional):</label>
            <input
              id="apellidoParcial"
              v-model="actualizarParcialForm.apellido"
              type="text"
            />
          </div>
          <button type="submit">Actualizar Parcial</button>
        </form>
      </div>

      <!-- Borrar -->
      <div v-if="activeTab === 'Borrar'">
        <p
          v-if="message.borrar.text"
          :class="{
            success: message.borrar.status === 'success',
            error: message.borrar.status === 'error',
          }"
        >
          {{ message.borrar.text }}
        </p>
        <h2>Borrar Estudiante</h2>
        <form @submit.prevent="borrar">
          <div class="form-group">
            <label for="idBorrar">ID:</label>
            <input
              id="idBorrar"
              v-model.number="borrarForm.id"
              type="number"
              required
            />
          </div>
          <button type="submit">Borrar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {
  guardarFachada,
  actualizarFachada,
  actualizarParcialFachada,
  borrarFachada,
} from "../clients/EstudianteClient";

export default {
  data() {
    return {
      activeTab: "Guardar",
      tabs: ["Guardar", "Actualizar", "Actualizar Parcial", "Borrar"],
      guardarForm: {
        nombre: "",
        apellido: "",
        fechaNacimiento: "",
        genero: "M",
      },
      actualizarForm: {
        id: null,
        nombre: "",
        apellido: "",
        fechaNacimiento: "",
        genero: "M",
      },
      actualizarParcialForm: {
        id: null,
        apellido: "",
      },
      borrarForm: {
        id: null,
      },
      message: {
        guardar: { text: "", status: "" },
        actualizar: { text: "", status: "" },
        actualizarParcial: { text: "", status: "" },
        borrar: { text: "", status: "" },
      },
    };
  },
  methods: {
    async guardar() {
      const estudianteToBody = {
        nombre: this.guardarForm.nombre,
        apellido: this.guardarForm.apellido,
        fechaNacimiento: this.guardarForm.fechaNacimiento + "T00:00:00",
        genero: this.guardarForm.genero,
      };
      try {
        await guardarFachada(estudianteToBody);
        this.message.guardar = {
          text: "Estudiante guardado exitosamente",
          status: "success",
        };
        this.resetForm("guardarForm");
        this.clearMessage("guardar");
      } catch (error) {
        this.message.guardar = {
          text: "Error al guardar el estudiante",
          status: "error",
        };
        console.error(error);
        this.clearMessage("guardar");
      }
    },
    async actualizar() {
      const estudianteToBody = {
        nombre: this.actualizarForm.nombre,
        apellido: this.actualizarForm.apellido,
        fechaNacimiento: this.actualizarForm.fechaNacimiento + "T00:00:00",
        genero: this.actualizarForm.genero,
      };
      try {
        await actualizarFachada(estudianteToBody, this.actualizarForm.id);
        this.message.actualizar = {
          text: "Estudiante actualizado exitosamente",
          status: "success",
        };
        this.resetForm("actualizarForm");
        this.clearMessage("actualizar");
      } catch (error) {
        this.message.actualizar = {
          text: "Error al actualizar el estudiante",
          status: "error",
        };
        console.error(error);
        this.clearMessage("actualizar");
      }
    },
    async actualizarParcial() {
      const estudianteToBody = {
        apellido: this.actualizarParcialForm.apellido,
      };
      try {
        await actualizarParcialFachada(
          estudianteToBody,
          this.actualizarParcialForm.id
        );
        this.message.actualizarParcial = {
          text: "Estudiante actualizado parcialmente exitosamente",
          status: "success",
        };
        this.resetForm("actualizarParcialForm");
        this.clearMessage("actualizarParcial");
      } catch (error) {
        this.message.actualizarParcial = {
          text: "Error al actualizar parcialmente el estudiante",
          status: "error",
        };
        console.error(error);
        this.clearMessage("actualizarParcial");
      }
    },
    async borrar() {
      try {
        await borrarFachada(this.borrarForm.id);
        this.message.borrar = {
          text: "Estudiante borrado exitosamente",
          status: "success",
        };
        this.resetForm("borrarForm");
        this.clearMessage("borrar");
      } catch (error) {
        this.message.borrar = {
          text: "Error al borrar el estudiante",
          status: "error",
        };
        console.error(error);
        this.clearMessage("borrar");
      }
    },
    resetForm(formName) {
      if (formName === "guardarForm") {
        this.guardarForm = {
          nombre: "",
          apellido: "",
          fechaNacimiento: "",
          genero: "M",
        };
      } else if (formName === "actualizarForm") {
        this.actualizarForm = {
          id: null,
          nombre: "",
          apellido: "",
          fechaNacimiento: "",
          genero: "M",
        };
      } else if (formName === "actualizarParcialForm") {
        this.actualizarParcialForm = { id: null, apellido: "" };
      } else if (formName === "borrarForm") {
        this.borrarForm = { id: null };
      }
    },
    clearMessage(tab) {
      setTimeout(() => {
        this.message[tab] = { text: "", status: "" };
      }, 5000);
    },
  },
};
</script>

<style scoped>
.container {
  background: #313943;
  border: 1px solid #ddd;
  border-radius: 12px;
  max-width: 1000px;
  margin: 50px auto;
  padding: 30px;
}

.tabs {
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
}

.tabs button {
  flex: 1;
  padding: 12px;
  background: #2a3440;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background 0.3s;
}

.tabs button.active {
  background: #47596a;
  color: #fff;
}

.tabs button:hover {
  background: #3a4655;
}

.tab-content {
  padding: 20px;
  background: #313943;
  border-radius: 8px;
}

h2 {
  color: #fff;
  font-style: italic;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  color: #fff;
  text-align: left;
  font-weight: bold;
  margin-bottom: 10px;
}

.form-group input,
.form-group select {
  background: #2a3440;
  color: #fff;
  width: 80%;
  margin-top: 10px;
  border: none;
  border-bottom: 1px solid #ddd;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  padding: 10px 15px;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
}

button[type="submit"] {
  background: #47596a;
  color: #fff;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 20px;
  cursor: pointer;
  width: 200px;
  font-weight: bold;
  margin-top: 10px;
}

button[type="submit"]:hover {
  background: #3a4655;
}

.success {
  color: #00ff00;
  font-weight: bold;
  text-decoration: underline;
  margin-bottom: 10px;
}

.error {
  color: #ff0000;
  font-weight: bold;
  text-decoration: underline;
  margin-bottom: 10px;
}
</style>