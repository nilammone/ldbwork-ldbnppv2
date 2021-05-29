<template>
  <div>
    <v-container>
      <h2><v-icon>mdi-view-dashboard</v-icon> Overview of Transactions</h2>
      <v-row class="mt-3">
        <v-col cols="12" md="6" sm="6">
          <v-card class="mx-auto" color="primary" max-width="344" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4 mytxtcl-white">TOTAL TRANSACTION</div>
                <v-list-item-title class="headline mb-1 mytxtcl-white">
                  <v-icon class="mytxtcl-white">mdi-cellphone</v-icon> MOBILE
                </v-list-item-title>
                <v-list-item-subtitle>
                  <p class="mytxtcl-white">
                    Latest update!
                  </p></v-list-item-subtitle
                >
              </v-list-item-content>
              <div class="headline mb-5 mytxtcl-white">4</div>
            </v-list-item>
          </v-card>
        </v-col>
        <v-col cols="12" md="6" sm="6">
          <v-card class="mx-auto" color="error" max-width="344" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4 mytxtcl-white">TOTAL TRANSACTION</div>
                <v-list-item-title class="headline mb-1 mytxtcl-white">
                  <v-icon class="mytxtcl-white">mdi-archive</v-icon> ATM
                </v-list-item-title>
                <v-list-item-subtitle>
                  <p class="mytxtcl-white">
                    Latest update!
                  </p></v-list-item-subtitle
                >
              </v-list-item-content>
              <div class="headline mb-5 mytxtcl-white">2</div>
            </v-list-item>
          </v-card>
        </v-col>
        <v-col cols="12" md="6" sm="6">
          <v-card class="mx-auto" color="success" max-width="344" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4 mytxtcl-white">TOTAL TRANSACTION</div>
                <v-list-item-title class="headline mb-1 mytxtcl-white">
                  <v-icon class="mytxtcl-white">mdi-account-group</v-icon>
                  TELLER
                </v-list-item-title>
                <v-list-item-subtitle>
                  <p class="mytxtcl-white">
                    Latest update!
                  </p></v-list-item-subtitle
                >
              </v-list-item-content>
              <div class="headline mb-5 mytxtcl-white">2</div>
            </v-list-item>
          </v-card>
        </v-col>
        <v-col cols="12" md="6" sm="6">
          <v-card class="mx-auto" color="warning" max-width="344" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4 mytxtcl-white">TOTAL TRANSACTION</div>
                <v-list-item-title class="headline mb-1 mytxtcl-white">
                  ALL
                </v-list-item-title>
                <v-list-item-subtitle>
                  <p class="mytxtcl-white">
                    Latest update!
                  </p></v-list-item-subtitle
                >
              </v-list-item-content>
              <div class="headline mb-5 mytxtcl-white">
                {{ response.count }}
              </div>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  layout: 'branchmenu/xaymenu',
  middleware: 'auth',

  async asyncData({ $axios }) {
    const response = await $axios.$get('/msgnppsreportDetail')
    return { response }
  },

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

<style scoped>
.mytxtcl-white {
  color: white;
}
</style>
