<template>
  <div class="luckdraw-content">
    <!-- 滚动号码 -->
    <div class="luckdraw-scroll">
      <ul class="bg-scroll">
        <li v-for="(item, i) in list" :key="i" ref="rollLi" :class="{ 'anim' : animate && i == 0 }">
          <span class="lkq-name">{{ item.phone }}</span>
        </li>
      </ul>
    </div>
    <!-- 抽奖弹窗 -->
    <div class="turntable">
      <!-- 转动背景 -->
      <div :class="['run-item','run-item-' + current]"></div>
      <!-- 礼品框 -->
      <img src="../assets/images/present.png" alt class="present-content" />
      <!-- 抽奖按钮 -->
      <img @click="handleStart" src="../assets/images/bigBottom.png" alt class="start-btn-big" />
    </div>
  </div>
</template>

<script>
import {
  ref,
  reactive,
  onMounted
} from "vue"

export default {
  name: "LuckDraw",
  setup() {
    let initSpeed = 200,  // 初始速度
      speed = null,  // 变化速度
      diff = 20,  // 速度变化的值，值越大，变化地越快
      award = {},  // 抽中的奖品
      time = 0,  // 记录开始抽奖的时间
      minRotateTime = 2.5, //抽奖动画最少转动时间
      rotateTime = 5, // 抽奖动画转动时间
      isRuningLucky = false,  // 是否正在抽奖
      awards = [  // 奖品列表
        {
          id: 1,
          name: '潘多拉音箱'
        },
        {
          id: 2,
          name: '小酷M1耳机'
        },
        {
          id: 3,
          name: '酷狗VIP会员'
        },
        {
          id: 4,
          name: '8元话费'
        },
        {
          id: 5,
          name: '12元话费'
        },
        {
          id: 6,
          name: '谢谢参与'
        },
        {
          id: 7,
          name: '4元话费'
        },
        {
          id: 8,
          name: '谢谢参与'
        }
      ];
    const animate = ref(false), //中奖名单滚动动画控制
      current = ref(0),  // 当前转动的位置
      list = reactive([  // 中奖号码
        {
          phone: "186****2336抽中0元话费"
        },
        {
          phone: "166****2336抽中1元话费"
        },
        {
          phone: "156****2336抽中2元话费"
        }
      ])
    const scroll = () => {
      // 中奖名单滚动
      animate.value = true;
      setTimeout(() => {
        list.push(list[0]);
        list.shift();
        animate.value = false;
      }, 500);
    }
    const handleStart = () => { // 开始抽奖
      if (isRuningLucky) {
        console.log("正在抽奖中...");
        return
      }
      if (isNaN(Number(initSpeed))) {
        return false;
      }
      speed = initSpeed;
      // 开始抽奖
      isRuningLucky = true;
      time = Date.now();
      drawAward();
      console.log("开始抽奖");
      return
    }
    const drawAward = () => {
      // 请求接口，模拟一个抽奖数据(假设请求时间为2s)
      setTimeout(() => {
        award = {
          id: Math.ceil(Math.random() * 8)  //随机奖品
        };
        console.log("返回的抽奖结果是", award);
      }, 2000);
      move();
    }
    const move = () => {
      let timer = setTimeout(() => {
        current.value++;
        if (current.value > 7) {
          current.value = 0;
        }
        // 若抽中的奖品id存在，并且转动时间大于2.5秒后，则开始减速转动
        if (award.id && (Date.now() - time) / 1000 > minRotateTime) {
          console.log("奖品出来了");
          speed += diff; // 转动减速
          // 若转动时间超过5秒，并且奖品id等于小格子的奖品id，则停下来
          if (
            (Date.now() - time) / 1000 > rotateTime &&
            award.id == awards[current.value].id
          ) {
            clearTimeout(timer);
            setTimeout(() => {
              isRuningLucky = false;
              // 这里写停下来要执行的操作（弹出奖品框之类的）
              console.log("您抽中的奖品是" + awards[current.value].name + ",奖品id是" + awards[current.value].id);
            }, 400);
            return;
          }
          // 若抽中的奖品不存在，则加速转动
        } else {
          if (speed >= 50) speed -= diff; // 转动加速
        }
        move();
      }, speed);
    }
    onMounted(() => {
      setInterval(scroll, 2000);
    })
    return {
      animate,
      list,
      current,
      handleStart
    }
  }
};
</script>

<style lang="stylus" scoped>
.luckdraw-content {
  margin-top: 0.4rem;
  background-color: #000;
  width: 100%;
  padding-bottom: 1rem;
  overflow: hidden;

  // 滚动号码
  .luckdraw-scroll {
    .bg-scroll {
      position: relative;
      background: url('../assets/images/phone.png') center top no-repeat;
      background-size: 100%;
      width: 100%;
      height: 0.74rem;
      line-height: 0.74rem;
      font-size: 0.35rem;
      overflow: hidden;
      text-align: center;
      letter-spacing: 0.03rem;
      list-style: none;
      padding: 0;
    }

    .lkq-name {
      margin: 0 auto;
      color: #fff;
      font-size: 0.28rem;
    }

    .anim {
      transition: all 0.5s linear;
      margin-top: -0.74rem;
    }
  }

  // 抽奖
  .turntable {
    position: relative;

    .present-content {
      width: 80%;
      z-index: 100;
    }

    .start-btn-big {
      width: 1.8rem;
      height: 1.8rem;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -0.95rem;
      margin-left: -0.9rem;
      z-index: 999;
      animation: btn-animation 0.3s ease-out infinite alternate;
    }

    .run-item {
      display: block;
      position: absolute;
      left: 8.5%;
      top: -0.1rem;
      width: 1.9rem;
      height: 1.9rem;
      border: 0.06rem solid #ff0000;
      box-shadow: 0px 0px 10px 3px #f00, inset 0px 0px 10px 3px #ff0000;
    }

    .run-item-0 {
      margin: 0 0;
    }

    .run-item-1 {
      margin: 0 0 0 1.98rem;
    }

    .run-item-2 {
      margin: 0 0 0 3.95rem;
    }

    .run-item-3 {
      margin: 1.95rem 0 0 3.95rem;
    }

    .run-item-4 {
      margin: 3.85rem 0 0 3.95rem;
    }

    .run-item-5 {
      margin: 3.85rem 0 0 1.98rem;
    }

    .run-item-6 {
      margin: 3.85rem 0 0 0;
    }

    .run-item-7 {
      margin: 1.95rem 0 0 0;
    }
  }
}

@keyframes btn-animation {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(0.85);
  }
}

.notice-img {
  position: absolute;
  top: 0.12rem;
  left: 0.55rem;
}
</style>
