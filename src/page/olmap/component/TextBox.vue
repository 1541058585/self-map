<template>
    <div class="text-box">
      <input type="text" id="searchKey" @input="changeKey"/>
      <br/>
      <span>输入的结果：{{olmap.getSearchKey()}}</span>
    </div>
</template>

<script>
    /*eslint-disable */
    export default {
      props: {
        olmap: {
          type: Object
        }
      },
      methods: {
        changeKey() {
          let val = document.getElementById('searchKey').value;
          console.log(searchKey);
          this.olmap.setSearchKey(val);
        }
      }
    }
</script>

<style lang="scss" scoped>
  .text-box {
    position: absolute;
    width: auto;
    height: 50px;
    top: 100px;
    left: 10px;
    background: rgba(255, 255, 255, 0);
    transition: top .6s ease;
    z-index: 998;
    border-collapse: separate;
  }
</style>
