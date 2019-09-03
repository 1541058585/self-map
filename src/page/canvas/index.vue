<template>
    <div>
      <Demo></Demo>
    </div>
</template>

<script>
    export default {
     components: {
       Demo: () => import('./component/demo3')
     }
    }
</script>

<style scoped>

</style>
