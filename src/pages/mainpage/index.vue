<template>
  <list>
    <header>
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
      <div style="overflow: hidden;padding-left:10rpx;padding-right: 20rpx;" v-if="thirdPartData && thirdPartData.items && thirdPartData.items.length > 0">
        <div class="feed-item" v-for="item in thirdPartData.items">
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
      secondPartData: {
        title: '立竿见影的帮助',
        items: [
          {
            imageUrl:'https://s1.ax1x.com/2018/06/18/CxYt76.png',
            title:'头疼',
            id:'item id'
          },
          {
            imageUrl:'https://s1.ax1x.com/2018/06/18/CxYJn1.png',
            title:'关节疼',
            id:'item id'
          },
          {
            imageUrl:'https://s1.ax1x.com/2018/06/18/CxYY0x.png',
            title:'拖延症',
            id:'item id'
          },
        ]
      },
      thirdPartData: {
        title: '即将上线 & 用户体验',
        list: [
          {
            id: 'item id',
            desc: '',
            createdTime: '2018-3-28',
            praiseCount: 111,
            user: {
              nickName: '暖暖',
              nickIcon: '',
            }
          },
          {
            id: 'item id',
            desc: '',
            createdTime: '2018-3-28',
            praiseCount: 111,
            user: {
              nickName: '暖暖',
              nickIcon: '',
            }
          },
          {
            id: 'item id',
            desc: '',
            createdTime: '2018-3-28',
            praiseCount: 111,
            user: {
              nickName: '暖暖',
              nickIcon: '',
            }
          }
        ]
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
  }

  .normal-items-title-text{
    height: 90rpx;
    padding-top: 10rpx;
    width: 100%;
    text-align: center;
    font-size: 36rpx;
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
  }

</style>
