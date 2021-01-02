<template>
  <div class="btnparent" @click="registerclick">
      <div class="loginbtn">{{btntext}}</div>
  </div>
</template>

<script>
export default {
    props: ['btntext'],
    methods: {
        registerclick() {
            this.$emit('registerSubmit')
        }
    }
}
</script>

<style>
.btnparent {
    padding: 4.167vw 2.778vw;
}
.loginbtn {
    height: 12.5vw;
    background-color: #ff9db5;
    border-radius: 6.25vw;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
}
</style>