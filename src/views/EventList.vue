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
import EventService from "@/services/EventService";
import { watchEffect } from "vue";

export default {
  name: "EventList",
  props: ["page"],
  components: {
    EventCard,
  },
  data() {
    return {
      events: null,
      totalEvents: 0,
    };
  },
  created() {
    watchEffect(() => {
      this.events = null;
      EventService.getEvents(2, this.page)
        .then((response) => {
          this.events = response.data;
          this.totalEvents = response.headers["x-total-count"];
        })
        .catch((error) => {
          console.log("error:", error);
        });
    });
  },
  computed: {
    hasNextPage() {
      return this.page < this.totalPages;
    },
    totalPages() {
      return Math.ceil(this.totalEvents / 2);
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
