<template>
  <list>
    <header>
      <swiper
        :indicator-dots="indicatorDots" :autoplay="autoplay" :circular="circular" :vertical="vertical"
        :interval="interval" :duration="duration">
        <swiper-item v-for="item in backgroundList">
          <image style="width: 750rpx; height: 350rpx;" :src="item.url" resize="stretch"></image>
        </swiper-item>
      </swiper>
      <div style="width: 100%; height: 20rpx;background-color: #f6f6f6;"></div>
    </header>
    <!-- 第二部分 -->
    <cell>
      <div class="normal-items-title" v-if="secondPartData && secondPartData.items && secondPartData.items.length > 0">
        <text class="normal-items-title-text">{{secondPartData.title}}</text>
      </div>
      <div style="overflow: hidden;padding-left:10rpx;padding-right: 20rpx;" v-if="secondPartData && secondPartData.items && secondPartData.items.length > 0">
        <div class="weui-grid_item" v-for="(item, index) in secondPartData.items" @click="onChannelClick(item, $event)">
          <image class="weui-grid__icon"  :src="item.imageUrl" resize="contain"></image>
          <p class="weui-grid__label" style="font-size: 24rpx;text-align: left;">{{item.title}}</p>
        </div>
      </div>
      <div style="width: 100%; height: 20rpx;background-color: #f6f6f6; margin-top: 10rpx;"></div>
    </cell>

    <!-- 第三部分 -->
    <cell>
      <div style="clear: both; height: 280rpx;">
        <div class="normal-items-title" v-if="thirdPartData && thirdPartData.items && thirdPartData.items.length > 0">
          <text class="normal-items-title-text">{{thirdPartData.title}}</text>
        </div>
        <div class="weui-grid_item" v-for="(item, index) in thirdPartData.items" @click="onChannelClick(item, $event)">
          <image class="weui-grid__icon"  :src="item.imageUrl" resize="contain"></image>
          <p class="weui-grid__label" style="font-size: 24rpx;text-align: left;">{{item.title}}</p>
        </div>
      </div>
    </cell>
    <!-- 精选评论 -->
    <cell v-if="comments && comments.items && comments.items.length > 0">
      <div style="width: 100%; height: 20rpx;background-color: #f6f6f6; margin-top: 10rpx;"></div>
      <div>
        <div class="normal-items-title">
          <text class="normal-items-title-text">{{comments.title}}</text>
        </div>
        <div v-for="(item, index) in comments.items">
          <card :item="item"></card>
        </div>
      </div>
    </cell>
  </list>
</template>

<script>
import { formatTime } from '@/utils/index'
import card from '@/components/comment-item-view';

var app = getApp();

export default {
  components: {
    card
  },
  data () {
    return {
      indicatorDots: true,
      vertical: false,
      autoplay: true,
      circular: true,
      interval: 2000,
      duration: 500,
      previousMargin: 0,
      nextMargin: 0,
      backgroundList:[
        {
          url:'https://s1.ax1x.com/2018/06/18/CxYt76.png'
        },
        {
          url:'https://s1.ax1x.com/2018/06/18/CxYJn1.png'
        },
        {
          url:'https://s1.ax1x.com/2018/06/18/CxYY0x.png'
        }
      ],
      secondPartData: {
        title: '立竿见影的帮助',
        items: []
      },
      thirdPartData: {
        title: '即将上线 & 用户体验',
        items: []
      },
      comments: {
        title: '精选评论',
        items:[]
      },
    }
  },
  created () {
    app.onReceiveData = this.onReceiveData;
    this.onReceiveData();
  },
  mounted(){
  },
  onHide() {
  },
  onTabItemTap() {
  },
  methods: {
    onReceiveData(){
      if (!app || !app.homepageData) {
        return;
      }
      this.secondPartData.items = app.homepageData.firstPartData;
      this.thirdPartData.items = app.homepageData.secondPartData;
      this.comments.items = app.homepageData.testThemeCommentList;
    },
    onChannelClick(item, event) {
      if (!item) return;
      console.log("on channel click : " + item);

      if (item.test && (!app.userInfo || !app.userInfo.testUser)) {
        wx.showModal({
          title:"当前功能仅开放给实验用户!",
          showCancel:false
        });
        return;
      }

      app.playChannel = item.id;
      wx.switchTab({
        url:'/pages/playerpage2/main'
      })
    }
  }
}
</script>

<style>
  @import "../../../static/css/base_css.wxss";

  .normal-items-title{
    margin-left: 20rpx;
    margin-top: 20rpx;
  }

  .feed-item-content {
    display: flex;
    flex: 1;
    width: 500rpx;
    flex-direction: column;
    margin-left: 10rpx;
    justify-content: space-around;
  }

  .feed-item-title{
    display: -webkit-box;
    overflow: hidden;
    line-height: 30rpx;
    text-overflow:ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 26rpx;
    color: #333333;
  }

  .feed-item-desc{
    height: 52rpx;
    line-height: 26rpx;
    overflow: hidden;
    font-size: 24rpx;
    color: #666666;
    overflow: hidden;
    text-overflow:ellipsis;
    -webkit-line-clamp: 2;

    display: -webkit-box;
    word-break: break-all;
    -webkit-box-orient: vertical;
  }



  .normal-items-title-text{
    height: 90rpx;
    padding-top: 10rpx;
    width: 100%;
    text-align: center;
    font-size: 26rpx;
    font-weight: bold;
  }

  .weui-grid_item{
    float: left;
    width: 229rpx;
    margin-left: 10rpx;
    margin-top: 10rpx;
  }
  .weui-grid__icon {
    display: block;
    width: 100%;
    height: 160rpx;
  }

  .feed-item {
    width: 100%;
    height: 120rpx;
    margin-top: 10rpx;
    display: flex;
    flex-direction: row;
  }

</style>
