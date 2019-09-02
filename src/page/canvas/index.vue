<template>
    <div>
      <Demo1></Demo1>
    </div>
</template>

<script>
    export default {
     components: {
       Demo1: () => import('./component/demo2')
     }
    }
</script>

<style scoped>

</style>
