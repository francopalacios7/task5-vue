
const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      arrayEvents: [],
      arrayPast: [],
      arrayChecks: [],
      arrayFilteredChecks: [],
      searchValue: "",
      arrayFilteredEvents: [],
      filteredDates: []

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
        this.filteredDates = this.arrayEvents.filter(event => event.date <= data.currentDate)
        this.arrayPast = this.filteredDates
        console.log(this.arrayPast);
      })
      .catch(error => console.log(error));
  },

  computed: {
    filterByText() {
      let filterByCheck = this.filteredDates.filter(check => this.arrayFilteredChecks.includes(check.category) || this.arrayFilteredChecks.length == 0)
      console.log(this.arrayPast);
      let pastCombinado = filterByCheck.filter(card => card.name.includes(this.searchValue));
      this.arrayPast = pastCombinado
    },
  }
});

app.mount('#app');
