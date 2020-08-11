<template>
  <section id="signup" class="flex flex-col items-center justify-center h-screen">
    <form @submit.prevent="handleSignup" class="bg-white shadow-md rounded px-8 pb-6 pt-6">
      <h3 class="pb-5 text-center text-gray-700 text-lg font-bold">Signup</h3>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Name</label>
        <input
          v-model="name"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-teal-500"
          type="text"
          name="name"
          id="name"
        />
      </div>
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
      <div class="flex items-center justify-between">
        <button
          class="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:border-teal-500"
          type="submit"
        >Signup</button>
        <router-link
          class="inline-block align-baseline wrap font-bold text-sm text-teal-500 hover:text-teal-800"
          to="/login"
        >
          Already have
          <br />an account?
        </router-link>
      </div>
    </form>
    <Loading v-if="loading" />
  </section>
</template>

<script>
import { auth, firestore } from "firebase";
import Loading from "../components/Loading";
export default {
  data: function () {
    return {
      email: "",
      password: "",
      name: "",
      loading: false,
    };
  },
  components: {
    Loading,
  },
  methods: {
    handleSignup: function () {
      this.loading=true
      auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.loading=false
          this.$router.push("/");
          firestore()
            .collection("users")
            .doc(auth().currentUser.uid)
            .set({ name: this.name, isAdmin: false });
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