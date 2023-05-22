const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      arrayEvents: [],
      arrayChecks: [],
      arrayFilteredChecks: [],
      searchValue: "",
      arrayFilteredEvents: [],

    }
  },
  created() {
    const url = "https://mindhub-xj03.onrender.com/api/amazing";
    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.arrayEvents = data.events;
        this.arrayChecks = data.events.map(event => event.category);
        const noRepeatChecks = data.events.map(e => e.category)
        const filterChecks = new Set(noRepeatChecks)
        const arrayCategorias = Array.from(filterChecks)
        this.arrayChecks = arrayCategorias
      })
      .catch(error => console.log(error));
  },

  computed: {
    filterByText() {
      let filterByCheck = this.arrayEvents.filter(check => this.arrayFilteredChecks.includes(check.category) || this.arrayFilteredChecks.length == 0)
      this.arrayFilteredEvents = filterByCheck.filter(card => card.name.toLowerCase().includes(this.searchValue.toLowerCase()));
    },
  }
});

app.mount('#app');

