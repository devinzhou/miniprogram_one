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
        <div class="weui-grid_item" v-for="item in secondPartData.items">
          <image class="weui-grid__icon"  :src="item.imageUrl" resize="stretch"></image>
          <p class="weui-grid__label" style="font-size: 24rpx;text-align: left;">{{item.title}}</p>
        </div>
      </div>
      <div style="width: 100%; height: 20rpx;background-color: #f6f6f6; margin-top: 10rpx;"></div>
    </cell>

    <!-- 第三部分 -->
    <cell>
      <div class="normal-items-title" v-if="thirdPartData && thirdPartData.items && thirdPartData.items.length > 0">
        <text class="normal-items-title-text">{{thirdPartData.title}}</text>
      </div>
      <div style="overflow: hidden;padding-left:20rpx;padding-right: 20rpx;" v-if="thirdPartData && thirdPartData.items && thirdPartData.items.length > 0">
        <div class="feed-item" v-for="item in thirdPartData.items">
          <image style="height: 120rpx;width: 120rpx; display: inline-block;" :src="item.headerUrl"></image>
          <div class="feed-item-content">
            <text class="feed-item-title" style="">{{item.title}}</text>
            <text class="feed-item-desc">{{item.desc}}</text>
          </div>
        </div>
      </div>
      <div style="width: 100%; height: 20rpx;background-color: #f6f6f6; margin-top: 10rpx;"></div>
    </cell>
  </list>
</template>

<script>
import { formatTime } from '@/utils/index'
import card from '@/components/card'

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
        items: [
          {
            imageUrl:'https://s1.ax1x.com/2018/06/18/CxYt76.png',
            title:'头疼',
            id:'1'
          },
          {
            imageUrl:'https://s1.ax1x.com/2018/06/18/CxYJn1.png',
            title:'关节疼',
            id:'2'
          },
          {
            imageUrl:'https://s1.ax1x.com/2018/06/18/CxYY0x.png',
            title:'拖延症',
            id:'3'
          },
        ]
      },
      thirdPartData: {
        title: '即将上线 & 用户体验',
        items: [
          {
            id: 'item id',
            desc: 'Around the world，music therapy(疗法) is being used to treat different medical conditions and illnesses. Some of the ways people use music therapy are to reduce pain，such as in childbirth or during cancer treatments，or to stimulate brain activity after an injury or money loss. ',
            title: '最新的可以体验功能',
            createdTime: '2018-3-28',
            praiseCount: 111,
            headerUrl: 'https://s1.ax1x.com/2018/06/18/CxYt76.png',
            user: {
              nickName: '暖暖',
              nickIcon: '',
            }
          },
          {
            id: 'item id',
            desc: 'Around the world，music therapy(疗法) is being used to treat different medical conditions and illnesses. Some of the ways people use music therapy are to reduce pain，such as in childbirth or during cancer treatments，or to stimulate brain activity after an injury or money loss. ',
            title: '用户体验',
            createdTime: '2018-3-28',
            praiseCount: 111,
            headerUrl: 'https://s1.ax1x.com/2018/06/18/CxYt76.png',
            user: {
              nickName: '暖暖',
              nickIcon: '',
            }
          }
        ]
      },
      comments: {

      }
    }
  },

  created () {
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
