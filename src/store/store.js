import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    /**
     * ログインをしているかどうか
     */
    loggedIn: false,
    /**
     * ユーザのすべてのタスクを格納
     */
    tasks: [],
    /**
     * ログイン状態の保持に必要なリクエストヘッダー
     */
    requestHeadersRequiredToMaintainLoginStatus: {
      /**
       * ログイン状態の確認に必要なアクセストークン
       */
      accessToken: "",
      /**
       * ログイン状態の確認に必要なクライアント
       */
      client: "",
      /**
       * ログイン状態の確認に必要なuid
       */
      uid: "",
    },
  },
  getters: {
    getLoggedIn(state) {
      return state.loggedIn;
    },
    /**
     * tasks配列からidを使用して目的のタスクを見つける関数
     * @param {Object} state state
     * @param {Number} task_id 目的のタスクのid
     * @return {Object} task 目的のタスク
     */
    getTaskFromId: (state) => (task_id) => {
      let targetTask = {};
      state.tasks.forEach((task) => {
        if (task.id === task_id) {
          // console.log(true);
          targetTask = task;
        }
      });

      return targetTask;
    },
    /**
     * すべてのタスクを返す関数
     * @param {Object} state state
     * @return {Object} すべてのタスク配列
     */
    getTasks(state) {
      return state.tasks;
    },
  },
  mutations: {
    /**
     * ログイン状態をセットする関数
     * @param {Object} state state
     * @param {Boolean} value ログインしているか
     */
    setLoggedIn(state, value) {
      state.loggedIn = value;
    },
    /**
     * タスクの配列をセットする関数
     * @param {Object} state state
     * @param {Boolean} value タスクの配列
     */
    setTasks(state, value) {
      state.tasks = value;
    },
    setRequestHeadersRequiredToMaintainLoginStatus(
      state,
      accessToken,
      client,
      uid
    ) {
      state.requestHeadersRequiredToMaintainLoginStatus.accessToken = accessToken;
      state.requestHeadersRequiredToMaintainLoginStatus.client = client;
      state.requestHeadersRequiredToMaintainLoginStatus.uid = uid;
    },
    /**
     * タスク記録時に保持しているタスクの情報を更新する関数
     * @param {Object} state state
     * @param {Number} taskId 目的のタスクのid
     * @param {Object} updatedTask 更新するタスク
     */
    updateTask(state, updatedTask) {
      console.log(updatedTask);
      let index = state.tasks.findIndex((task) => task.id === updatedTask.id);
      console.log(index);
      if (index === -1) {
        console.error("Task id not found");
        return;
      }
      state.tasks[index] = updatedTask;
    },
  },
});
