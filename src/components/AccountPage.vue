<template>
  <div>
    <v-card width="400px" class="mx-auto mt-5 align-center">
      <v-container>
        <v-row>
          <v-card-title>
            <v-col cols="12" class="text-center">
              <h2>アカウント情報</h2>
            </v-col>
          </v-card-title>
        </v-row>

        <v-card-text>
          <v-row align-content="center">
            <v-col cols="4" class="text-center mt-4">
              <p>ニックネーム</p>
            </v-col>
            <v-col cols="8" class="text-center mt-4">
              <h3>{{ nickname }}</h3>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>
        <v-card-text>
          <v-row align-content="center">
            <v-col cols="4" class="text-center mt-4">
              <p>Email</p>
            </v-col>
            <v-col cols="8" class="text-center mt-4">
              <h3>{{ email }}</h3>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider class="mx-4"></v-divider>
        <v-card-text>
          <v-row align-content="center">
            <v-col cols="4" class="text-center mt-4">
              <p>Password</p>
            </v-col>
            <v-col cols="8" class="text-center mt-4">
              <h3>*******</h3>
            </v-col>
          </v-row>
        </v-card-text>
      </v-container>
    </v-card>
  </div>
</template>
<script>
  import axios from "axios";

  export default {
    data: () => ({
      nickname: "",
      email: "",
    }),
    async mounted() {
      await this.getUserInfo();
    },
    methods: {
      async getUserInfo() {
        await axios
          .get("/api/v1/auth/get_user_info")
          .then((response) => {
            this.nickname = response.data.data.nickname;
            this.email = response.data.data.email;
          })
          .catch((error) => {
            console.error(error);
            console.error(error.response);
            error.response.data.errors.forEach((error) => {
              console.error(error);
            });
          });
      },
    },
  };
</script>

<style></style>
