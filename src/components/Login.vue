<template>
  <div class="login-container">
    <div class="login-caja">
      <h2>Iniciar Sesi&oacute;n</h2>
      <input v-model="username" type="text" placeholder="Usuario" />
      <input v-model="password" type="password" placeholder="Contraseña" />
      <button @click="login()">Ingresar</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      if (
        this.username === "admin" ||
        (this.username === "estudiante" && this.password === "123")
      ) {
        localStorage.setItem("usuario", this.username);
        console.log('Ingresado como: ' + this.username)
        localStorage.setItem("auth", "true");
        console.log("Autenticado exitosamente");
        this.$router.push("/home");
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-content: center;
  background: #f4f6f8;
  height: 100vh;
  width: 100vw;
}

.login-caja {
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  width: 300px;
  text-align: center;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
}

button {
  width: 100%;
  padding: 10px;
  background: #007bff;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
}
</style>