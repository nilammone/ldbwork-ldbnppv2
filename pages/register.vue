<template>
  <div>
    <v-card class="mx-auto mt-10" max-width="500">
      <v-card-title> <h2>Register</h2> </v-card-title>
      <v-divider></v-divider>
      <Notification v-if="error" :message="error" />
      <v-card-text>
        <form method="post" @submit.prevent="register">
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
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            filled
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
          <v-text-field v-model="branch" label="Branch" required></v-text-field>

          <v-btn class="mr-4" type="submit"> Register </v-btn>
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
    show1: false,
    rules: {
      required: (value) => !!value || 'Required.',
      min: (v) => v.length >= 8 || 'Min 8 characters',
      emailMatch: () => `The email and password you entered don't match`,
    },
    branch: '',

    error: null,
  }),

  methods: {
    async register() {
      try {
        await this.$axios.post('/api/auth/register', {
          name: this.name,
          email: this.email,
          password: this.password,
          branch: this.branch,
        })

        this.$router.push('/login')
      } catch (e) {
        this.error = e.response.data.message
      }
    },
  },
}
</script>

<style></style>
