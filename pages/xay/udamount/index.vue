<template>
  <div>
    <h2><v-icon>mdi-update</v-icon> Update data from NPP to LDB</h2>
    <p class="subtitle-1 ml-8">
      Please transer transaction before run this process.
    </p>
    <v-btn color="success" class="ml-8" @click="UpdateAccount">Update</v-btn>

    <!-- process bar -->
    <div v-if="show" class="text-left ml-4 mt-4">
      <v-progress-circular
        :size="70"
        :width="7"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
    <!-- e process bar -->

    <!-- notification message -->
    <div class="mt-4">
      <AlertSuccess v-if="message" :message="message" />
    </div>
    <!-- e notification -->
  </div>
</template>

<script>
import AlertSuccess from '~/components/AlertSuccess'
export default {
  components: {
    AlertSuccess,
  },
  layout: 'branchmenu/xaymenu',

  data() {
    return {
      show: false,
      message: '',
    }
  },

  methods: {
    async UpdateAccount({ $axios }) {
      try {
        // delete account ldb
        // const rmaccount = await this.$axios.$delete('/accounts')
        await this.$axios.$delete('/accounts')
        // if (rmaccount) {
        //   console.log('delete account completed!')
        // }

        // pull data from apis and import to account ldb
        const response = await this.$axios.$get('/accountapiss')
        const subres = response.accountapiss
        subres.forEach((doc) => {
          const stdata = {
            account_no: doc.apis_billno,
            balance: doc.apis_amt,
            account_date: doc.apis_date,
          }

          // add to accoutn ldb
          this.$axios.$post('/accounts/', stdata)
          this.show = true
        })

        this.message = 'Update data completed!'
        this.show = false
      } catch (e) {
        this.message = e.response.data.message
      }
    },
  },
}
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
