<template>
  <div class="userinfo">
    <nav-bar :userInfo="model"></nav-bar>
    <img src="@/assets/bannerTop_new.png" alt="" class="backImg" />
    <user-detail :userInfo="model" />
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar.vue";
import userDetail from "@/components/userComponent/userDetail.vue";
export default {
  data() {
    return {
      model: {},
    };
  },
  components: {
    NavBar,
    userDetail,
  },
  methods: {
    async UserinfoData() {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.model = res.data[0];
    },
  },
  created() {
    if (localStorage.getItem("token")) {
      this.UserinfoData();
    }
  },
};
</script>

<style lang = 'less'>
.userinfo {
  .backImg {
    height: 91px;
    width: 100%;
  }
}
</style>