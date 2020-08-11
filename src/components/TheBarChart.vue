<script>
import { HorizontalBar, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;
export default {
  extends: HorizontalBar,
  mixins: [reactiveProp],
  data: function () {
    return {
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                fontColor:"#000000"
              },
              gridLines: {
                display: true,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
                fontColor:"#000000"

              },
              gridLines: {
                display: true,
              },
            },
          ],
        },
        legend: {
          display: true,
        },
        tooltips: {
          enabled: true,
          mode: "single",
          callbacks: {
            label: function (tooltipItems) {
              return tooltipItems.xLabel;
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  mounted() {
    // var ctx = this.$refs.canvas.getContext("2d");
    // var gradient = ctx.createLinearGradient(0, 0, 0, 400);
    // gradient.addColorStop(0, "#D7E1EC");
    // gradient.addColorStop(1, "#FFFFFF");
    // this.chartData.datasets[0].backgroundColor=gradient;
    this.renderChart(this.chartData, this.options);
  },
};
</script>

<style>
/* canvas{
  height: 70% !important;
} */
</style>