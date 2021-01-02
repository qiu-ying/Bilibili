<template>
  <div class="userdetail">
    <div>
      <div class="userImg">
        <img :src="userInfo.user_img" alt="" v-if="userInfo.user_img">
        <img src="@/assets/default_img.jpg" alt="" v-else />
      </div>
      <div class="user_edit">
        <div>
          <p>
            <span>0</span>
            <span>粉丝</span>
          </p>
          <p>
            <span>54</span>
            <span>关注</span>
          </p>
          <p>
            <span>0</span>
            <span>获赞</span>
          </p>
        </div>
        <div class="user_editBtn" @click="$router.push('/edit')">编辑资料</div>
      </div>
    </div>
    <div class="usercontent">
      <h2>小风_</h2>
      <p>这个人很懒，什么都没有写</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['userInfo']
};
</script>

<style lang = 'less'>
.userdetail {
  background-color: white;
  padding: 0 3.333vw;
  > div {
    display: flex;
  }
  .userImg {
    margin-right: 5.556vw;
    img {
      width: 23.611vw;
      height: 23.611vw;
      border-radius: 50%;
    }
  }
  .user_edit {
    position: relative;
    flex: 1;
    div:nth-child(1) {
      display: flex;
      p {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        font-size: 3.611vw;
        color: #666;
      }
      p:nth-child(1),
      p:nth-child(2) {
        border-right: 0.278vw solid #ccc;
      }
    }
    .user_editBtn {
      position: absolute;
      right: 2.778vw;
      border: 0.278vw solid #fb7a9f;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1.389vw;
      width: 55.556vw;
      color: #fb7a9f;
      border-radius: 1.389vw;
    }
  }
  .usercontent {
    display: flex;
    flex-direction: column;
    h2 {
      font-size: 5vw;
      margin: 2.778vw 0;
      font-weight: 400;
    }
    p {
      font-size: 3.611vw;
      margin: 0;
      color: #999;
    }
  }
}
</style>