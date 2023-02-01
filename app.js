const getRandomValue = (min, max) => Math.floor(Math.random() * (max - min) + min);

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      enemyHealth: 100,
      surrender: false,
      currentRound: 0,
      winner: null,
    };
  },
  computed: {
    enemyBarStyles() {
      return { width: this.enemyHealth + "%" };
    },
    playerBarStyles() {
      return { width: this.playerHealth + "%" };
    },
    mayUseUltimate() {
      return this.currentRound % 3 !== 0;
    },
  },
  watch: {
    // if (this.playerHealth < 0) {
    //   alert("You lost!");
    // } else if (this.enemyHealth === 0) {
    //   alert("You won!");
    // }
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        // A draw
        this.winner = "draw";
      } else if (value <= 0) {
        // Player lost
        this.winner = "enemy";
      }
    },
    enemyHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        // A draw
        this.winner = "draw";
      } else if (value <= 0) {
        // Enemy lost
        this.winner = "player";
      }
    },
  },
  methods: {
    attackEnemy() {
      this.currentRound++;
      const attackValue = getRandomValue(5, 12);
      this.enemyHealth -= attackValue;
      this.receiveDamage();
      this.determineAWinner();
    },
    receiveDamage() {
      const receivedDamageValue = getRandomValue(5, 30);
      this.playerHealth -= receivedDamageValue;
    },
    heal() {
      this.currentRound++;
      const restoredHealth = getRandomValue(10, 35);
      if (this.playerHealth + restoredHealth > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += restoredHealth;
      }
      this.receiveDamage();
      this.determineAWinner();
    },
    useUltimate() {
      this.currentRound++;
      const ultimateDamageValue = getRandomValue(25, 50);
      this.enemyHealth -= ultimateDamageValue;
      this.receiveDamage();
      this.determineAWinner();
    },
    endGame() {
      this.surrender === true;
      alert("You lost!");
    },
  },
}).mount("#game");
