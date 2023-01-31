const getRandomValue = (min, max) => Math.floor(Math.random() * (max - min) + min);

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      enemyHealth: 100,
      surrender: false,
    };
  },
  computed: {
    enemyBarStyles() {
      return { width: this.enemyHealth + "%" };
    },
    playerBarStyles() {
      return { width: this.playerHealth + "%" };
    },
  },
  methods: {
    attackEnemy() {
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
      const ultimateDamageValue = getRandomValue(25, 50);
      this.enemyHealth -= ultimateDamageValue;
    },
    endGame() {
      this.surrender === true;
      alert("You lost!");
    },
  },
}).mount("#game");
