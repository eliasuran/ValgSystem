<script>
import axios from "axios";

export default {
  props: {
    user: String,
  },
  data() {
    return {
      candidates: [],
      hasVoted: false,
    };
  },
  mounted() {
    this.fetchCandidates();
    this.fetchUserData();
  },
  methods: {
    async fetchCandidates() {
      try {
        const response = await axios.get("http://localhost:3000/candidates");
        this.candidates = response.data;
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    },
    async vote(candidate) {
      this.fetchUserData();
      if (!this.hasVoted) {
        try {
          await axios.post("http://localhost:3000/vote", {
            candidate: candidate.name,
            user: this.user,
          });
          candidate.votes++;
        } catch (error) {
          console.error("Error voting:", error);
        }
      } else {
        console.log("Du har allerede stemt!");
      }
    },
    async fetchUserData() {
      try {
        const userMail = localStorage.getItem("user");
        const response = await axios.get(
          `http://localhost:3000/users/hasVoted?mail=${userMail}`
        );
        if (response.status === 200) {
          this.hasVoted = response.data.hasVoted;
          console.log(
            "User:",
            localStorage.getItem("user"),
            "Status:",
            this.hasVoted
          );
        } else {
          console.log("Error fetching user data");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<template>
  <div>
    <h1>Kandidater</h1>
    <ul>
      <li v-for="candidate in candidates" :key="candidate.id">
        {{ candidate.name }}
        <button @click="vote(candidate)">Stem</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
div {
  text-align: center;
}
ul {
  list-style: none;
  padding: 0;
}
h1 {
  font-size: 4rem;
}
li {
  text-align: center;
  font-size: 1.5rem;
  margin: 10px;
}
button {
  color: #fbfcbe;
  cursor: pointer;
  background-color: #324b7b;
  border-radius: 5px;
  transition: 300ms;
}
button:hover {
  background-color: #d7dfef;
  color: #090d16;
}
</style>
