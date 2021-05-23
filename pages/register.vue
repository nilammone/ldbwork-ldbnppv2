<template>
  <div>
    <v-card class="mx-auto mt-10" max-width="500">
      <v-card-title>
        <p class="display-1 text--primary">Register</p>

        <Notification v-if="error" :message="error" />
      </v-card-title>
      <v-card-text>
        <form method="post" @submit.prevent="login">
          <v-text-field
            v-model="name"
            :rules="nameRules"
            label="Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Password"
            required
          ></v-text-field>

          <v-btn class="mr-4" type="submit"> Log In </v-btn>
        </form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Notification from '~/components/Notification'
export default {
  components: {
    Notification,
  },
  layout: 'session',
  data: () => ({
    name: '',
    nameRules: [(v) => !!v || 'Name is required'],
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
    password: '',
    passwordRules: [(v) => !!v || 'Name is required'],

    error: null,
  }),
}
</script>

<style></style>
