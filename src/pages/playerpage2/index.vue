<template>
  <view class="container">
    <!--第一层层：背景图背景图，高斯模糊-->
    <view class="bg">
      <image class="poster" :style="{height: windowHeight + 'px'}" :src="audioList[audioIndex].pic"></image>
    </view>
    <!--第二层层：灰色蒙层-->
    <view class="bg-gray">
    </view>
    <!--第三层：player层-->
    <view :style="{ display: listShow === true ? 'none' : '' }">
      <!--旋转图-->
      <view class="rotate-disk-container">
        <view :class="['rotate-disk', pauseStatus === false ? 'rotate-360' : 'rotate-360-paused']">
          <image class="poster"  :src="audioList[audioIndex].pic"></image>
        </view>
      </view>
      <!--操作-->
      <view class="title-container">
        <view class="title-left"></view>
        <view class="text">
          <view><text class="name">{{audioList[audioIndex].title}}</text></view>
          <!--<view><text class="author">-- {{audioList[audioIndex].author}} --</text></view>-->
        </view>
        <image :src="images.listIcon" class="icon-list" @click="bindTapList"></image>
      </view>
      <view class="slider-container">
        <text class="slider-time">{{currentPosition === 0 ? '' : currentPosition}}</text>
        <slider
          :value="sliderValue"
          @change="bindSliderchange"
          activeColor="#13beec"
          style="width: 62%;margin: 0;"
          block-size="12"
          block-color="#13beec"
        />
        <text class="slider-time">{{duration === 0 ? '' : duration}}</text>
      </view>
      <view class="operation-container">
        <image :src="images.preIcon" class="icon-prev" @click="bindTapPrev"></image>
        <image
          :src="pauseStatus === false ? images.pauseIcon : images.playIcon"
          class="icon-play" @click="bindTapPlay"
        >
        </image>
        <image :src="images.nextIcon" class="icon-next" @click="bindTapNext"></image>
      </view>
    </view>
    <!--第五层：列表页-->
    <scroll-view
      class="list"
      scroll-y
      :style="{display: listShow === true ? '' : 'none'}"
      :scroll-top="audioIndex * 68"
    >
      <view v-for="(item,index) in audioList">
        <view
          :id="index"
          :class="['list-one',index === audioIndex ? 'list-one-choose' : '']"
          hover-class="list-one-choose"
          @click="bindTapChoose"
        >
          <view class="name">
            <text class="list-index">{{index}}</text>
          </view>
          <image class="list-one-poster" :src="item.pic"></image>
          <view class="list-one-right">
            <view class="name">{{item.title}}</view>
            <!--<view class="author">歌手：{{item.author}}</view>-->
          </view>
        </view>
      </view>
    </scroll-view>
    <!--<audio id="audio" src="{{audioList[audioIndex].src}}" style="display: none"></audio>-->
  </view>
</template>

<script>
import { formatTime, debugPlayList } from '@/utils/index'
import card from '@/components/card'

import listIcon from './img/list.png';
import pauseIcon from './img/pause.png';
import playIcon from './img/play.png';
import nextIcon from './img/next.png';
import preIcon from './img/prev.png';
import iconIcon from './img/icon.png';


