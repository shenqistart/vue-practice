<template>
    <div>
        个人主页
        {{ $route.params.id }}
    </div>
</template>
<script>
    export default {
        mounted () {
            console.log(this.$route)
        }
    }
</script>