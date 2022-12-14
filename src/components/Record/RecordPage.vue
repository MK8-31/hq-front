<template>
  <div>
    <h1 class="text-center mt-5 mb-5">記録</h1>

    <v-card class="mx-auto pb-5 mb-5" max-width="1200">
      <v-row>
        <v-col
          v-for="(task, i) in displayList"
          :key="i"
          align="center"
          cols="12"
          sm="12"
          md="6"
          lg="6"
        >
          <v-card
            :id="('taskRecord-' + i)"
            :loading="loading[String(i)]"
            @click="complete[String(i)] ? '' : record(i, task.id)"
            outlined
            min-width="240"
            min-height="240"
            max-width="500"
            height="100%"
            :class="
              complete[String(i)] ? 'after-click-color' : 'before-click-color'
            "
          >
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              ></v-progress-linear>
            </template>
            <v-card-title class="justify-center task-name" v-text="task.name" />
            <v-spacer />
            <v-icon v-if="!complete[String(i)]" x-large class="gesture-tap-icon"
              >mdi-gesture-tap</v-icon
            >
            <v-icon
              v-if="complete[String(i)]"
              x-large
              color="success"
              class="check-icon"
              >mdi-check-circle-outline</v-icon
            >
          </v-card>
        </v-col>
      </v-row>
      <v-pagination
        :disabled="nowLoading"
        v-model="page"
        :length="length"
        @input="pageChange"
      ></v-pagination>
    </v-card>
    <v-dialog v-model="showResult" max-width="400">
      <ClassAnime />
      <v-card>
        <v-card-title>
          <div>経験値獲得</div>
        </v-card-title>
        <v-card-text v-if="isLevelUp" class="text-center mt-5 mb-5">
          <h1 class="primary--text lv-up">Level Up!</h1>
        </v-card-text>
        <v-card-text class="text-center mb-5">
          <v-progress-circular
            :rotate="-90"
            :size="100"
            :width="15"
            :value="lv"
            color="primary"
            class="justify-center"
          >
            Lv: {{ lv }}
          </v-progress-circular>
        </v-card-text>
        <v-card-text>
          <v-progress-linear
            color="light-blue"
            height="20"
            :value="rate"
            striped
          >
            Exp: {{ nowLvExp }} / {{ nowLvMaxExp }}
          </v-progress-linear>
        </v-card-text>

        <v-card-actions>
          <v-btn
            id="taskDetails"
            color="info"
            link
            :to="('/task/' + taskId + '?update=true')"
            >タスクの詳細</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn @click="showResult = false">閉じる</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showHelp" max-width="400" persistent>
      <v-card>
        <v-card-title>
          <div>まずはタスクを作ろう！</div>
        </v-card-title>
        <v-card-text class="mt-5 mb-5">
          <p>
            成長するにはどんなことを習慣化すればいいのかを考えてタスク化しよう！
          </p>
          <p>例: ムキムキになりたい</p>
          <p>タスク: 腕立て20回 など</p>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn to="/task_create" color="primary">タスク作成</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import axios from "axios";
  import moment from "moment";
  import ClassAnime from "@/components/ClassAnime.vue";
  import {
    exRequiredToLevelUp,
    cumulativeExperience,
  } from "@/common/exValueRelated.js";

  export default {
    components: {
      ClassAnime,
    },
    data: () => ({
      /**
       * @type {number} ページネーションのページを指定
       */
      page: 1,
      /**
       * @type {number} ページネーションの一ページあたりに入れるタスクの数を指定
       */
      pageSize: 6,
      /**
       * @type {number} ページネーションのページ数を指定
       */
      length: 0,
      /**
       * @type {Array} ユーザのすべてのタスクを格納
       */
      tasks: [],
      /**
       * @type {String} エラーメッセージを格納
       */
      errorMessage: "",
      /**
       * @type {Array} 表示するタスクのリストを格納
       */
      displayList: [],
      loading: {
        "0": false,
        "1": false,
        "2": false,
        "3": false,
        "4": false,
        "5": false,
      },
      nowLoading: false,
      complete: {
        "0": false,
        "1": false,
        "2": false,
        "3": false,
        "4": false,
        "5": false,
      },
      showResult: false,
      taskId: 0,
      lv: 1,
      exp: 0,
      rate: 0,
      nowLvExp: 0,
      nowLvMaxExp: 0,
      isLevelUp: false,
      showHelp: false,
    }),
    async mounted() {
      await this.getTasks();
      this.length = Math.ceil(this.tasks.length / this.pageSize);
      this.displayList = this.tasks.slice(0, this.pageSize);

      this.isDisplayTasksCompeted();
    },
    methods: {
      /**
       * すべてのタスクを取得する関数
       */
      async getTasks() {
        await axios
          .get("/api/v1/tasks")
          .then((response) => {
            this.tasks = response.data.data;
            this.$store.commit("setTasks", response.data.data);
            // // console.log(this.tasks);
            if (this.tasks.length == 0) {
              this.showHelp = true;
            }
          })
          .catch((error) => {
            console.error(error);
            console.error(error.response);
            this.errorMessage = error.response.data.errors[0];
            console.error(this.errorMessage);
          });
      },
      pageChange(pageNumber) {
        this.displayList = this.tasks.slice(
          this.pageSize * (pageNumber - 1),
          this.pageSize * pageNumber
        );
        this.isDisplayTasksCompeted();
      },
      /**
       * タスク達成を記録する関数
       */
      async record(i, taskId) {
        this.taskId = taskId;
        this.showResult = true;
        this.loading[String(i)] = true;
        this.nowLoading = true;

        await axios
          .post("/api/v1/task_records", {
            task: {
              id: taskId,
            },
          })
          .then((response) => {
            this.displayList[i].last_time = moment().format("YYYY-MM-DD");
            // 今のレベル
            const lv = response.data.data.level;
            // 累計経験値
            const exp = response.data.data.exp;
            // レベルアップに必要な経験値
            this.nowLvMaxExp = exRequiredToLevelUp[lv];
            // 今のレベルになってからの経験値
            this.nowLvExp = exp - cumulativeExperience[lv - 1];
            this.isLevelUp = response.data.is_level_up;

            setTimeout(() => {
              this.lv = lv;
              this.exp = exp;
              this.rate = (this.nowLvExp / this.nowLvMaxExp) * 100;
            }, 500);

            this.complete[String(i)] = true;
          })
          .catch((error) => {
            console.error(error);
            console.error(error.response);
            this.errorMessage = error.response.data.errors[0];
            console.error(this.errorMessage);
          });

        this.loading[String(i)] = false;
        this.nowLoading = false;
      },
      /**
       * 表示されているタスクが達成済みかどうかを判断する
       */
      isDisplayTasksCompeted() {
        Object.keys(this.complete).forEach((key) => {
          if (this.displayList[key] === undefined) {
            return;
          }
          const time = moment(this.displayList[key].last_time);

          // taskのlast_timeがnullでない かつ 前回の記録日の日付が今日の日付と同じかどうか
          if (time.isValid() && time.isSame(moment(), "day")) {
            this.complete[key] = true;
          } else {
            this.complete[key] = false;
          }
        });
      },
    },
  };
