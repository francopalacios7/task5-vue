

const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      dataEvents: [],
      events: []
    }
  },
  created() {
    fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(data => data.json())
    .then(res => {
      this.dataEvents = res;
      const params = new URLSearchParams(location.search);
      const paramsId = params.get('id');
      this.events = this.dataEvents.events.find(e => e._id == paramsId);
      console.log(this.events);
      console.log(this.dataEvents);
    })
    .catch(error => console.log(error));
  }



})
app.mount('#app');
