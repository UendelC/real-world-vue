<template>
  <h1>Events For Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <div class="pagination">
      <router-link
        id="page-prev"
        :to="{ name: 'EventList', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
      >
        &lt; Previous
      </router-link>

      <router-link
        v-for="index in totalPages"
        class="numbers"
        :class="{ 'is-current': page == index }"
        :to="{ name: 'EventList', query: { page: index } }"
        :key="index"
      >
        {{ index }}
      </router-link>

      <router-link
        id="page-next"
        :to="{ name: 'EventList', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
      >
        Next >
      </router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from "@/components/EventCard.vue";

export default {
  name: "EventList",
  props: ["page"],
  components: {
    EventCard,
  },
  created() {
    this.$store.dispatch("fetchEvents");
  },
  computed: {
    hasNextPage() {
      return this.page < this.totalPages;
    },
    events() {
      return this.$store.state.events;
    },
    totalPages() {
      return Math.ceil(this.events.length / 2);
    },
  },
};
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  justify-content: space-between;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

.numbers {
  text-align: center;
  font-size: 1.2rem;
  color: #2c3e50;
}

.is-current {
  color: red !important;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
