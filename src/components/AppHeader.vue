<template>
  <div>
    <header>
      <v-app-bar app dark>
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
        <v-toolbar-title
          ><v-btn to="/" text active-class="">HabituationQuest</v-btn>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-tabs right>
          <v-tab link to="/">
            <v-btn icon class="right">
              <v-icon>mdi-home</v-icon>
            </v-btn>
          </v-tab>
          <v-tab link to="/record">
            <v-btn icon class="right">
              <v-icon>mdi-lead-pencil</v-icon>
            </v-btn>
          </v-tab>
          <v-tab link to="/show_record">
            <v-btn icon class="right">
              <v-icon>mdi-book-open-page-variant-outline</v-icon>
            </v-btn>
          </v-tab>
          <v-tab link to="/task_list">
            <v-btn icon class="right">
              <v-icon>mdi-clipboard-outline</v-icon>
            </v-btn>
          </v-tab>
          <v-tab link to="/account">
            <v-btn icon class="right">
              <v-icon>mdi-account</v-icon>
            </v-btn></v-tab
          >
        </v-tabs>
      </v-app-bar>
      <v-navigation-drawer v-model="drawer" fixed temporary>
        <v-list nav dense>
          <v-list-item-group>
            <v-list-item id="home" link to="/">
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Home</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
          <v-list-item-group v-if="loggedIn">
            <v-list-item
              link
              :to="menuItem.url"
              v-for="(menuItem, index) in menuItems"
              :key="index"
              :id="menuItem.name"
            >
              <v-list-item-icon>
                <v-icon>{{ menuItem.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ menuItem.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
          <v-list-item-group>
            <v-list-item id="signup" v-if="!loggedIn" link to="signup">
              <v-list-item-icon>
                <v-icon>mdi-signup</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>SignUp</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item id="login" v-if="!loggedIn" link to="/login">
              <v-list-item-icon>
                <v-icon>mdi-login</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Login</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="loggedIn" @click="logout_dialog = true">
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </header>
    <v-dialog v-model="logout_dialog" max-width="400">
      <v-card>
        <v-card-title>
          <div>???????????????</div>
        </v-card-title>
        <v-card-text>
          <p>??????????????????????????????</p>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="logout_dialog = false">?????????</v-btn>
          <v-btn color="primary" @click="logout()">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import constants from "@/common/constants";
  import axios from "axios";

  export default {
    data() {
      return {
        drawer: false,
        settings: false,
        menuItems: constants.menuItems,
        logout_dialog: false,
      };
    },
    computed: {
      /**
       * ???????????????????????????????????????
       */
      loggedIn() {
        return this.$store.getters.getLoggedIn;
      },
    },
    methods: {
      /**
       * ????????????????????????
       */
      async logout() {
        await axios
          .delete("/api/v1/auth/sign_out")
          .then(() => {
            this.logout_dialog = false;
            this.$router.go({
              path: this.$router.currentRoute.path,
              force: true,
            });
          })
          .catch((err) => {
            console.error(err);
          });
        this.$cookies.remove("isLoggedIn");
      },
    },
  };
</script>
<style lang="scss" scoped>
  /* scoped??????????????????????????????style????????????????????????????????????????????? */
  .v-toolbar__title {
    overflow: visible !important;
    margin-right: 50px !important;
  }
  .v-tab {
    display: none;

    @include display_pc {
      display: block !important;
    }
  }
  .bar-icon {
    margin-right: 10px !important;
  }
</style>
