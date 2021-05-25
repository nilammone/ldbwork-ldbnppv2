<template>
  <div>
    <v-card class="mx-auto mt-10" max-width="500">
      <v-card-title>
        <v-img max-width="35" max-height="35" src="/ldblogo.png"></v-img>
        <h2 class="ml-1">LDB NPP v2.0</h2>
      </v-card-title>
      <v-divider></v-divider>
      <Notification v-if="error" :message="error" />
      <v-card-text>
        <form method="post" @submit.prevent="login">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            filled
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

    error: null,
  }),

  methods: {
    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password,
          },
        })

        // check branch
        if ((await this.$auth.user.branch) === '7') {
          this.$router.push('/xay/dboard')
        } else {
          this.$router.push('/')
        }
      } catch (e) {
        this.error = e.response.data.message
      }
    },
  },
}
</script>

<style></style>
