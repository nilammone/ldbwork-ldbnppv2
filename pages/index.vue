<template>
  <div>
    <v-container>
      <h2>Home page</h2>
      <p>
        <strong>Name:</strong>
        {{ loggedInUser.name }}
      </p>
      <p>
        <strong>Email:</strong>
        {{ loggedInUser.email }}
      </p>
      <p>
        {{ user }}
      </p>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  middleware: 'auth',
  data() {
    return {
      user: this.$auth.user,
    }
  },
  computed: {
    ...mapGetters(['loggedInUser']),
  },
}
</script>

<style></style>
