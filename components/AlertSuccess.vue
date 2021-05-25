<template>
  <div>
    <v-alert outlined type="success" text>
      {{ message }}
    </v-alert>
  </div>
</template>

<script>
export default {
  name: 'AlertSuccess',
  props: {
    message: {
      type: String,
      required: true,
    },
  },
}
</script>

<style></style>
