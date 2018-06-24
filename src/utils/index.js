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
      "title": "奇异恩典",
      "author": "Judy Collins",
      "pic": "https://pic.xiami.net//images/collect/68/68/406154068_1528419050_YVht.jpg",
      "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=5253320&type=url",
      "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=5253320&type=lrc"
    }, {
      "title": "secret base ~君がくれたもの~ (10 years after Ver.)",
      "author": "茅野愛衣",
      "pic": "https://pic.xiami.net//images/collect/658/58/365697658_1526570712_ECyg.jpg",
      "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=33911781&type=url",
      "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=33911781&type=lrc"
    }, {
      "title": "红色高跟鞋",
      "author": "蔡健雅",
      "pic": "https://pic.xiami.net//images/collect/939/39/103145939_1527504939_o6YW.jpeg",
      "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=208902&type=url",
      "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=208902&type=lrc"
    }, {
      "title": "易燃易爆炸",
      "author": "陈粒",
      "pic": "https://pic.xiami.net//images/common/uploadpic/playlist/119424962/1524365866199.jpg",
      "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=30431376&type=url",
      "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=30431376&type=lrc"
    },{
      "title": "Euterpe",
      "author": "EGOIST",
      "pic": "https://pic.xiami.net//images/collect/302/2/402742302_5b2252cde10cf_rew1_1528976077.jpg",
      "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=722932&type=url",
      "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=722932&type=lrc"
    }, {
      "title": "眉间雪(纯歌版)",
      "author": "晴愔",
      "pic": "https://pic.xiami.net//images/collect/812/12/355345812_5accf86b7244a_tbXU_1523382379.jpg",
      "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=29572089&type=url",
      "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=29572089&type=lrc"
    }, {
      "title": "心拍数#0822",
      "author": "H△G",
      "pic": "https://pic.xiami.net/images/appv5/common/32447/5b1e9b1fd5157_eXGD_1528732447.jpg",
      "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=472219448&type=url",
      "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=472219448&type=lrc"
    }, {
      "title": "僕が死のうと思ったのは",
      "author": "中島美嘉",
      "pic": "https://pic.xiami.net/images/appv5/common/24989/5a8c01fd61593_QwMA_1519124989.jpg",
      "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=26830207&type=url",
      "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=26830207&type=lrc"
    }]
  };
}

export default {
  formatNumber,
  formatTime,
  debugPlayList
}
