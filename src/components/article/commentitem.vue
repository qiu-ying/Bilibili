<template>
  <div class="commentitem">
    <div class="commentItem" v-for="(item, index) in commentchild" :key="index">
      <div class="userImg">
        <img
          v-if="item.userinfo && item.userinfo.user_img"
          :src="item.userinfo.user_img"
          alt=""
        />
        <img v-else src="@/assets/default_img.jpg" alt="" />
        <p>
          <span v-if="item.userinfo">{{ item.userinfo.name }}</span>
          <span v-else>此用户无姓名</span>
          <span>{{ item.comment_date }}</span>
        </p>
      </div>
      <div class="comentcontent">
        <div v-if="!temp">
          {{ item.comment_content }}
          <span class="publish" @click="postItemcomment(item.comment_id)"
            >回复</span
          >
        </div>
        <div v-else>
          回复<span style="color: #478ef0">{{
            item.parent_user_info.name
          }}</span
          >{{ item.comment_content }}
          <span class="publish" @click="postItemcomment(item.comment_id)"
            >回复</span
          >
        </div>
      </div>
      <div>
        <commentchild-item
          :commentchild="item.child"
          :temp="true"
          @postchild="postchild"
        ></commentchild-item>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "commentchildItem",
  props: ["commentchild", "temp"],
  methods: {
    postItemcomment(id) {
      this.$emit("postchild", id);
      this.$emit("postpublish", id);
    },
    postchild(id) {
      this.postItemcomment(id);
      this.$emit("postpublish", id);
    },
  },
};
</script>

<style scoped lang = 'less'>
.commentitem {
  .commentItem {
    display: flex;
    flex-direction: column;
  }
  .userImg {
    display: flex;
    img {
      margin: 0 1.389vw 2.778vw 0;
    }
    p {
      flex: 1;
      font-size: 3.611vw;
      color: #555;
      display: flex;
      justify-content: space-between;
      margin-bottom: 1.389vw;
    }
  }
  .comentcontent {
    position: relative;
    .publish {
      position: absolute;
      font-size: 3.611vw;
      right: 1.389vw;
      color: red;
    }
  }
}
</style>