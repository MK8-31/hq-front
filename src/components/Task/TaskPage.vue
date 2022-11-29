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
                    class="mx-1"
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
                    class="mx-1"
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
                    class="mx-1"
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
          <div>{{ help_contents[help_num].title }}</div>
        </v-card-title>
        <v-card-text>
          <p>{{ help_contents[help_num].message }}</p>
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
      task: {},
      startWeekDays: "日",
      taskId: 0,
      help_dialog: false,
      help_num: 0,
      help_contents: [
        {
          title: "達成日数とは",
          message:
            "このタスクを何回達成して記録したかの回数。継続が途切れても記録される。",
        },
        {
          title: "継続日数とは",
          message: "このタスクを連続して達成した日数",
        },
        {
          title: "継続週数とは",
          message:
            "このタスクを連続して達成した週の数。週に4日以上の達成でカウントされる。研究結果より、この継続週数が13以上(３ヶ月と少し)になれば習慣化できたと言える。",
        },
      ],
    }),
    mounted() {
      if (
        this.$store.getters.getTasks.length == 0 ||
        !this.$route.params["id"]
      ) {
        this.$router.push("/task_list");
      } else {
        // paramからタスクのIDを取得(文字列であることに注意)
        this.taskId = Number(this.$route.params["id"]);
        // vuexのストアからタスクIDでタスクを取得する
        this.task = this.$store.getters.getTaskFromId(this.taskId);
      }
    },
    computed: {},
    methods: {},
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
