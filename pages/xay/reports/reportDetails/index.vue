<template>
  <div>
    <h2><v-icon>mdi-clipboard-check-outline</v-icon> Report Details</h2>
    <p class="ml-8">This report will show details of transaction .</p>

    <v-form @submit.prevent="Totalsearch">
      <v-row>
        <v-col cols="12" sm="4" md="4">
          <v-text-field v-model="sdate" label="Start Date" filled type="date">
          </v-text-field>
        </v-col>
        <v-col cols="12" sm="4" md="4">
          <v-text-field v-model="edate" label="End Date" filled type="date">
          </v-text-field>
        </v-col>
        <v-col cols="12" sm="4" md="4">
          <v-btn type="submit" class="mt-5" color="primary">Search</v-btn>
        </v-col>
      </v-row>
    </v-form>

    <!-- s table -->
    <div>
      <v-simple-table v-if="showtable">
        <template #default>
          <thead>
            <tr>
              <th class="text-left">No</th>
              <th class="text-left">Account</th>
              <th class="text-left">Amount</th>
              <th class="text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in desserts" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ item.payment_account }}</td>
              <td>{{ item.payment_amount }}</td>
              <td>{{ item.payment_date }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'branchmenu/xaymenu',

  data() {
    return {
      sdate: '',
      edate: '',
      showtable: false,
      desserts: [],
    }
  },

  methods: {
    async Totalsearch({ $axios }) {
      const sddata = {
        sdate: this.sdate,
        edate: this.edate,
      }
      await this.$axios.$post('/msgnppsreportDetail', sddata).then((docs) => {
        return (this.desserts = docs.msgnpps)
      })
      this.showtable = true
    },
  },
}
</script>

<style></style>
