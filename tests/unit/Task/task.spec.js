import flushPromises from "flush-promises";
import Vuetify from "vuetify";
import { createLocalVue, mount } from "@vue/test-utils";
import TaskPage from "@/components/Task/TaskPage";
import { config } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";

jest.mock("axios", () => ({
  get: jest.fn((url, body) => {
    return Promise.resolve({
      data: {
        status: "SUCCESS",
        message: "Loaded tasks",
        data: {
          id: 7,
          name: "芸者殻たくす。",
          day: 1,
          week: 0,
          days_a_week: 1,
          running_days: 1,
          running_weeks: 0,
          last_time: "2022-05-03",
          user_id: 7,
          created_at: "2022-05-03T22:46:32.968Z",
          updated_at: "2022-05-03T22:46:32.968Z",
        },
      },
      status: 200,
    });
  }),
}));

describe("TaskPage", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  localVue.use(VueRouter);
  let vuetify;
  let store;
  let state;
  let getters;
  let mutations;
  let router;

  beforeEach(() => {
    vuetify = new Vuetify();
    config.mocks["$cookies"] = {
      get: jest.fn().mockReturnValue("access-token-etc"),
    };
    state = {
      tasks: [
        {
          id: 6,
          name: "にるじょうだんたいやく。",
          day: 0,
          week: 0,
          days_a_week: 0,
          running_days: 0,
          running_weeks: 0,
          last_time: null,
          user_id: 6,
          created_at: "2022-05-03T22:46:32.960Z",
          updated_at: "2022-05-03T22:46:32.960Z",
        },
        {
          id: 7,
          name: "芸者殻たくす。",
          day: 0,
          week: 0,
          days_a_week: 0,
          running_days: 0,
          running_weeks: 0,
          last_time: null,
          user_id: 7,
          created_at: "2022-05-03T22:46:32.968Z",
          updated_at: "2022-05-03T22:46:32.968Z",
        },
        {
          id: 9,
          name: "魔術絹糸原油。",
          day: 0,
          week: 0,
          days_a_week: 0,
          running_days: 0,
          running_weeks: 0,
          last_time: null,
          user_id: 9,
          created_at: "2022-05-03T22:46:32.984Z",
          updated_at: "2022-05-03T22:46:32.984Z",
        },
        {
          id: 10,
          name: "めいし手作り勇気。",
          day: 0,
          week: 0,
          days_a_week: 0,
          running_days: 0,
          running_weeks: 0,
          last_time: null,
          user_id: 10,
          created_at: "2022-05-03T22:46:32.991Z",
          updated_at: "2022-05-03T22:46:32.991Z",
        },
        {
          id: 11,
          name: "さいぼう揺さぶるとめる。",
          day: 0,
          week: 0,
          days_a_week: 0,
          running_days: 0,
          running_weeks: 0,
          last_time: null,
          user_id: 11,
          created_at: "2022-05-03T22:46:32.998Z",
          updated_at: "2022-05-03T22:46:32.998Z",
        },
        {
          id: 12,
          name: "ふそく評価白菊。",
          day: 0,
          week: 0,
          days_a_week: 0,
          running_days: 0,
          running_weeks: 0,
          last_time: null,
          user_id: 12,
          created_at: "2022-05-03T22:46:33.007Z",
          updated_at: "2022-05-03T22:46:33.007Z",
        },
        {
          id: 13,
          name: "にるじょうだんたいやく。",
          day: 0,
          week: 0,
          days_a_week: 0,
          running_days: 0,
          running_weeks: 0,
          last_time: null,
          user_id: 6,
          created_at: "2022-05-03T22:46:32.960Z",
          updated_at: "2022-05-03T22:46:32.960Z",
        },
        {
          id: 14,
          name: "芸者殻たくす。",
          day: 0,
          week: 0,
          days_a_week: 0,
          running_days: 0,
          running_weeks: 0,
          last_time: null,
          user_id: 7,
          created_at: "2022-05-03T22:46:32.968Z",
          updated_at: "2022-05-03T22:46:32.968Z",
        },
        {
          id: 15,
          name: "魔術絹糸原油。",
          day: 0,
          week: 0,
          days_a_week: 0,
          running_days: 0,
          running_weeks: 0,
          last_time: null,
          user_id: 9,
          created_at: "2022-05-03T22:46:32.984Z",
          updated_at: "2022-05-03T22:46:32.984Z",
        },
        {
          id: 16,
          name: "めいし手作り勇気。",
          day: 0,
          week: 0,
          days_a_week: 0,
          running_days: 0,
          running_weeks: 0,
          last_time: null,
          user_id: 10,
          created_at: "2022-05-03T22:46:32.991Z",
          updated_at: "2022-05-03T22:46:32.991Z",
        },
        {
          id: 17,
          name: "さいぼう揺さぶるとめる。",
          day: 0,
          week: 0,
          days_a_week: 0,
          running_days: 0,
          running_weeks: 0,
          last_time: null,
          user_id: 11,
          created_at: "2022-05-03T22:46:32.998Z",
          updated_at: "2022-05-03T22:46:32.998Z",
        },
        {
          id: 18,
          name: "ふそく評価白菊。",
          day: 0,
          week: 0,
          days_a_week: 0,
          running_days: 0,
          running_weeks: 0,
          last_time: null,
          user_id: 12,
          created_at: "2022-05-03T22:46:33.007Z",
          updated_at: "2022-05-03T22:46:33.007Z",
        },
      ],
    };
    getters = {
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
      getTasks(state) {
        return state.tasks;
      },
    };
    mutations = {
      setTasks(state, value) {
        state.tasks = value;
      },
      updateTask(state, updatedTask) {
        let index = state.tasks.findIndex((task) => task.id === updatedTask.id);
        if (index === -1) {
          console.error("Task id not found");
          return;
        }
        state.tasks[index] = updatedTask;
      },
    };
    store = new Vuex.Store({
      state,
      getters,
      mutations,
    });
    router = new VueRouter({
      routes: [
        {
          name: "task",
          path: "/task/:id",
          component: TaskPage,
        },
      ],
    });
    router.push({ name: "task", params: { id: 7 } });
  });

  it("タスク名が表示されている", async () => {
    const wrapper = mount(TaskPage, {
      localVue,
      vuetify,
      store,
      router,
    });
    // storeなどの取得で必要
    await flushPromises();

    const taskName = wrapper.find("#taskName");

    expect(taskName.text()).toBe("芸者殻たくす。");
  });

  it("更新or削除ボタンがある", () => {
    const wrapper = mount(TaskPage, {
      localVue,
      vuetify,
      store,
      router,
    });

    const updateOrDeleteBtn = wrapper.find("#updateOrDelete");
    expect(updateOrDeleteBtn.text()).toBe("更新 or 削除");
  });

  it("更新or削除ボタンをクリックするとTaskEditPageに遷移", async () => {
    const wrapper = mount(TaskPage, {
      localVue,
      vuetify,
      store,
      router,
    });

    await flushPromises();

    const updateOrDeleteBtn = wrapper.find("#updateOrDelete");

    updateOrDeleteBtn.trigger("click");

    await flushPromises();
    expect(wrapper.vm.$route.path).toBe("/task_edit/7");
  });

  it("リストに戻るボタンがある", () => {
    const wrapper = mount(TaskPage, {
      localVue,
      vuetify,
      store,
      router,
    });

    const backToListBtn = wrapper.find("#backToList");
    expect(backToListBtn.text()).toBe("リストに戻る");
  });

  it("リストに戻るボタンをクリックするとTaskListPageに遷移", async () => {
    const wrapper = mount(TaskPage, {
      localVue,
      vuetify,
      store,
      router,
    });

    const backToListBtn = wrapper.find("#backToList");
    backToListBtn.trigger("click");
    await flushPromises();
    expect(wrapper.vm.$route.path).toBe("/task_list");
  });

  it("記録後タスク詳細ページに遷移してきた場合、タスクの情報を更新", async () => {
    router = new VueRouter({
      routes: [
        {
          name: "task",
          path: "/task/:id",
          component: TaskPage,
        },
      ],
    });
    router.push({ name: "task", params: { id: 7 }, query: { update: true } });
    const wrapper = mount(TaskPage, {
      localVue,
      vuetify,
      store,
      router,
    });
    await flushPromises();
    console.log(store.getters.getTaskFromId(7).day);
    expect(store.getters.getTaskFromId(7).day).toBe(1);
    expect(wrapper.vm.task.day).toBe(1);
  });
});
