<template>
  <div @click="bannerClick">
    <div class="editbanner">
      <span> {{ left }} </span>
      <span> <slot name="right" /> </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["left"],
  methods: {
      bannerClick() {
          this.$emit('bannerClick')
      }
  }
};
</script>

<style>
.editbanner {
  background-color: white;
  padding: 4.167vw;
  color: #333;
  border-bottom: 0.278vw solid #eee;
  font-size: 3.889vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>