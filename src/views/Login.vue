<template>
  <section id="login" class="flex flex-col items-center justify-center h-screen">
    <form @submit.prevent="handleLogin" class="bg-white shadow-md rounded px-8 pb-6 pt-6">
      <h3 class="pb-5 text-center text-gray-700 text-lg font-bold">Login</h3>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
        <input
          v-model="email"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-teal-500"
          type="email"
          name="email"
          id="email"
        />
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
        <input
          v-model="password"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-teal-500"
          type="password"
          name="password"
          id="password"
        />
      </div>
      <div class="flex items-center justify-center">
        <button
          class="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:border-teal-500"
          type="submit"
        >Log In</button>
      </div>
    </form>
    <Loading v-if="loading" />
  </section>
</template>

<script>
import { auth } from "firebase";
import Loading from "../components/Loading";
export default {
  name: "Login",
  data: function () {
    return {
      email: "",
      password: "",
      loading: false,
    };
  },
  components: {
    Loading,
  },
  methods: {
    handleLogin: function () {
      this.loading = true;
      auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.loading = false;
          this.$router.push("/");
        })
        .catch((err) => {
          alert(err);
          this.loading = false;

        });
    },
  },
};
</script>

<style>
</style>