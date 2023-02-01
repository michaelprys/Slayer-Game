const getRandomValue = (min, max) => Math.floor(Math.random() * (max - min) + min);

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      enemyHealth: 100,
      currentRound: 0,
      winner: null,
    };
  },
  computed: {
    enemyBarStyles() {
      if (this.enemyHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.enemyHealth + "%" };
    },
    playerBarStyles() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    mayUseUltimate() {
      return this.currentRound % 3 !== 0;
    },
  },
  watch: {
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
    startNewGame() {
      this.playerHealth = 100;
      this.enemyHealth = 100;
      this.winner = null;
      this.currentRound = 0;
    },
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
    surrender() {
      this.winner = "enemy";
    },
  },
}).mount("#game");
