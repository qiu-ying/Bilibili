<template>
  <div @click="pathpush">
    <div class="detailItem">
      <div class="imgparent">
        <img :src="detailitem.img" alt="" style="width: 100%" />
        <div class="bottom">
          <div class="icon-play2"><span class="video">1234</span></div>
          <div class="icon-file-text">
            <span class="comment">{{
              !detailitem.commentlen ? 666 : detailitem.commentlen
            }}</span>
          </div>
        </div>
      </div>
      <p>{{ detailitem.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["detailitem"],
  methods: {
    pathpush() {
      if (this.$route.path != "`/article/${this.detailitem.id}`") {
        this.$router.push(`/article/${this.detailitem.id}`);
      }
    },
  },
};
</script>

<style lang = 'less'>
.detailItem {
  p {
    font-size: 3.333vw;
  }
  .imgparent {
    position: relative;
    height: 98.96px;
    width: 168.84px;
    .bottom {
      position: absolute;
      bottom: 0.833vw;
      display: flex;
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.85), transparent);
      justify-content: space-between;
      color: white;
      left: 0;
      right: 0;
    }
  }
}
</style>