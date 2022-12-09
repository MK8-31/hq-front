<template>
  <div>
    <h1 class="text-center mt-5 mb-5">タスク作成</h1>
    <v-card class="mx-auto px-5 py-5" max-width="500">
      <v-alert id="error-message" v-if="errorMessage" type="error">{{
        errorMessage
      }}</v-alert>
      <validation-observer ref="observer" v-slot="{ invalid }">
        <v-form ref="form" width="400">
          <validation-provider
            v-slot="{ errors }"
            name="タスク名"
            rules="required|max:30"
          >
            <v-text-field
              id="taskName"
              v-model="taskName"
              label="タスク名"
              required
              :error-messages="errors"
              @keydown.enter="createTask()"
            ></v-text-field>
          </validation-provider>

          <v-btn
            id="submit"
            color="primary"
            class="mr-4"
            @click="createTask()"
            :disabled="invalid"
          >
            <v-icon>mdi-plus</v-icon>作成
          </v-btn>
          <br />
          <v-btn id="backToList" link class="mt-5" color="info" to="/task_list"
            >リストに戻る</v-btn
          >
        </v-form>
      </validation-observer>
    </v-card>
    <v-card class="mx-auto px-5 py-5 mt-4" max-width="500">
      <h2 class="mb-4">
        <v-icon class="mb-1">
          mdi-alert
        </v-icon>
        注意
      </h2>
      <p>
        作成した日の週の日曜日から記録が開始されます。<br />
        <span class="text-h6 font-weight-bold">継続週数</span>
        <v-btn
          @click="(help_dialog = true) && (help_num = 1)"
          class="mx-1 mb-1"
          outlined
          icon
          x-small
        >
          <v-icon dark>
            mdi-help
          </v-icon>
        </v-btn>
        は週に4日以上の達成でカウントされる点にご注意ください。
      </p>
      <p>
        <v-icon class="mb-1">
          mdi-information-outline
        </v-icon>
        <span class="text-h6 font-weight-bold ml-1">例</span><br />
        作成日が水曜日だとすると、第1週目は水曜日から日曜日までの4日間に何日達成できたのかが記録されます。<br />
      </p>
    </v-card>
    <v-dialog v-model="help_dialog" max-width="400">
      <v-card>
        <v-card-title>
          <div>継続週数とは</div>
        </v-card-title>
        <v-card-text>
          <p>
            このタスクを連続して達成した週の数。週に4日以上の達成でカウントされる。研究結果より、この継続週数が13以上(３ヶ月と少し)になれば習慣化できたと言える。
          </p>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="help_dialog = false">閉じる</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import axios from "axios";
  import {
    extend,
    ValidationObserver,
    ValidationProvider,
    localize,
  } from "vee-validate";
  import { max } from "vee-validate/dist/rules";
  import ja from "vee-validate/dist/locale/ja";

  localize("ja", ja);
  extend("max", max);

  export default {
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    data: () => ({
      taskName: "",
      errorMessage: "",
      help_dialog: false,
    }),
    methods: {
      /**
       * タスクを作成する
       */
      async createTask() {
        await axios
          .post("/api/v1/tasks", {
            task: {
              name: this.taskName,
            },
          })
          .then(() => {
            this.$router.push("/task_list");
          })
          .catch((error) => {
            console.error(error);
            console.error(error.response);
            this.errorMessage = error.response.data.errors[0];
            console.error(this.errorMessage);
          });
      },
    },
  };
</script>
