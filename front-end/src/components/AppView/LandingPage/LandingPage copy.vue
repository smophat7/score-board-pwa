<template>
  <div class="landing">

    <!-- Header -->
    <div class="header-container container-fluid">
      <div class="row h-100 px-2 pt-1 pb-3">
        <div class="header-content mx-auto align-self-center px-2">
          <h1 data-aos="zoom-out" data-aos-duration="1000">Words go here</h1>
          <p data-aos="zoom-out" data-aos-duration="1000">More words that I can write and such.</p>
          <!-- <img src="images/red-dice.png" alt="dice" data-aos="zoom-out" data-aos-duration="1000"> -->
          <br>
          <!-- <a href="login.html" class="btn btn-lg" data-aos="fade-up" data-aos-delay="900" data-aos-anchor=".header-container">Sign Up</a> -->
          <!-- <router-link :to="'/dashboard/record-game/select-game-played'" class="btn btn-lg" data-aos="fade-up" data-aos-delay="900" data-aos-anchor=".header-container">Sign UP</router-link> -->
          <v-btn to="/register" color="primary">Sign Up</v-btn>
          <!-- <a href="" class="btn btn-lg" data-aos="fade-up" data-aos-delay="1200" data-aos-anchor=".header-container">Record a Game</a> -->
          <!-- <router-link :to="'/dashboard/record-game/select-game-played'" class="btn btn-lg" data-aos="fade-up" data-aos-delay="1200" data-aos-anchor=".header-container">Record a Game</router-link> -->
        </div>
      </div>
    </div>


    <!-- Explanation with Pictures -->
    <div class="explain-with-pictures container-fluid p-5">

      <div class="row align-items-center py-5" data-aos="fade-right" data-aos-duration="500" data-aos-anchor-placement="center-bottom">
        <div class="col-md-6 px-4">
          <img src="images/monopoly-close-up.jpg" alt="Monopoly board" class="img-fluid">
        </div>
        <div class="col-md-6 px-4 align-self-center">
          <h3 class="my-4">Collect data. Analyze stats.</h3>
          <p class="mb-4">Get in depth insights into how you and your gaming group performs. Our data visualization tool makes it easy to see who's ahead and who's playing catch-up.</p>
          <router-link :to="'/dashboard/record-game/select-game-played'" class="btn btn-lg mb-4">Record a Game</router-link>
        </div>
      </div>

      <div class="row align-items-center py-5" data-aos="fade-left" data-aos-duration="500" data-aos-anchor-placement="center-bottom">
        <div class="col-md-6 px-4 order-md-12">
          <img src="images/ticket-to-ride-boys-shadow.jpg" alt="boys playing Ticket to Ride" class="img-fluid">
        </div>
        <div class="col-md-6 px-4 order-md-1">
          <h3 class="my-4">Assemble your gaming group.</h3>
          <p class="mb-4">Form a group to compete with. Family, friends, coworkers, COVID roommates, whoever you can. Competition is healthy, and track your games for long-term tension.</p>
          <router-link :to="'/dashboard/record-game/select-game-played'" class="btn btn-lg mb-4">Create Group</router-link>
        </div>
      </div>

      <div class="row align-items-center py-5" data-aos="fade-right" data-aos-duration="500" data-aos-anchor-placement="center-bottom">
        <div class="col-md-6 px-4">
          <img src="images/crown-chess.jpg" alt="chess piece with crown" class="img-fluid">
        </div>
        <div class="col-md-6 px-4 align-self-center">
          <h3 class="my-4">See who's champ.</h3>
          <p class="mb-4">Discover who's the best player in your gaming group. Or, use our easy to use filtering tool to see who takes first place in a given game, sub-group, or time-frame.</p>
          <router-link :to="'/dashboard/record-game/select-game-played'"  class="btn btn-lg mb-4">Get Started</router-link>
        </div>
      </div>
    </div>


    <!-- Features with Icons -->
    <div class="feature-icons-container container-fluid p-5">
      <div class="row py-5">
        <div class="col-sm-6 col-lg-3 p-4">
          <i class="fas fa-fist-raised"></i>
          <h4>Head to Head</h4>
          <p>See how two people's stats stack up against each other.</p>
        </div>

        <div class="col-sm-6 col-lg-3 p-4">
          <i class="fas fa-trophy"></i>
          <h4>King of the Game</h4>
          <p>Discover who really is the best at Dominion. Just don't be last.</p>
        </div>

        <div class="col-sm-6 col-lg-3 p-4">
          <i class="fas fa-dice"></i>
          <h4>Game Collection</h4>
          <p>Easily keep track of which games your groups plays most.</p>
        </div>

        <div class="col-sm-6 col-lg-3 p-4">
          <i class="fas fa-chart-bar"></i>
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
  /* background-color: #60ad5e; */
  height: calc(100vh - 70px);
}
.header-content {
  text-align: center;
  color: var(--text-light);
}
.header-container img {
  width: 18rem;;
}
.header-container .btn {
  background-color: var(--s);
  color: var(--text-light);
  margin: 0 0.5rem 10px;
  border-color: var(--s);
}
/* @media (min-width: 768px) {
  .header-container {
    height: calc(100vh - 92px);
  }
} */
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