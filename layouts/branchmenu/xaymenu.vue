<template>
  <div>
    <v-app dark>
      <v-navigation-drawer
        v-model="drawer"
        :mini-variant="miniVariant"
        :clipped="clipped"
        fixed
        app
      >
        <v-list>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-web</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                <a
                  href="https://vehome.ldblao.la/onlinestmt/Home"
                  target="_blank"
                  >Online Statement</a
                >
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/xay/reports/reportTotal">
            <v-list-item-action>
              <v-icon>mdi-clipboard-check-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title> Report-Total </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/xay/reports/reportDetails">
            <v-list-item-action>
              <v-icon>mdi-clipboard-check-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title> Report-Details </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar :clipped-left="clipped" fixed app>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-toolbar-title v-text="title" />
        <v-spacer />
        <v-toolbar-title>Hi, {{ loggedInUser.name }}</v-toolbar-title>
        <v-btn class="ml-2" @click="logout">
          <v-icon>mdi-logout</v-icon> Logout
        </v-btn>
        <v-btn v-if="admin" to="/register" class="ml-2">
          <v-icon>mdi-account-details-outline</v-icon> Register
        </v-btn>
      </v-app-bar>
      <v-main>
        <v-container>
          <nuxt />
        </v-container>
      </v-main>
      <v-footer :absolute="!fixed" app>
        <span>&copy; {{ new Date().getFullYear() }} Lao Development Bank</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      admin: false,
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Home',
          to: '/xay/dboard',
        },
        {
          icon: 'mdi-update',
          title: 'Update Amount',
          to: '/xay/udamount',
        },
        {
          icon: 'mdi-transfer',
          title: 'Data Tran',
          to: '/xay/trans',
        },
      ],
      miniVariant: false,
      right: true,
      // rightDrawer: false,
      title: 'NPP XAY',
    }
  },

  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },

  methods: {
    async logout() {
      await this.$auth.logout()
      await this.$router.push('/login')
    },
  },
}
</script>
