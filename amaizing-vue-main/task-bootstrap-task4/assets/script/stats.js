
const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      arrayEvents: [],
      arrayPast: [],
      arrayUp: [],
      filteredDatesPast: [],
      filteredDatesUp: [],
      sortedDates: [],
      categories: [],
      estimatePercentage: [],
      categoryRevenueUp: {},
      totalAssistance: {},
      categoryRevenue: {},
      totalEstimate: {},
      totalRevenuesUp: {},
      totalRevenues: {},
      sortedCapacity: []
    }
  },
  created() {
    const url = "https://mindhub-xj03.onrender.com/api/amazing";
    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.arrayEvents = data.events;
        this.filteredDatesPast = this.arrayEvents.filter(event => event.date <= data.currentDate)
        this.filteredDatesUp = this.arrayEvents.filter(event => event.date >= data.currentDate)
        this.arrayPast = this.filteredDatesPast
        this.arrayUp = this.filteredDatesUp

        this.sortedDates = this.filteredDatesPast.sort((a, b) => this.percentage(a.assistance, a.capacity) - this.percentage(b.assistance, b.capacity));
        this.sortedCapacity = this.arrayEvents.sort((a, b) => (a.capacity, b.capacity) - (b.capacity, a.capacity)) 
        const highestPercentage = this.sortedDates[this.sortedDates.length - 1];
        const resultHighest = this.percentage(highestPercentage.assistance, highestPercentage.capacity);
        const lowestPercentage = this.sortedDates[0];
        const resultLowest = this.percentage(lowestPercentage.assistance, lowestPercentage.capacity);

        col1.textContent = `${highestPercentage.name} % ${resultHighest.toFixed(2)}`;
        col2.textContent = `${lowestPercentage.name} % ${resultLowest.toFixed(2)}`;
        col3.textContent = `${this.arrayEvents[0].name} : ${this.arrayEvents[0].capacity}`;


        this.categories = this.arrayEvents.map((e) => e.category);
        this.filterArrayUp()
        this.filterArrayPast()
      })
      .catch(error => console.log(error));
  },

  methods: {
    percentage(assistance, capacity) {
      return (assistance / capacity) * 100;
    },
       filterArrayUp() {
        this.arrayUp.forEach(event => {
          const { capacity, estimate, category, price } = event;
          this.estimatePercentage = (estimate / capacity) * 100;
          this.categoryRevenueUp = estimate * price;
  
          if (!this.totalEstimate[category]) {
            this.totalEstimate[category] = {
              category: category,
              percentage: this.estimatePercentage,
              estimateCount: 1,
              revenue: this.categoryRevenueUp
            };
            this.totalRevenuesUp[category] = this.categoryRevenueUp;
            console.log(this.categoryRevenueUp);

            
          } else {
            this.totalEstimate[category].percentage += this.estimatePercentage;
            this.totalEstimate[category].estimateCount++;
            this.totalRevenuesUp[category] += this.categoryRevenueUp;
          }
        })

      }, 
    filterArrayPast() {
      this.arrayPast.forEach(event => {
        const { capacity, assistance, category, price } = event;
        this.assistancePercentage = (assistance * 100) / capacity;
        this.categoryRevenue = assistance * price;

        if (!this.totalAssistance[category]) {
          this.totalAssistance[category] = {
            category: category,
            percentage: this.assistancePercentage,
            assistanceCount: 1,
            revenue: this.categoryRevenue
          };
          this.totalRevenues[category] = this.categoryRevenue;
        } else {
          this.totalRevenues[category] += this.categoryRevenue;
          this.totalAssistance[category].assistanceCount++;
          this.totalAssistance[category].percentage += this.assistancePercentage;
        }
      })

    }
  }
});

app.mount('#app');

