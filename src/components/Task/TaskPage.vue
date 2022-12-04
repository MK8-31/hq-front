<template>
  <div>
    <h1 class="text-center mt-5 mb-5">タスク</h1>
    <v-card class="mx-auto px-5 py-5" max-width="500">
      <h2 id="taskName">{{ task.name }}</h2>

      <v-btn
        id="updateOrDelete"
        class="mt-5 mr-4"
        color="primary"
        link
        :to="'/task_edit/' + taskId"
      >
        <v-icon>mdi-cached</v-icon>更新 or <v-icon>mdi-delete</v-icon>削除
      </v-btn>
      <v-btn id="backToList" class="mt-5" link color="info" to="/task_list"
        >リストに戻る</v-btn
      >
      <v-btn class="mt-5 ml-5" link color="success" to="/record"
        >記録する</v-btn
      >
    </v-card>
    <v-card class="mx-auto px-5 py-5" max-width="500">
      <v-container class="grey lighten-5 mb-6">
        <v-row justify="center" class="center">
          <v-col cols="12">
            <h2 class="mb-5">詳細</h2>
          </v-col>
          <v-col cols="6">
            <v-row>
              <v-col cols="12">
                <h3>
                  達成日数
                  <v-btn
                    @click="(help_dialog = true) && (help_num = 0)"
                    class="mx-1 mb-1"
                    outlined
                    icon
                    x-small
                  >
                    <v-icon dark>
                      mdi-help
                    </v-icon>
                  </v-btn>
                </h3>
              </v-col>
              <v-col cols="12">
                <p class="number">{{ task.day }}</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="6">
            <v-row>
              <v-col cols="12">
                <h3>
                  継続日数
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
                </h3>
              </v-col>
              <v-col cols="12">
                <p class="number">{{ task.running_days }}</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="6">
            <v-row>
              <v-col cols="12">
                <h3>達成週数</h3>
              </v-col>
              <v-col cols="12">
                <p class="number">{{ task.week }}</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="6">
            <v-row>
              <v-col cols="12" class="pb-0">
                <h3>
                  継続週数
                  <v-btn
                    @click="(help_dialog = true) && (help_num = 2)"
                    class="mx-1 mb-1"
                    outlined
                    icon
                    x-small
                  >
                    <v-icon dark>
                      mdi-help
                    </v-icon>
                  </v-btn>
                </h3>
                <p class="mb-0">※週に４日以上の達成</p>
              </v-col>
              <v-col cols="12" class="pt-0">
                <p class="number">{{ task.running_weeks }}</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="6">
            <v-row>
              <v-col cols="12">
                <h3>今週の達成率</h3>
              </v-col>
              <v-col cols="12">
                <p class="number">{{ task.days_a_week }} / 7</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="6">
            <v-row>
              <v-col cols="12">
                <h3>週の始まり</h3>
              </v-col>
              <v-col cols="12">
                <p class="number">{{ startWeekDays }}</p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-dialog v-model="help_dialog" max-width="400">
      <v-card>
        <v-card-title>
          <div>{{ helpContents[help_num].title }}</div>
        </v-card-title>
        <v-card-text>
          <p>{{ helpContents[help_num].message }}</p>
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
  import moment from "moment";
  import axios from "axios";
  // ヘルプダイアログの中身
  import { helpContents } from "@/common/helpContents.js";

  moment.locale("ja", {
    weekdays: [
      "日曜日",
      "月曜日",
      "火曜日",
      "水曜日",
      "木曜日",
      "金曜日",
      "土曜日",
    ],
    weekdaysShort: ["日", "月", "火", "水", "木", "金", "土"],
  });

  export default {
    data: () => ({
      /**
       * @type {Object} タスクを格納
       */
      task: {},
      /**
       * @type {String} 記録を始める曜日
       */
      startWeekDays: "日",
      /**
       * @type {Integer} タスクのID
       */
      taskId: 0,
      /**
       * @type {Boolean} ヘルプダイアログの制御フラグ
       */
      help_dialog: false,
      /**
       * @type {Integer} ヘルプダイアログに表示する文章を制御するフラグ
       */
      help_num: 0,
      /**
       * @type {String} エラーメッセージを格納
       */
      errorMessage: "",
    }),
    async mounted() {
      if (
        this.$store.getters.getTasks.length == 0 ||
        !this.$route.params["id"]
      ) {
        this.$router.push("/task_list");
      } else {
        // paramからタスクのIDを取得(文字列であることに注意)
        this.taskId = Number(this.$route.params["id"]);

        // 記録後にタスク情報の更新が必要かどうか
        let update = this.$route.query["update"] || false;
        if (update) {
          await this.getTask(this.taskId);
        }

        // vuexのストアからタスクIDでタスクを取得する
        this.task = this.$store.getters.getTaskFromId(this.taskId);
      }
    },
    computed: {
      helpContents() {
        return helpContents;
      },
    },
    methods: {
      /**
       * タスクを取得する関数
       */
      async getTask(taskId) {
        await axios
          .get(`/api/v1/tasks/${taskId}`)
          .then((response) => {
            const updatedTask = response.data.data;
            this.$store.commit("updateTask", updatedTask);
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

<style lang="scss" scoped>
  .number {
    font-size: 52px;
    font-weight: bold;
  }

  .center {
    text-align: center;
  }
</style>
