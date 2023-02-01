const getRandomValue = (min, max) => Math.floor(Math.random() * (max - min) + min);

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      enemyHealth: 100,
      surrender: false,
      currentRound: 0,
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
  methods: {
    attackEnemy() {
      this.currentRound++;
      const attackValue = getRandomValue(5, 12);
      this.enemyHealth -= attackValue;
      this.receiveDamage();
      if (this.playerHealth === 0) {
        alert("You lost!");
      } else if (this.enemyHealth === 0) {
        alert("You won!");
      }
    },
    receiveDamage() {
      const receivedDamageValue = getRandomValue(5, 30);
      this.playerHealth -= receivedDamageValue;
    },
    heal() {
      const restoredHealth = getRandomValue(10, 20);
      if (this.playerHealth < 100) {
        this.playerHealth += restoredHealth;
      }
    },
    useUltimate() {
      this.currentRound++;
      const ultimateDamageValue = getRandomValue(25, 50);
      this.enemyHealth -= ultimateDamageValue;
      this.receiveDamage();
    },
    endGame() {
      this.surrender === true;
      alert("You lost!");
    },
  },
}).mount("#game");
