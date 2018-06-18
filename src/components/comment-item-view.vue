<template>
  <div class="container">
      <image class="header" :src="item.user.head ? item.user.head : images.defaultIcon" resize="stretch"></image>
      <div style="flex: 1; display: flex; flex-direction: column;margin-left: 5rpx;">
        <div style="display: flex; justify-content: space-between;">
          <text class="title">{{item.user.nickName}} </text>
          <div style="display: flex;flex-direction: row; height: 40rpx;justify-items: center;margin-top: 8rpx;">
            <image class="priase-icon" :src="item.isPraise ? images.praisedIcon : images.praisedUnchecked"></image>
            <text class="priase-text" :style="{ color: priaseColor }">{{item.praiseNum}}</text>
          </div>
        </div>
        <text class="content">{{ item.content }}</text>
        <text class="time-stamp">{{commentTime}}</text>
      </div>
  </div>
</template>
<script>

  import defaultIcon from './img/default_head.png';
  import praisedIcon from './img/priased.png';
  import praisedUnchecked from './img/priase_unchecked.png';

export default {
  props: {
    item: {
      type: Object,
      default: {
        isPraise: true,
        praiseNum: 11,
        content: '2放得开发了宫颈癌的快感教室里的房价肯定2放得开发了宫颈癌的快感教室里的房价肯定发生的开发商将对方的时间222放得开发了宫颈癌的快感教室里的房价肯定发生的开发商将对方的时间22发生的开发商将对方的时间22',
        timestamp: new Date().getTime() * 1000,
        user: {
          head: defaultIcon,
          nickName: '2放得开发了宫颈癌的快感教室里的房价肯定发生的开发商将对方的时间222放得开发了宫颈癌的快感教室里的房价肯定发生的开发商将对方的时间22'
        }
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
      isPraise: this.item.isPraise,
      priaseColor: '#333333',
      commentTime: this.item &&  this.timeToDate(this.item.timestamp)
    }
  },
  watch: {
    item: function (newValue) {
      if (!newValue) {
        return;
      }
      this.isPraise = newValue.isPraise;
      this.commentTime = timeToDate(newValue.timestamp);
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
