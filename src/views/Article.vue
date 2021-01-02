<template>
  <div v-if="model">
    <nav-bar></nav-bar>
    <div class="detailinfo">
      <div class="video">
        <video controls="controls" :src="model.content"></video>
      </div>
      <div class="detailinfotext">
        <div>
          <span>{{ model.category.title }}</span>
          <span>{{ model.name }}</span>
        </div>
        <div>
          <span>{{ model.userinfo.name }}</span>
          <span>146.4万次观看</span>
          <span>5281弹幕</span>
          <span>{{ model.date }}</span>
        </div>
        <div>
          <p @click="collectionClick" :class="{activecolor: collectActive}">
            <span class="icon-star-full"></span>
            <span>收藏</span>
          </p>
          <p @click="subscriptClick" :class="{activecolor: subscripActive}">
            <span class="icon-bubble"></span>
            <span>关注</span>
          </p>
          <p>
            <span class="icon-redo2"></span>
            <span>分享</span>
          </p>
        </div>
      </div>
      <div class="detailparent">
        <cover
          class="item"
          v-for="(item, index) in commendList"
          :key="index"
          :detailitem="item"
        />
      </div>
      <comment-title :datalength="lens" @Postcomment="postsuccess" ref="commentIpt" />
      <comment @lengthselect="(len) => (lens = len)" @publishClick = 'postChildClick' ref="commentPulish" />
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar.vue";
import cover from "./Cover";
import commentTitle from "@/components/article/commentTitle.vue";
import comment from "@/components/article/comment.vue";
export default {
  data() {
    return {
      model: null,
      commendList: null,
      myuser: null,
      lens: null,
      postcom: {
        comment_content: '',
        comment_date: '',
        article_id: null,
        parent_id: null
      },
      collectActive: false,
      subscripActive: false
    };
  },
  components: {
    NavBar,
    cover,
    commentTitle,
    comment,
  },
  methods: {
    async articleitemData() {
      const res = await this.$http.get("/article/" + this.$route.params.id);
      this.model = res.data[0];
      if(this.model) {
        this.subscripInit()
      }
    },
    async commendData() {
      const res = await this.$http.get("/commend");
      this.commendList = res.data;
    },
    async postsuccess(res) {
      const date = new Date();
      let m = date.getMonth() + 1;
      if (m < 10) {
        m = "0" + m;
      }
      let d = date.getDate();
      if (d < 10) {
        d = "0" + d;
      }
      let str = `${m}-${d}`;
      this.postcom.comment_content = res
      this.postcom.comment_date = str
      this.postcom.article_id = this.$route.params.id
      const result = await this.$http.post('/comment_post/' + localStorage.getItem('id'),this.postcom)
      this.$refs.commentPulish.commentData()
      this.postcom.parent_id = ''
      if(result.status == 200) {
        this.$msg.fail('评论发表成功')
      }
    },
    postChildClick(id) {
      this.postcom.parent_id = id
      this.$refs.commentIpt.focusipt()
    },
    async collectionClick() {
      if(localStorage.getItem('token')) {
        const res = await this.$http.post('/collection/' + localStorage.getItem('id'),{article_id: this.$route.params.id})
        if(res.data.msg = '收藏成功') {
          this.collectActive = !this.collectActive
        }
        }
      },
    async collectionInit() {
      if(localStorage.getItem('token')) {
        const res =await this.$http.get('/collection/' + localStorage.getItem('id'), {
          params: {
            article_id: this.$route.params.id
          }
        })
        this.collectActive = res.data.success
      }
    },
    async subscriptClick() {
      if(localStorage.getItem('token')) {
        const res = await this.$http.post('/sub_scription/' + localStorage.getItem('id'),{sub_id: this.model.userid})
        if(res.data.msg = '关注成功') {
          this.subscripActive = !this.subscripActive
        }
        }
      },
    async subscripInit() {
      if(localStorage.getItem('token')) {
        const res =await this.$http.get('/sub_scription/' + localStorage.getItem('id'), {
          params: {
            sub_id: this.model.userid
          }
        })
        this.subscripActive = res.data.success
      }
    }
    },
  created() {
    this.articleitemData();
    this.commendData();
    this.collectionInit()
  },
  watch: {
    $route() {
      this.articleitemData();
      this.commendData();
      this.collectionInit()
    },
  },
};
</script>

<style lang = 'less'>
.detailinfo {
  background-color: white;
  .video {
    width: 100%;
    video {
      width: 100%;
    }
  }
  .detailinfotext {
    padding: 4.167vw;
    div:nth-child(1) {
      font-size: 3.889vw;
      span:nth-child(1) {
        padding: 2.778vw;
        color: #fb7299;
        background-color: #f4f4f4;
        border-radius: 2.5vw;
      }
    }
    div:nth-child(2) {
      padding: 2.778vw;
      span {
        color: #aaa;
        font-size: 3.333vw;
        margin-right: 4.167vw;
      }
      span:nth-child(1) {
        font-size: 4.444vw;
        color: black;
        padding-right: 2.778vw;
      }
    }
    div:nth-child(3) {
      padding-left: 1.389vw;
      display: flex;
      p {
        margin-right: 4.167vw;
        color: #757575;
        display: flex;
        align-items: center;
        span:nth-child(1) {
          font-size: 5.556vw;
        }
        span:nth-child(2) {
          font-size: 3.333vw;
        }
      }
      .activecolor {
        color: #fb7299;
      }
    }
  }
}
.detailparent {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .detail {
    margin: 5px 0;
    width: 45%;
  }
}
</style>