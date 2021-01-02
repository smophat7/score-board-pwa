<template>
  <div class="landing">

    <!-- Header -->
    <v-container class="header-container">
      <v-row class="header-row px-2 pt-1 pb-3">
        <div class="header-content mx-auto align-self-center px-2">
          <h1 data-aos="zoom-out" data-aos-duration="1000">Words go here</h1>
          <p data-aos="zoom-out" data-aos-duration="1000">More words that I can write and such.</p>
          <img src="@/../public/img/red-dice.png" alt="dice" data-aos="zoom-out" data-aos-duration="1000">
          <br>
          <v-btn to="/register" color="primary">Sign Up</v-btn>
        </div>
      </v-row>
    </v-container>

    <!-- Explanation with Pictures -->
    <v-container class="explain-with-pictures container-fluid p-5">
      <v-row class="align-items-center py-5" data-aos="fade-right" data-aos-duration="500" data-aos-anchor-placement="center-bottom">
        <v-col cols=12 sm=6>
          <v-img src="@/../public/img/monopoly-close-up.jpg" alt="Monopoly board"></v-img>
        </v-col>
        <v-col cols=12 sm=6 class="align-self-center">
          <h3 class="my-4">Collect data. Analyze stats.</h3>
          <p class="mb-4">Get in depth insights into how you and your gaming group performs. Our data visualization tool makes it easy to see who's ahead and who's playing catch-up.</p>
        </v-col>
      </v-row>

      <v-row class="row align-items-center py-5" data-aos="fade-left" data-aos-duration="500" data-aos-anchor-placement="center-bottom">
        <v-col cols=12 sm=6 class="order-sm-12">
          <v-img src="@/../public/img/ticket-to-ride-boys-shadow.jpg" alt="boys playing Ticket to Ride" class="img-fluid"></v-img>
        </v-col>
        <v-col cols=12 sm=6 class="order-sm-1 align-self-center">
          <h3 class="my-4">Assemble your gaming group.</h3>
          <p class="mb-4">Form a group to compete with. Family, friends, coworkers, mandatory COVID roommates, whoever you can. Competition is healthy, and now track your games for long-term rivalries.</p>
        </v-col>
      </v-row>

      <v-row class="align-items-center py-5" data-aos="fade-right" data-aos-duration="500" data-aos-anchor-placement="center-bottom">
        <v-col cols=12 sm=6>
          <v-img src="@/../public/img/crown-chess.jpg" alt="chess piece with crown"></v-img>
        </v-col>
        <v-col cols=12 sm=6 class="align-self-center">
          <h3 class="my-4">See who's champ.</h3>
          <p class="mb-4">Discover who's the best player in your gaming group. Or, use our easy to use filtering tool to see who takes first place in a given game, sub-group, or time-frame.</p>
        </v-col>
      </v-row>
    </v-container>

    <!-- Features with Icons -->
    <div class="feature-icons-container container-fluid p-5">
      <div class="row py-5">
        <div class="col-sm-6 col-lg-3 p-4">
          <font-awesome-icon icon="fist-raised" class="fa-5x icon-color"/>
          <h4>Head to Head</h4>
          <p>See how two people's stats stack up against each other.</p>
        </div>

        <div class="col-sm-6 col-lg-3 p-4">
          <font-awesome-icon icon="trophy" class="fa-5x icon-color"/>
          <h4>King of the Game</h4>
          <p>Discover who really is the best at Dominion. Just don't be last.</p>
        </div>

        <div class="col-sm-6 col-lg-3 p-4">
          <font-awesome-icon icon="dice" class="fa-5x icon-color"/>
          <h4>Game Collection</h4>
          <p>Easily keep track of which games your groups plays most.</p>
        </div>

        <div class="col-sm-6 col-lg-3 p-4">
          <font-awesome-icon icon="chart-bar" class="fa-5x icon-color"/>
          <h4>Fun with Numbers</h4>
          <p>Win percentages, most losses, games played per month, etc.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AOS from 'aos';
// import 'aos/dist/aos.css';
AOS.init({
  once: true
});

  export default {
    name: 'LandingPage'
  }
</script>

<style scoped>
/* Header Section */
.header-container {
  height: calc(100vh - 70px);
}
.header-row {
  height: 100%;
}
.header-content {
  text-align: center;
}
.header-container img {
  width: 18rem;;
}

/* Explanation w/ Pictures Section */
.explain-with-pictures h3 {
  color: var(--s);
}
.explain-with-pictures .btn {
  background-color: var(--p);
  color: var(--text-light);
  margin: 0 0.5rem;
  border-color: var(--p);
  margin: 0;
}
@media (min-width: 768px) {
  .hr-divider{
    display: none;
  }
}

/* Features w/ Icons */
.icon-color {
  color: #2e7d32;
}
.feature-icons-container {
  text-align: center;
  background-color: var(--p);
  color: var(--text-light);
}
.feature-icons-container p {
  max-width: 240px;
  margin: auto;
}
.feature-icons-container i.fas {
  color: var(--s);
  margin: 1rem;
  font-size: 5rem;
}
</style>