var app = getApp();
let rotate = 0;
export default {
  components: {
  },
  data () {
    return {
      audioList: debugPlayList().songs,
      audioIndex: 0,
      windowHeight: 0,
      pauseStatus: true,
      listShow: false,
      timer: '',
      currentPosition: 0,
      duration:0,
      images: {
        listIcon,
        pauseIcon,
        playIcon,
        nextIcon,
        preIcon,
        iconIcon
      }
    }
  },
  created () {
  },
  mounted() {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
     this.windowHeight = wx.getSystemInfoSync().windowHeight;
  },
  onHide() {
    this.listShow = false;
  },
  onTabItemTap() {
    this.listShow = false;
  },
  methods: {
    bindSliderchange: function(e) {
      // clearInterval(this.data.timer)
      let value = e.detail.value
      let that = this
      console.log(e.detail.value)
      wx.getBackgroundAudioPlayerState({
        success: function (res) {
          console.log(res)
          let {status, duration} = res
          if (status === 1 || status === 0) {
            that.slice = value;
            wx.seekBackgroundAudio({
              position: value * duration / 100,
            })
          }
        }
      })
    },
    bindTapPrev: function() {
      console.log('bindTapNext')
      let length = this.audioList.length
      let audioIndexPrev = this.audioIndex
      let audioIndexNow = audioIndexPrev
      if (audioIndexPrev === 0) {
        audioIndexNow = length - 1
      } else {
        audioIndexNow = audioIndexPrev - 1
      }
      this.audioIndex = audioIndexNow;
      this.sliderValue = 0;
      this.currentPosition = 0;
      this.duration = 0;

      let that = this
      setTimeout(() => {
        if (that.pauseStatus === true) {
          that.play()
        }
      }, 1000)
      wx.setStorageSync('audioIndex', audioIndexNow)
    },
    bindTapNext: function() {
      console.log('bindTapNext')
      let length = this.audioList.length
      let audioIndexPrev = this.audioIndex
      let audioIndexNow = audioIndexPrev
      if (audioIndexPrev === length - 1) {
        audioIndexNow = 0
      } else {
        audioIndexNow = audioIndexPrev + 1
      }

      this.audioIndex = audioIndexNow;
      this.sliderValue = 0;
      this.currentPosition = 0;
      this.duration = 0;

      let that = this
      setTimeout(() => {
        if (that.pauseStatus === false) {
          that.play()
        }
      }, 1000)
      wx.setStorageSync('audioIndex', audioIndexNow)
    },
    bindTapPlay: function() {
      console.log('bindTapPlay')
      console.log(this.pauseStatus)
      if (this.pauseStatus === true) {
        this.play()
        this.pauseStatus = false;
      } else {
        wx.pauseBackgroundAudio()
        this.pauseStatus = true;
      }
    },
    bindTapList: function(e) {
      console.log('bindTapList')
      console.log(e);
      this.listShow = true;
    },
    bindTapChoose: function(e) {
      console.log('bindTapChoose')
      console.log(e);

      this.listShow = false;
      this.audioIndex = parseInt(e.currentTarget.id, 10);
      let that = this
      setTimeout(() => {
        if (that.pauseStatus === false) {
          that.play()
        }
      }, 200)
      wx.setStorageSync('audioIndex', parseInt(e.currentTarget.id, 10))
    },
    play() {
      let {audioList, audioIndex} = this;
      wx.playBackgroundAudio({
        dataUrl: audioList[audioIndex].url,
        title: audioList[audioIndex].title,
        coverImgUrl: audioList[audioIndex].pic
      })
      let that = this
      let timer = setInterval(function() {
        that.setDuration(that)
      }, 1000)
      this.timer = timer;
    },
    setDuration(that) {
      let self = this;
      wx.getBackgroundAudioPlayerState({
        success: function (res) {
          console.log(res)
          let {status, duration, currentPosition} = res
          if (status === 1 || status === 0) {
            self.currentPosition = that.stotime(currentPosition);
            self.duration = that.stotime(duration);
            self.sliderValue = Math.floor(currentPosition * 100 / duration);
          }
        }
      })
    },
    stotime: function(s) {
      let t = '';
      if(s > -1) {
        // let hour = Math.floor(s / 3600);
        let min = Math.floor(s / 60) % 60;
        let sec = s % 60;
        // if (hour < 10) {
        //   t = '0' + hour + ":";
        // } else {
        //   t = hour + ":";
        // }

        if (min < 10) { t += "0"; }
        t += min + ":";
        if (sec < 10) { t += "0"; }
        t += sec;
      }
      return t;
    },
    onShareAppMessage: function () {
      let that = this
      return {
        title: 'light轻音乐：' + that.audioList[that.audioIndex].title,
        success: function(res) {
          wx.showToast({
            title: '分享成功',
            icon: 'success',
            duration: 2000
          })
        },
        fail: function(res) {
          wx.showToast({
            title: '分享失败',
            icon: 'cancel',
            duration: 2000
          })
        }
      }
    }
  }
}
</script>

