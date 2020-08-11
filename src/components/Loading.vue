<template>
  <div
    class="absolute w-full h-full top-0 left-0"
    style="background: linear-gradient(145deg,#00CEC2 0%,#551A92 100%);"
  >
    <div class="flex justify-center items-center h-screen">
      <div class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading",
};
</script>

<style>
.loader {
  border-top-color: #3498db !important;
  -webkit-animation: spinner 1.5s linear infinite;
  animation: spinner 1.5s linear infinite;
}

@keyframes spinner {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>