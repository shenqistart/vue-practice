// 插件的写法
const install = function (Vue) {
    const Bus = new Vue({
        methods: {
            // 提交数据
            emit (event, ...args) {
                this.$emit(event, ...args);
            },
            on (event, callback) {
                this.$on(event, callback);
            },
            off (event, callback) {
                this.$off(event, callback);
            }
        },
        data () {

        },
        computed: {

        }
    });
// 继承到vue实例中
    Vue.prototype.$bus = Bus;
};

export default install;