<template>
  <div>
    <v-alert dense outlined type="error">
      {{ message }}
    </v-alert>
  </div>
</template>

<script>
export default {
  name: 'Notification',
  props: {
    message: {
      type: String,
      required: true,
    },
  },
}
</script>

<style></style>
