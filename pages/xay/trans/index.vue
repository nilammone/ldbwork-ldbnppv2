<template>
  <div>
    <v-container>
      <h2>
        <v-icon>mdi-transfer</v-icon> Checking and transfer transaction from LDB
        to NPP
      </h2>
      <p class="subtitle-1 ml-8">
        please checking and choose transaction that you want to clearing
      </p>

      <AlertSuccess v-if="message" :message="message" />

      <form action="post" @submit.prevent="sendData">
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="response.msgnpps"
          :single-select="singleSelect"
          item-key="payment_account"
          show-select
          class="elevation-1"
        >
          <template #top>
            <v-switch
              v-model="singleSelect"
              label="Single select"
              class="pa-3"
            ></v-switch>
          </template>
        </v-data-table>
        <v-btn type="submit" class="mt-3 primary">Send Data</v-btn>
      </form>
      <!-- {{ response.msgnpps }} -->
    </v-container>
  </div>
</template>

<script>
import AlertSuccess from '~/components/AlertSuccess'

export default {
  components: {
    AlertSuccess,
  },

  layout: 'branchmenu/xaymenu',

  async asyncData({ $axios }) {
    const response = await $axios.$get('/msgnpps')
    return { response }
  },

  data() {
    return {
      singleSelect: false,
      message: '',
      selected: [],
      // checkad: false,
      headers: [
        {
          text: 'AccountNo',
          align: 'start',
          sortable: false,
          value: 'payment_account',
        },
        { text: 'Amount', value: 'payment_amount' },
        { text: 'Status', value: 'payment_status' },
        { text: 'Date', value: 'payment_date' },
      ],

      // desserts: [
      //   {
      //     payment_account: 2000,
      //     payment_amount: 100000,
      //     payment_status: '1',
      //     payment_date: '2021-05-22',
      //   },
      //   {
      //     payment_account: 2001,
      //     payment_amount: 200000,
      //     payment_status: '1',
      //     payment_date: '2021-05-22',
      //   },
      //   {
      //     payment_account: 2003,
      //     payment_amount: 300000,
      //     payment_status: '1',
      //     payment_date: '2021-05-22',
      //   },
      // ],
    }
  },

  methods: {
    async sendData() {
      try {
        const gselect = this.selected
        await gselect.forEach((doc) => {
          // reverse format
          function reverseFormatNumber(val, locale) {
            const group = new Intl.NumberFormat(locale)
              .format(1111)
              .replace(/1/g, '')
            const decimal = new Intl.NumberFormat(locale)
              .format(1.1)
              .replace(/1/g, '')
            const reversedValg = val.replace(new RegExp('\\' + group, 'g'), '')
            const reversedVald = reversedValg.replace(
              new RegExp('\\' + decimal, 'g'),
              '.'
            )
            return Number.isNaN(reversedVald) ? 0 : reversedVald
          }

          // reverse payment amount
          const refmpaymt = reverseFormatNumber(doc.payment_amount, 'en')

          const response = {
            apis_account: doc.payment_account,
            apis_amount: refmpaymt,
            apis_status: doc.payment_status,
            apis_date: doc.payment_date,
          }

          // tran to apis
          this.$axios.post('/tranapiss', response)

          // update to LDB
          const updatest = [
            {
              propHeadName: 'payment_status',
              value: '2',
            },
          ]
          this.$axios.patch('/msgnpps/' + doc._id, updatest)
        })

        this.message = 'Transfer transaction sucessfully!'
        this.$nuxt.refresh()
        // this.$router.push('/xay/trans')
      } catch (e) {
        this.message = e.response.data.message
      }
    },
  },
}
</script>

<style></style>
