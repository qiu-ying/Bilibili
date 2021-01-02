<template>
  <div class="NavBar">
    <div class="left">
      <img src="@/assets/logo.png" alt="" @click="$router.push('/')" />
    </div>
    <div class="midle">
      <div class="serach">
        <van-icon name="search" />
        <p>请输入搜索内容</p>
      </div>
    </div>
    <div class="right">
      <p>
        <!-- <img src="imgUrl" alt="" v-if="imgUrl"> -->
        <!-- <img src="userInfo.user_img" alt="" v-if="userInfo.user_img"> -->
        <img
          :src="imgUrl"
          alt=""
          @click="$router.push('/userinfo')"
          v-if="imgUrl"
        />
        <img
          src="@/assets/default_img.jpg"
          alt=""
          @click="$router.push('/login')"
          v-else
        />
        <!-- <img :src="this.imgUrl[0].user_img" alt="" @click="$router.push('/edit')" v-if="this.imgUrl[0].user_img"> -->
        <!-- <img src="@/assets/default_img.jpg" alt="" @click="$router.push('/edit')" v-else> -->
      </p>
      <div class="download">下载App</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgUrl: "",
    };
  },
  async mounted() {
    if (localStorage.getItem("token")) {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.imgUrl = res.data[0].user_img;
    }
  },
};
</script>

<style lang = 'less'>
.NavBar {
  height: 12.778vw;
  background-color: white;
  display: flex;
  .left {
    width: 17.611vw;
    padding: 2.222vw 0;
    img {
      height: 100%;
    }
  }
  .midle {
    flex: 1;
    .serach {
      margin: 2.5vw 0;
      width: 43.333vw;
      height: 7.222vw;
      background-color: #f4f4f4;
      border-radius: 3.611vw;
      position: relative;
      color: #666;
      font-size: 3.333vw;
      line-height: 7.222vw;
      p {
        position: absolute;
        margin: 0;
        top: 0.278vw;
        left: 5.556vw;
      }
      .van-icon::before {
        position: absolute;
        top: -2.5vw;
        left: 1.667vw;
      }
    }
  }
  .right {
    display: flex;
    position: relative;
    width: 41.944vw;
    height: 8.056vw;
    margin: 2.222vw 1.389vw;
    p {
      width: 6.944vw;
      height: 6.944vw;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .download {
      position: absolute;
      right: 0.833vw;
      width: 26.778vw;
      height: 8.056vw;
      background-color: #ff9db5;
      font-size: 3.333vw;
      color: #fff;
      display: flex;
      justify-content: center;
      line-height: 8.056vw;
      border-radius: 0.833vw;
    }
  }
}
</style>