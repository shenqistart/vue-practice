<template>
    <div>
        <h1>首页</h1>
        <!--{{ $store.state.count }}-->
        {{ count }}
        <button @click="handleClick">+2</button>
        <button @click="handleD">-1</button>
        {{ filteredList }}

        <button @click="handleActionAdd">action +1</button>


        <Controller></Controller>
        <button @click="handleAdd">随机增加</button>
    </div>
</template>
<script>
    import Controller from './controller.vue';
    export default {
        components: { Controller },
        data () {
            return {}
        },
        computed: {
            count () {
                return this.$store.state.count;
            },
            list () {
                return this.$store.state.list.filter(item => item < 10);
            },
            filteredList () {
                return this.$store.getters.filteredList;
            }
        },
        methods: {
            handleClick () {
                this.$store.commit('increment', 2);
            },
            handleD () {
                this.$store.commit('decrease');
            },
            handleActionAdd () {



                this.$store.dispatch('increment').then(() => {
                    console.log(this.$store.state.count)
                })
            },
            handleAdd () {
                const num = Math.floor(Math.random() * 100 + 1);
                this.$bus.emit('add', num);
            }
        }
    }
</script>