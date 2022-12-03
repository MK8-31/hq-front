import RecordPage from "@/components/Record/RecordPage.vue";
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
const { required } = require("vee-validate/dist/rules.umd");
extend("required", required);
import Vuetify from "vuetify";
import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";

jest.mock("axios", () => ({
  get: jest.fn((url, body) => {
    return Promise.resolve({
      data: {
        status: "SUCCESS",
        message: "Loaded tasks",
        data: [
          {
            id: 1,
            name: "腕立て10回",
            day: 0,
            week: 0,
            days_a_week: 0,
            running_days: 0,
            running_weeks: 0,
            last_time: "2022-12-03",
            user_id: 19,
            created_at: "2022-11-26T21:24:17.818+09:00",
            updated_at: "2022-12-03T09:43:32.673+09:00",
          },
          {
            id: 2,
            name: "腹筋10回",
            day: 0,
            week: 0,
            days_a_week: 0,
            running_days: 0,
            running_weeks: 0,
            last_time: "2022-12-03",
            user_id: 19,
            created_at: "2022-11-26T21:24:17.818+09:00",
            updated_at: "2022-12-03T09:43:32.673+09:00",
          },
          {
            id: 3,
            name: "ランニング",
            day: 0,
            week: 0,
            days_a_week: 0,
            running_days: 0,
            running_weeks: 0,
            last_time: "2022-12-03",
            user_id: 19,
            created_at: "2022-11-26T21:24:17.818+09:00",
            updated_at: "2022-12-03T09:43:32.673+09:00",
          },
        ],
      },
      status: 200,
    });
  }),
  post: jest.fn((url, body) => {
    console.log(url, body);
    return Promise.resolve({
      data: {
        data: {
          level: 1,
          exp: 6,
        },
      },
      status: 200,
    });
  }),
}));

describe("LoginPage", () => {
  const localVue = createLocalVue();
  localVue.component("ValidationObserver", ValidationObserver);
  localVue.component("ValidationProvider", ValidationProvider);
  localVue.use(Vuex);
  let store = new Vuex.Store({
    state: {
      tasks: [],
    },
    mutations: {
      setTasks(state, data) {
        state.authenticated = data;
      },
    },
  });
  localVue.use(VueRouter);
  let vuetify;
  let wrapper;

  beforeEach(() => {
    vuetify = new Vuetify();
    wrapper = mount(RecordPage, {
      localVue,
      vuetify,
      store,
    });
  });

  it("ページタイトルがある", () => {
    expect(wrapper.html()).toContain("記録");
  });

  it("タスクの取得が正常にできるか", async () => {
    expect(wrapper.vm.tasks.length).toBe(3);
    expect(wrapper.vm.displayList.length).toBe(3);
    expect(wrapper.vm.tasks[0].name).toBe("腕立て10回");
    expect(wrapper.vm.tasks[1].name).toBe("腹筋10回");
    expect(wrapper.vm.tasks[2].name).toBe("ランニング");
    expect(wrapper.vm.displayList[0].name).toBe("腕立て10回");
    expect(wrapper.vm.displayList[1].name).toBe("腹筋10回");
    expect(wrapper.vm.displayList[2].name).toBe("ランニング");
  });

  it("タスクが正しく表示されている", () => {
    expect(wrapper.html()).toContain("腕立て10回");
    expect(wrapper.html()).toContain("腹筋10回");
    expect(wrapper.html()).toContain("ランニング");
  });

  it("記録が正常にできるか", async () => {
    await wrapper.vm.record(0, 1);
    wrapper.vm.$nextTick();
    expect(wrapper.vm.nowLvExp).toBe(6);
  });
});
