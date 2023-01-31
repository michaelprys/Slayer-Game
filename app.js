const getRandomValue = (min, max) => Math.floor(Math.random() * (max - min) + min);

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      enemyHealth: 100,
      surrender: false,
    };
  },

  methods: {
    attackEnemy() {
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
    },
    receiveDamage() {
      const receivedDamageValue = getRandomValue(5, 30);
      this.playerHealth -= receivedDamageValue;
    },
    heal() {
      const restoredHealth = getRandomValue(10, 20);
      this.playerHealth += restoredHealth;
    },
    useUltimate() {
      const ultimateDamageValue = getRandomValue(25, 50);
      this.monsterHealth -= ultimateDamageValue;
    },
    endGame() {
      this.surrender === true;
      alert("You lost!");
    },
  },
}).mount("#game");
