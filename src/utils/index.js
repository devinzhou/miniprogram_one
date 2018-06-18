function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export function debugPlayList() {
  return {
    "songs": [{
      "title": "secret base ~君がくれたもの~ (10 years after Ver.)",
      "author": "茅野愛衣",
      "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=33911781&type=pic",
      "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=33911781&type=url",
      "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=33911781&type=lrc"
    }, {
      "title": "红色高跟鞋",
      "author": "蔡健雅",
      "pic": "https://audio-test-1256666922.cos.ap-chengdu.myqcloud.com/theme/theme2/theme1image.jpg?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDQKzNOfWqHj5rPslVP6Qf9Por60pnt2TQ%26q-sign-time%3D1529306146%3B1529307946%26q-key-time%3D1529306146%3B1529307946%26q-header-list%3D%26q-url-param-list%3D%26q-signature%3Dbdb38440f8967a48cb3a4d93167e7e5142dbaaee&token=4e0eb7abfddae59e7f5fdbc552831d05587b078810001&clientIP=115.233.219.155&clientUA=ddd0b22b-8bcf-4b32-a100-23d37c6d1630",
      "url": "https://audio-test-1256666922.cos.ap-chengdu.myqcloud.com/theme/theme2/%E4%B8%80%E5%8D%83%E5%B9%B4%E4%BB%A5%E5%90%8E.mp3?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDjk7Bm5RplzY9DkdAIyoAbtZfmWYs8rur%26q-sign-time%3D1529305892%3B1529307692%26q-key-time%3D1529305892%3B1529307692%26q-header-list%3D%26q-url-param-list%3D%26q-signature%3D996a2964e531386c474d9fcc4c84be6d290cc69e&token=f1420dadc922f2038dc3ac4da38507dc02da4f7510001&clientIP=115.233.219.155&clientUA=4c248ff7-a153-4bce-ae10-6756d95cc46b",
      "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=208902&type=lrc"
    }, {
      "title": "易燃易爆炸",
      "author": "陈粒",
      "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=30431376&type=pic",
      "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=30431376&type=url",
      "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=30431376&type=lrc"
    }, {
      "title": "龙卷风",
      "author": "G.E.M.邓紫棋",
      "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=29450548&type=pic",
      "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=29450548&type=url",
      "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=29450548&type=lrc"
    }, {
      "title": "喜欢",
      "author": "阿肆",
      "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=526464145&type=pic",
      "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=526464145&type=url",
      "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=526464145&type=lrc"
    }, {
      "title": "ハルノユキ",
      "author": "リリィ、さよなら。",
      "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=33233915&type=pic",
      "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=33233915&type=url",
      "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=33233915&type=lrc"
    }, {
      "title": "アイロニ",
      "author": "majiko",
      "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=31421442&type=pic",
      "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=31421442&type=url",
      "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=31421442&type=lrc"
    }, {
      "title": "Euterpe",
      "author": "EGOIST",
      "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=722932&type=pic",
      "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=722932&type=url",
      "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=722932&type=lrc"
    }, {
      "title": "眉间雪(纯歌版)",
      "author": "晴愔",
      "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=29572089&type=pic",
      "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=29572089&type=url",
      "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=29572089&type=lrc"
    }, {
      "title": "心拍数#0822",
      "author": "H△G",
      "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=472219448&type=pic",
      "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=472219448&type=url",
      "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=472219448&type=lrc"
    }, {
      "title": "SNS",
      "author": "sympathy",
      "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=461518667&type=pic",
      "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=461518667&type=url",
      "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=461518667&type=lrc"
    }, {
      "title": "给自己的情书",
      "author": "王菲",
      "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=299604&type=pic",
      "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=299604&type=url",
      "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=299604&type=lrc"
    }, {
      "title": "如风过境",
      "author": "哎哟蔚蔚",
      "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=520460927&type=pic",
      "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=520460927&type=url",
      "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=520460927&type=lrc"
    }, {
      "title": "「再来一杯」",
      "author": "DMYoung",
      "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=527629786&type=pic",
      "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=527629786&type=url",
      "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=527629786&type=lrc"
    }, {
      "title": "KISS OF DEATH (Produced by HYDE)",
      "author": "中島美嘉",
      "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=531051597&type=pic",
      "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=531051597&type=url",
      "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=531051597&type=lrc"
    }, {
      "title": "旅行的意义",
      "author": "陈绮贞",
      "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=209326&type=pic",
      "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=209326&type=url",
      "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=209326&type=lrc"
    }]
  };
}

export default {
  formatNumber,
  formatTime,
  debugPlayList
}