</script>
<style>
  .v-card--hover {
    margin: 0;
  }

  .lv-up {
    animation: come-up-anim 3s linear infinite;
  }
  .task-name {
    font-size: 30px;
    font-weight: bold;
  }

  .click-message {
    margin-top: 45px;
    font-size: 25px;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    animation: flowing-anim 3s forwards linear infinite;
  }

  .before-click-color {
    background-color: #fff6bf !important;
    transition: 0.3s ease-in-out;
    border-bottom: solid 7px #cbb109 !important;
  }

  .before-click-color:hover {
    border-bottom: solid 2px #cbb109 !important;
    transform: translateY(3px);
  }

  .after-click-color {
    background-color: #a5f1e9 !important;
  }

  .check-icon {
    margin-top: 30px;
    font-size: 80px !important;
  }

  .gesture-tap-icon {
    color: black;
    margin-top: 30px;
    font-size: 100px !important;
    animation: flowing-anim 3s forwards linear infinite;
  }

  @keyframes come-up-anim {
    0% {
      opacity: 0.3;
      transform: translateY(70%);
    }
    100% {
      opacity: 1;
      transform: translateY(0%);
    }
  }

  @keyframes flowing-anim {
    0% {
      opacity: 0.3;
    }
    50% {
      opacity: 0.8;
    }
    100% {
      opacity: 0.3;
    }
  }
</style>
