<template>
    <div>
        {{ num }}
    </div>
</template>
<script>
    export default {
        data () {
            return {
                num: 0
            }
        },
        created () {
            this.$bus.on('add', (val) => {
                this.num = val;
            })
        }
    }
</script>