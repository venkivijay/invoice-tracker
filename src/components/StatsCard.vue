<template>
  <div
    class="rounded shadow-xl p-4 m-1 inline-flex flex-col justify-around items-start flex-auto"
    :style="{background: getGradient}"
  >
    <div>
      <p class="text-black text-sm whitespace-pre-wrap">{{title}}</p>
    </div>
    <div>
      <p class="text-md text-black   font-bold">{{value}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "StatsCard",
  props: {
    title: String,
    value: Number,
    startColor: String,
    endColor: String,
  },
  computed: {
    getGradient: function () {
      return `linear-gradient( 145deg, ${this.startColor} 30%, ${this.endColor} 100% )`;
    },
  },
};
</script>

<style>
</style>