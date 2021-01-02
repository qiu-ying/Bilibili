<template>
  <div>
    <div style="margin-bottom: 10px"><nav-bar></nav-bar></div>
    <div class="editViews">
    <div class="uploadfile">
      <van-uploader class="uploadimg" :after-read="afterRead" preview-size='100vw' />
      <edit-banner left="头像">
      <img :src="model.user_img" alt="" slot="right" v-if="model.user_img" />
      <img src="@/assets/default_img.jpg" alt="" slot="right" v-else />
    </edit-banner>
    </div>
    </div>
    <edit-banner left="昵称" @bannerClick = 'show = true'>
      <a href="javascript:;" slot="right">{{ model.name }}</a>
    </edit-banner>
    <edit-banner left="账号">
      <a href="javascript:;" slot="right">{{ model.username }}</a>
    </edit-banner>
    <edit-banner left="性别"  @bannerClick = 'gendershow = true'>
      <a href="javascript:;" slot="right">{{ model.gender == 1 ? '男' : '女' }}</a>
    </edit-banner>
    <edit-banner left="个性签名" @bannerClick = 'textshow = true'></edit-banner>
    <div class="editback" @click="$router.back()">返回个人中心</div>


  <van-dialog v-model="show" 
  title="昵称" 
  show-cancel-button 
  @confirm = 'confirmClick'
  @cancel = "content = ''"
  >
  <van-field v-model="content" autofocus />
  </van-dialog>

  <van-dialog v-model="textshow" 
  title="个性签名" 
  show-cancel-button 
  @confirm = 'textareaClick'
  @cancel = "content = ''"
  >
  <van-field v-model="content" type = textarea autofocus />  
  </van-dialog>

<van-action-sheet v-model="gendershow" cancel-text="取消" :actions="actions" @select="onSelect" />

  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar.vue";
import editBanner from "@/components/common/editBanner.vue";
export default {
  data() {
    return {
      model: {},
      show: false,
      textshow: false,
      gendershow: false,
      content: '',
      actions: [{ name: '男',val:1 }, { name: '女', val :2 }]
    }
  },
  components: {
    NavBar,
    editBanner,
  },
  methods: {
    async selectUser() {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.model = res.data[0];
    },
    async afterRead(file) {
        const fromdata = new FormData
        fromdata.append('file',file.file)
        const res = await this.$http.post('/upload',fromdata)
        this.model.user_img = res.data.url
        this.UserUpdate()
    },
    async UserUpdate() {
        const res = await this.$http.post('/update/' + localStorage.getItem('id'),this.model)
        if(res.data.code == 200) {
            this.$msg.fail('修改成功')
        }
    },
    confirmClick() {
        this.model.name = this.content
        this.UserUpdate()
        this.content = ''
    },
    textareaClick() {
        this.model.user_desc = this.content 
        this.UserUpdate()
        this.content = ''
    },
    onSelect(data) {
        this.model.gender = data.val
        this.UserUpdate()
        this.gendershow = false
    }
  },
  created() {
    this.selectUser();
  },
};
</script>

<style lang = 'less'>
div a {
  color: #333;
}
.editViews img {
  height: 12.778vw;
  width: 12.778vw;
  border-radius: 50%;
}
.uploadfile {
    position: relative;
    overflow: hidden;
    .uploadimg {
        opacity: 0;
        position: absolute;
    }
}
.editback {
  background-color: white;
  margin-top: 5.556vw;
  padding: 4.167vw 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999;
  font-size: 3.889vw;
}
</style>