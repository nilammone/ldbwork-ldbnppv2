<template>
  <div>
    <v-app>
      <v-main>
        <v-container>
          <v-row>
            <v-col cols="6" md="5">
              <!-- s card -->
              <nuxt />
              <!-- e card -->
            </v-col>
            <v-col cols="12" sm="6" md="7">
              <v-img
                class="mx-auto"
                max-height="700"
                max-width="300"
                src="/data-trans.png"
              ></v-img>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
      <v-footer>
        <span>&copy; {{ new Date().getFullYear() }} Lao Development Bank </span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
