<template>
  <div class="container">
    <div v-if="false" class="background" :style="{ background: 'url(' + playItem.picUrl + ') 0 0 no-repeat'}">
    </div>
    <template v-if="showContainer">
      <view  class="musicContainer">
        <image :src="playItem.picUrl"
               id="picUrl"
               :style="{transform:transform}"
               @click="toggleRotate"
        ></image>
        <audio
          :poster="playItem.picUrl"
          :name="playItem.name"
          :author="playItem.singer"
          :src="playItem.musicUrl"
          id="myAudio"
          controls="true"
          loop="false"
          @play="playMusic"
          @bpause="pauseMusic"
        >
        </audio>
      </view>
    </template>
    <view class="list" v-if="!showContainer">
      <view
        v-for="(item,index) in list"
        class="item"
        @click="changeMusic(item, index)"
      >
        <image :src="item.pic"
               alt=""
        ></image>
        <text
          class="name"
        >{{item.title}}</text>
        <text
          class="album"
        >{{item.author}}-{{item.albumName}}</text>
      </view>
    </view>
  </div>
</template>

<script>
import { formatTime, debugPlayList } from '@/utils/index'
import card from '@/components/card'

var app = getApp();
let rotate = 0;
export default {
  components: {
  },
  data () {
    return {
      transform: '', // 旋转动画属性
      rotateFlag: false, // 控制专辑图片旋转
      showContainer: true, // 展示音乐播放器或音乐播放列表
      list: [], // 搜索音乐播放列表,
      playItem: {
        name: '', // 歌曲名称
        musicUrl: '', // 歌曲链接地址
        picUrl: '', // 专辑图片地址
        singer: '', //歌手名称
      }
    }
  },
  created () {
    this.fetchPlayList();
  },
  mounted() {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio');
  },
  methods: {
    // 专辑图片旋转函数
    myRotate: function() {
      rotate++;
      let transform = `rotate(${rotate}deg);`;
      this.transform = transform;
      const animation = setTimeout(() => {
        this.myRotate();
      }, 100);
      if (!this.rotateFlag) {
        clearTimeout(animation);
      };
    },
    // 控制专辑图片旋转
    toggleRotate: function() {
      if (this.rotateFlag) {
        this.pauseMusic();
        this.audioCtx.pause();
      } else {
        this.playMusic();
        this.audioCtx.play();
      }
    },
    // 播放音乐
    playMusic: function() {
      this.rotateFlag = true;
      this.myRotate();
    },
    // 暂停播放音乐
    pauseMusic: function() {
      this.rotateFlag = false;
    },
    fetchPlayList: function(musicname) {
      // 把返回的歌曲列表设定为list中的数据
      this.list = debugPlayList().songs;
      this.showContainer = false;
    },
    // 列表音乐函数
    changeMusic: function ( item, index) {
      // 获取歌曲列表详细内容
      this.playItem = {
        name: item.title,
        musicUrl: item.url,
        picUrl: item.pic,
        singer: item.author
      }
      this.showContainer = true;
    },
    // onLoad为生命周期函数
    onLoad: function() {
      // 默认播放歌曲
    }
  }
}
</script>

<style scoped>
  #giveMusicName {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 20px;
  }
  #picUrl {
    border-radius: 50%;
    width: 300px;
    height: 300px;
    margin: 20px 0;
  }
  .musicname {
    border: 2px #ddd solid;
    border-radius: 4px;
    height: 100%;
    padding: 8px;
    font-family: "Microsoft Yahei";
  }
  #musicInfos {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 100px;
  }
  #infos {
    font-size: 14px;
    color: #555;
  }
  #audioApp {
    font-size: 20px;
    color: #362e2b;
  }
  .list {
    display: flex;
    flex-direction: column;
    align-items: space-around;
    justify-content: flex-start;
  }
  .item {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    border: 2px #ddd solid;
    border-radius: 4px;
  }
  .item image {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    flex: 0 0 100px;
  }
  .name {
    flex: 1;
    padding-left: 10px;
  }
  .album {
    flex: 2;
  }
  .musicContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @-webkit-keyframes blur {
    0% {
      -webkit-filter: blur(10px); /* Chrome, Opera */
      -moz-filter: blur(10px);
      -ms-filter: blur(10px);
      filter: blur(10px);
    }
    50% {
      -webkit-filter: blur(5px);
      -moz-filter: blur(5px);
      -ms-filter: blur(5px);
      filter: blur(5px);
    }
    100% {
      -webkit-filter: blur(0px);
      -moz-filter: blur(0px);
      -ms-filter: blur(0px);
      filter: blur(0px);
    }
  }
  .background {
    position: absolute;
    filter: blur(15rpx);
    transform: scale(1.1);
    width: 750rpx;
    height: 1000rpx;
  }

</style>
