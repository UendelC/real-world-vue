<template>
  <p>Edit the event here</p>
</template>

<script>
export default {
  props: ["event"],
  data() {
    return {
      unsavedChanges: true,
    };
  },
  beforeRouteLeave(routeTo, routeFrom, next) {
    if (this.unsavedChanges) {
      const answer = window.confirm(
        "Do you really wan to leave? You have unsaved changes."
      );

      answer ? next() : next(false);
    }

    next();
  },
};
</script>
