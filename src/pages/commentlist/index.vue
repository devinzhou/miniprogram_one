<template>
  <scroll-view scroll-y class="list" :style="{height: windowHeight + 'px'}" @scrolltolower="scrolltolower">
    <card v-for="(item, index) in allData" :item="item"></card>
  </scroll-view>
</template>

<script>
import card from '@/components/comment-item-view';
import requestUtils from '@/utils/request';
var app = getApp();

//windowHeight
export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {},
      allData: [],
      currentPage: 0,
      pageSize: 20,
      hasMore: true,
      windowHeight: wx.getSystemInfoSync().windowHeight
    }
  },
  components: {
    card
  },

  methods: {
    scrolltolower: function (event) {
      if (!this.hasMore) return;
      this.loadData(this.currentPage);
    },
    loadData(index) {
      let that = this;
      if (this.currentPage == index){
        requestUtils.userCommentList(this.currentPage, this.pageSize, app.userInfo.id, function (res) {
          if (res.data.success) {
            that.allData.push(...res.data.data);

            if (!res.data.data || res.data.data.length < 1) {
              that.hasMore = false;
            }
          }
        });
        this.currentPage ++;
      }
    }
  },

  created () {
    this.windowHeight = wx.getSystemInfoSync().windowHeight;
  },
  mounted(){
    this.loadData(this.currentPage);
  }
}
</script>

<style scoped>
.list {
  width: 100%;
  height: 100%;
}
</style>
