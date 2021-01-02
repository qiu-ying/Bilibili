<template>
  <div v-if="category">
    <nav-bar></nav-bar>
    <div class="categorytab">
      <div class="category-ico" @click="$router.push('/editcategory')">
        <van-icon name="setting-o" />
      </div>
      <van-tabs v-model="active" swipeable sticky>
        <van-tab
          v-for="(item, index) in category"
          :key="index"
          :title="item.title"
        >
          <van-list
            v-model="item.loading"
            :immediate-check="false"
            :finished="item.finished"
            finished-text="我也是有底线的"
            @load="onLoad"
          >
            <div class="detailparent">
              <cover
                class="detail"
                :detailitem="categoryitem"
                v-for="(categoryitem, categoryindex) in item.list"
                :key="categoryindex"
              />
            </div>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar.vue";
import Cover from "@/views/Cover.vue";
export default {
  data() {
    return {
      category: [],
      active: 0,
    };
  },
  components: {
    NavBar,
    Cover,
  },
  activated() {
    if(localStorage.getItem('newCat')) {
      let newCat = JSON.parse(localStorage.getItem('newCat'))
      this.category = this.changeCategory(newCat)
      this.selectAticle()
    }
  },
  methods: {
    async selectCategory() {
      if(localStorage.getItem('newCat')) {
        return
      }
      const res = await this.$http.get("/category");
      this.changeCategory(res.data);
    },
    changeCategory(data) {
      const category1 = data.map((item, index) => {
        item.list = [];
        item.finished = false;
        item.loading = false;
        item.page = 0;
        item.pagesize = 10;
        return item;
      });
      return category1;
      this.category = category1;
      this.selectAticle();
    },
    async selectAticle() {
      const categoryItem = this.categoryItem();
      const res = await this.$http.get("/detail/" + categoryItem._id, {
        params: {
          page: categoryItem.page,
          pagesize: categoryItem.pagesize,
        },
      });
      categoryItem.list.push(...res.data);
      categoryItem.loading = false;
      if (res.data.length < 10) {
        categoryItem.finished = true;
      }
    },
    onLoad() {
      const categoryitem = this.categoryItem();
      setTimeout(() => {
        categoryitem.page += 1;
        this.selectAticle();
      }, 1000);
    },
    categoryItem() {
      const categoryItem = this.category[this.active];
      return categoryItem;
    },
  },
  watch: {
    active() {
      this.selectAticle();
    },
  },
  created() {
    this.selectCategory();
  },
};
</script>

<style lang = 'less'>
.detailparent {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .detail {
    margin: 5px 0;
    width: 45%;
  }
}
.categorytab {
  position: relative;
  .category-ico {
    position: absolute;
    z-index: 5;
    right: 0;
    top: 1.944vw;
    padding: 1.389vw 2.778vw;
    background-color: white;
  }
}
</style>