<style scoped>
  .container{
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  /*1*/
  .bg{
    height: 100%;
    width: 100%;
  }
  .bg image{
    height: 100%;
    width: 100%;
    filter: blur(50rpx);
  }
  /*2*/
  .bg-gray{
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(54, 43, 41, 0.1);
  }
  /*3*/
  .rotate-disk-container{
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .rotate-disk{
    width: 600rpx;
    height: 600rpx;
    border-radius: 600rpx;
    overflow: hidden;
    border: 20rpx solid rgba(54, 43, 41, 0.2);
  }
  .poster{
    width: 600rpx;
    height: 600rpx;
  }
  .rotate-360{
    animation: rotate 10s linear infinite;
  }
  .rotate-360-paused{
    animation: rotate 10s linear infinite;
    animation-play-state: paused;
  }
  @keyframes rotate
  {
    0%   {transform: rotate(0deg);}
    50% {transform: rotate(180deg);}
    100% {transform: rotate(360deg);}
  }
  /*4*/
  .title-container{
    position: absolute;
    top: 0;
    height: 160rpx;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .title-left{
    width: 60rpx;
    height: 60rpx;
  }
  .text{
    color: #fff;
    text-align: center;
  }
  .icon-list{
    width: 54rpx;
    height: 36rpx;
    margin: 0 30rpx 0 0;
  }
  .slider-container{
    position: absolute;
    bottom: 140rpx;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .slider-time{
    font-size: 32rpx;
    display: block;
    width: 19%;
    text-align: center;
    line-height: 18px;
    color: #fff;
  }
  .wx-slider-handle{
    width: 18px!important;
    height: 18px!important;
    top: 5px!important;
  }
  /*4*/
  .operation-container{
    position: absolute;
    bottom: 0;
    height: 160rpx;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .operation-icon{
  }
  .icon-prev{
    /*background-image: url('../../assets/img/icon.png');
    background-repeat: no-repeat;
    background-position: -76px -153px;*/
    width: 80rpx;
    height: 80rpx;
  }
  .icon-play{
    /*background-image: url('../../assets/img/icon.png');
    background-repeat: no-repeat;
    background-position: -136px -153px;*/
    margin: 0 20rpx;
    width: 98rpx;
    height: 98rpx;
  }
  .icon-pause{
    /*background-image: url('../../assets/img/icon.png');
    background-repeat: no-repeat;
    background-position: -178px -193px;*/
    margin: 0 20rpx;
    width: 98rpx;
    height: 98rpx;
  }
  .icon-next{
    /*background-image: url('../../assets/img/icon.png');
    background-repeat: no-repeat;
    background-position: -204px -154px;*/
    width: 80rpx;
    height: 80rpx;
  }

  /*5*/
  .list{
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    color: #fff;
  }
  .list-one{
    height: 160rpx;
    display: flex;
    padding: 0 30rpx;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
  }
  .list-one-poster{
    width: 100rpx;
    height: 100rpx;
    border-radius: 10rpx;
  }
  .list-one-right{
    margin: 0 0 0 30rpx;
  }
  .list-one-choose{
    background-color: rgba(54, 43, 41, 0.6);
  }
  .list-index{
    display: block;
    width: 60rpx;
    height: 60rpx;
    background-color: mediumvioletred;
    text-align: center;
    border-radius: 60rpx;
    line-height: 60rpx;
    margin-right: 20rpx;
  }
</style>
