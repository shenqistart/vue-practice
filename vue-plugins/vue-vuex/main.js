import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Bus from './vue-bus';
import App from './app.vue';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Bus);

// 路由配置
const Routers = [
    {
        path: '/index',
        meta: {
            title: '首页'
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        path: '/about',
        meta: {
            title: '关于'
        },
        component: (resolve) => require(['./views/about.vue'], resolve)
    },
    {
        path: '/user/:id',
        meta: {
            title: '个人主页'
        },
        component: (resolve) => require(['./views/user.vue'], resolve)
    },
    {
        path: '*',
        redirect: '/index'
    }
];
const RouterConfig = {
    // 使用 HTML5 的 History 路由模式
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    window.document.title = to.meta.title;
    next();
});

router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
});

// 多层的嵌套
const moduleA = {
    state: {},
    mutations: {},
    actions: {},
    getters: {}
};

const moduleB = {
    state: {},
    mutations: {
        a (state) {}
    },
    actions: {

    },
    getters: {
        a (state, getters, rootState) {

        }
    }
};



// store的实例下面建立状态
const store = new Vuex.Store({
    // vuex 配置，基础的就是读和写
    state: {
        count: 0,
        list: [1, 5, 8, 10, 30, 50]
    },
    // 只能显示的调用，而不能在方法中直接等于的去改
    // commit在异步后不知道什么时候触发
    mutations: {
        // es6写法n的默认值是1
        increment (state, n = 1) {
            state.count += n;
        },
        decrease (state) {
            state.count --;
        }
    },
    // 类比计算属性
    getters: {
        // 原本的
        filteredList: (state) => {
            return state.list.filter(item => item > 10);
        },
        // 在自己的基础上用其他的getter
        filteredList: (state, getters) => {
            return state.list.filter(item => item > 10);
        },
        xxx: state => {

        }
    },
    // 处理异步的做法和mutation很像
    actions: {
        increment (context) {
            // pending\resolved\rejected

            // const p = new Promise((resolve, reject) => {
            //     setTimeout(() => {
            //         const random = Math.random();
            //         if (random > 0.5) {
            //             resolve(random);
            //         } else {
            //             reject(random);
            //         }
            //     }, 1000);
            // });
            //
            // p.then(val => {
            //     console.log(val);
            // }).catch(val => {
            //     console.log(val);
            // });
            return new Promise(resolve => {
                setTimeout(() => {



                    context.commit('increment');
                    resolve();
                }, 1000);
            })
            // setTimeout(() => {
            //     callback();
            // }, 1000)
        }
    },
    // 在vuex还有这些东西
    modules: {
        a: moduleA,
        b: moduleB
    }
});

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => {
        return h(App)
    }
});