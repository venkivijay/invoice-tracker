<template>
  <div id="app">
    <header class="flex justify-around items-center h-12 md:bg-transparent bg-teal-400 fixed top-0 left-0 w-screen z-10 font-semibold">
      <div id="logo">Invoice Tracker</div>
      <nav id="nav" class="flex">
        <router-link v-if="user" to="/">Dashboard</router-link>
        <router-link v-if="!user" to="/login">Login</router-link>
        <router-link v-if="!user" to="/signup">SignUp</router-link>
        <router-link v-if="user" to="/login" @click.native="handleLogout">LogOut</router-link>
      </nav>
    </header>
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>
<script>
import { auth } from "./firebase";
export default {
  data: function () {
    return {
      user: false,
    };
  },
  methods: {
    handleLogout: function () {
      auth.signOut().then(() => {
        this.$router.push("/login");
        console.log("signedout user");
      });
    },
  },
  created() {
    auth.onAuthStateChanged((user) => {
      if (user) this.user = user;
      else this.user = false;
    });
  },
};
</script>
<style>
nav > a {
  @apply ml-5 px-2;
}
nav > .router-link-exact-active {
  @apply bg-gray-200 rounded-full shadow-sm;
}
#app {
  background: rgb(18, 169, 196);
  background: linear-gradient(
    145deg,
    #00CEC2 0%,
    #551A92 100%
  );
}
  /* @apply bg-gray-400 */
.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .25s;
}

.fade-enter-active {
  transition-delay: .25s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>


