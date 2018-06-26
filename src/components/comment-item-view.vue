<template>
  <div class="container">
      <image class="header" :src="item.userImageUrl ? item.userImageUrl : images.defaultIcon" resize="stretch"></image>
      <div style="flex: 1; display: flex; flex-direction: column;margin-left: 15rpx;">
        <div style="display: flex; justify-content: space-between;">
          <text class="title">{{item.userName}} </text>
          <div style="display: flex;flex-direction: row; height: 40rpx;justify-items: center;margin-top: 8rpx;" @click="clickThumb">
            <image class="priase-icon" :src="isPraise ? images.praisedIcon : images.praisedUnchecked"></image>
            <text class="priase-text" :style="{ color: priaseColor }">{{praiseNum}}</text>
          </div>
        </div>
        <text class="content">{{ item.commentInfo }}</text>
        <text class="time-stamp">{{commentTime}}</text>
      </div>
  </div>
</template>
<script>

  import defaultIcon from './img/default_head.png';
  import praisedIcon from './img/priased.png';
  import praisedUnchecked from './img/priase_unchecked.png';

  import request from '../utils/request';

export default {
  props: {
    item: {
      type: Object,
      default: {
        "userImageUrl":"",
        "themeId":0,
        "updateTime": 0,
        "type":1,
        "userName":"",
        "userId":0,
        "insertTime":0,
        "commentInfo":"",
        "deleted":false,
        "thumbNum":0,
        "id":7642,
        "selected":true,
        "thumbed": false
      }
    }
  },
  data() {
    return {
      images: {
        defaultIcon,
        praisedIcon,
        praisedUnchecked
      },
      isPraise: this.item.thumbed,
      priaseColor: '#333333',
      commentTime: this.item &&  this.timeToDate(this.item.updateTime),
      praiseNum: this.item.thumbNum
    }
  },
  watch: {
    item: function (newValue) {
      if (!newValue) {
        return;
      }
      this.isPraise = newValue.isPraise;
      this.commentTime = this.timeToDate(newValue.updateTime);
    }
  },
  methods: {
    timeToDate(createTime) {
      let currentTime = (new Date().getTime()) / 1000;
      let deltaTime = currentTime - createTime / 1000;
      if (deltaTime < 60) {
        return '刚刚'
      }
      if (deltaTime < 3600) {
        return parseInt(deltaTime / 60) + '分钟前'
      }
      if (deltaTime < 86400) {
        return parseInt(deltaTime / 3600) + '小时前'
      }

      let today = new Date()
      today.setHours(0)
      today.setMinutes(0)
      today.setSeconds(0)
      today.setMilliseconds(0)
      let TodayStartedTime = Date.parse(today) / 1000;

      let todayStartTime = TodayStartedTime;
      let deltaYesterday = currentTime - (todayStartTime - 86400)
      if (deltaTime < deltaYesterday) {
        return '昨天'
      }
      if (deltaTime < 86400 * 7) {
        return parseInt(deltaTime / 86400) + '天前'
      }
      let currDate = new Date(currentTime * 1000)
      let currYear = currDate.getFullYear()
      let createData = new Date(createTime)
      let createYear = createData.getFullYear()
      let createMonth = createData.getMonth() + 1
      let createDay = createData.getDate()
      createMonth = createMonth < 10 ? '0' + createMonth : createMonth
      createDay = createDay < 10 ? '0' + createDay : createDay
      if (currYear === createYear) {
        return createMonth + '-' + createDay
      }
      return createYear + '-' + createMonth + '-' + createDay
    },
    clickThumb() {
      let that = this;
      request.dealCommentPraise(getApp().userInfo.id, this.item.id, function (res) {
        if (res.data && res.data.success) {

          if (that.isPraise) {
            that.praiseNum --;
          } else {
            that.praiseNum ++;
          }

          if (that.praiseNum < 0) {
            that.praiseNum = 0;
          }

          that.isPraise = !that.isPraise;
        } else {
          wx.showToast({
            title: '点赞失败',
            duration: 2000
          });
        }
      });
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  padding: 30rpx;
  align-items: flex-start;
}
  .header {
    width: 68rpx;
    height: 68rpx;
    margin-top: 30rpx;
    border-radius: 50%;
  }
  .title {
    font-size: 30rpx;
    color: #333333;
    font-weight: bold;
    width: 500rpx;
    overflow:hidden;
    white-space:nowrap;
    text-overflow: ellipsis;
    padding-top: 10rpx;
    padding-bottom:10rpx;
  }

  .content {
    font-size: 30rpx;
    color: #333333;
    max-width: 600rpx;
    text-overflow: ellipsis;
    padding-top: 10rpx;
    padding-bottom:10rpx;
  }

  .time-stamp{
    font-size: 26rpx;
    color: #999999;
  }

  .priase-text{
    padding-left: 8rpx;
    font-size: 24rpx;
    color: #151515;
    line-height: 30rpx;
  }

  .priase-icon {
    width: 30rpx;
    height: 30rpx;
  }

</style>
