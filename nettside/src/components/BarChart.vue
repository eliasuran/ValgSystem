<template>
  <Bar
    v-if="loaded"
    :style="myStyles"
    :options="chartOptions"
    :data="chartData"
  />
</template>

<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import axios from "axios";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "BarChart",
  components: { Bar },
  computed: {
    myStyles() {
      return {
        height: "300px",
        position: "relative",
        color: "red",
      };
    },
  },
  data() {
    return {
      candidates: [],
      loaded: false,
      chartData: {
        labels: [],
        datasets: [{ label: "Stemmer", data: [], backgroundColor: "#324b7b" }],
      },
      chartOptions: {
        responsive: true,
      },
    };
  },
  mounted() {
    this.fetchCandidates();
  },
  methods: {
    async fetchCandidates() {
      try {
        const response = await axios.get("http://localhost:3000/candidates");
        this.candidates = response.data;
        this.chartData.labels = this.candidates.map(
          (candidate) => candidate.name
        );
        this.chartData.datasets[0].data = this.candidates.map(
          (candidate) => candidate.votes
        );
        this.loaded = true;
      } catch (error) {
        console.error("Error fetching candidates for stats:", error);
      }
    },
  },
};
</script>
