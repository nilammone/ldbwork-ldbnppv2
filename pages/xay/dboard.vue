<template>
  <div>
    <v-container>
      <h2>XAY Dashboard page</h2>
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
  layout: 'branchmenu/xaymenu',
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
