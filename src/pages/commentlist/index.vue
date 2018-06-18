<template>
  <scroll-view scroll-y class="list" @scrolltolower="scrolltolower">
    <card v-for="(item, index) in allData" :text="item + ' -- ' + index"></card>
  </scroll-view>
</template>

<script>
import card from '@/components/comment-item-view';

//windowHeight

export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {},
      allData: [],
      currentPage: 0,
    }
  },
  components: {
    card
  },

  methods: {
    scrolltolower: function (event) {
      this.loadData(this.currentPage);
    },
    loadData(index) {
      if (this.currentPage == index){
        this.allData = this.allData.concat(
          [index + '0',
            index + '1',
            index + '2',
            index + '3',
            index + '4',
            index + '5',
            index + '6',
            index + '7',
            index + '8',
          ]);
        this.currentPage ++;
      }
    }
  },

  created () {
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
