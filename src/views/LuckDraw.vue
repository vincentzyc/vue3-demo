<template>
  <div class="luckdraw-content">
    <!-- 滚动号码 -->
    <div class="luckdraw-scroll">
      <ul class="bg-scroll">
        <li v-for="(item, i) in list" :key="i" :class="{ 'anim': animate && i == 0 }">
          <span class="lkq-name">{{ item.phone }}</span>
        </li>
      </ul>
    </div>
    <!-- 抽奖弹窗 -->
    <div class="turntable">
      <svg class="bulb svelte-ecndpu" viewBox="-6 -6 316 316" fill="currentColor" fill-rule="evenodd">
        <g class="bulb-1 svelte-ecndpu">
          <circle cx="10" cy="10" r="4" />
          <circle cx="78" cy="4" r="4" />
          <circle cx="152" cy="4" r="4" />
          <circle cx="226" cy="4" r="4" />
          <circle cx="294" cy="10" r="4" />
          <circle cx="4" cy="89" r="4" />
          <circle cx="4" cy="173" r="4" />
          <circle cx="4" cy="258" r="4" />
          <circle cx="41" cy="300" r="4" />
          <circle cx="115" cy="300" r="4" />
          <circle cx="189" cy="300" r="4" />
          <circle cx="263" cy="300" r="4" />
          <circle cx="300" cy="258" r="4" />
          <circle cx="300" cy="173" r="4" />
          <circle cx="300" cy="89" r="4" />
        </g>
        <g class="bulb-2 svelte-ecndpu">
          <circle cx="41" cy="4" r="4" />
          <circle cx="115" cy="4" r="4" />
          <circle cx="189" cy="4" r="4" />
          <circle cx="263" cy="4" r="4" />
          <circle cx="4" cy="46" r="4" />
          <circle cx="4" cy="131" r="4" />
          <circle cx="4" cy="215" r="4" />
          <circle cx="10" cy="294" r="4" />
          <circle cx="294" cy="294" r="4" />
          <circle cx="300" cy="215" r="4" />
          <circle cx="300" cy="131" r="4" />
          <circle cx="300" cy="46" r="4" />
          <circle cx="78" cy="300" r="4" />
          <circle cx="152" cy="300" r="4" />
          <circle cx="226" cy="300" r="4" />
        </g>
      </svg>
      <ul class="awards-list">
        <li
          v-for="(item, key) in awardList"
          :key="item.id"
          class="awards-item"
          :class="{ 'awards-item-draw': key === 4, 'run-item': item.runId === current }"
        >
          <div v-if="key === 4" @click="handleStart" class="draw-btn svelte-ecndpu">
            <span class="draw-btn-text">点击抽奖</span>
          </div>
          <div v-else>{{ item.name }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, onMounted, nextTick } from "vue";

interface AwardTypes {
  id: number;
  runId: number;
  name: string;
}

export default defineComponent({
  name: "LuckDraw",
  setup() {
    const initSpeed = 200, // 初始速度
      diff = 20, // 速度变化的值，值越大，变化地越快
      minRotateTime = 2.5, //抽奖动画最少转动时间
      rotateTime = 5; // 抽奖动画转动时间

    let speed = 0, // 变化速度
      award: AwardTypes, // 抽中的奖品
      time = 0, // 记录开始抽奖的时间
      isRuningLucky = false; // 是否正在抽奖
    const animate = ref(false), //中奖名单滚动动画控制
      current = ref(0), // 当前转动的位置
      list = reactive([
        // 中奖号码
        {
          phone: "186****2336抽中0元话费",
        },
        {
          phone: "166****2336抽中1元话费",
        },
        {
          phone: "156****2336抽中2元话费",
        },
      ]),
      awards = reactive([
        // 奖品列表
        {
          id: 1,
          runId: 0,
          name: "潘多拉音箱",
        },
        {
          id: 2,
          runId: 1,
          name: "小酷M1耳机",
        },
        {
          id: 3,
          runId: 2,
          name: "酷狗VIP会员",
        },
        {
          id: 4,
          runId: 7,
          name: "8元话费",
        },
        {
          id: 5,
          runId: 3,
          name: "12元话费",
        },
        {
          id: 6,
          runId: 6,
          name: "谢谢参与1",
        },
        {
          id: 7,
          runId: 5,
          name: "4元话费",
        },
        {
          id: 8,
          runId: 4,
          name: "谢谢参与2",
        },
      ]),
      awardList = computed<typeof awards>(() => {
        const newArr = JSON.parse(JSON.stringify(awards));
        newArr.splice(4, 0, { name: "drawBtn" });
        return newArr;
      });
    const scroll = () => {
      // 中奖名单滚动
      animate.value = true;
      setTimeout(() => {
        list.push(list[0]);
        list.shift();
        animate.value = false;
      }, 500);
    };
    const move = () => {
      const timer = setTimeout(() => {
        current.value++;
        if (current.value > 7) current.value = 0;
        // 若抽中的奖品id存在，并且转动时间大于2.5秒后，则开始减速转动
        if (award?.id && (Date.now() - time) / 1000 > minRotateTime) {
          console.log("奖品出来了");
          speed += diff; // 转动减速
          // 若转动时间超过5秒，等到当前格子是对应奖品id数组，则停下来
          if (
            (Date.now() - time) / 1000 > rotateTime &&
            award.runId === current.value
          ) {
            clearTimeout(timer);
            setTimeout(() => {
              isRuningLucky = false;
              // 这里写停下来要执行的操作（弹出奖品框之类的）
              const getAward: AwardTypes | undefined = awards.find(
                (v) => v.id === award.id
              );
              if (getAward) {
                console.log(
                  `您抽中的奖品是${getAward.name},奖品id是${getAward.id}`
                );
              }
            }, 400);
            return;
          }
          // 若抽中的奖品不存在，则加速转动
        } else {
          if (speed >= 50) speed -= diff; // 转动加速
        }
        move();
      }, speed);
    };
    const drawAward = () => {
      // 请求接口，模拟一个抽奖数据(假设请求时间为2s)
      setTimeout(() => {
        const awardId = Math.ceil(Math.random() * 8); //随机奖品
        const getAward = awards.find((v) => v.id === awardId);
        if (getAward) award = getAward;
        console.log("返回的抽奖结果是", award);
      }, 2000);
      move();
    };
    const handleStart = () => {
      // 开始抽奖
      if (isRuningLucky) {
        console.log("正在抽奖中...");
        return;
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
      return;
    };

    onMounted(async () => {
      await nextTick();
      setInterval(scroll, 2000);
    });
    return {
      awards,
      awardList,
      animate,
      list,
      current,
      handleStart,
    };
  },
})
</script>

<style lang="less" scoped>
.luckdraw-content {
  margin-top: 0.4rem;
  width: 100%;
  padding-bottom: 1rem;

  // 号码滚动
  .luckdraw-scroll {
    .bg-scroll {
      position: relative;
      width: 90%;
      height: 0.74rem;
      line-height: 0.74rem;
      font-size: 0.35rem;
      border-radius: 0.4rem;
      overflow: hidden;
      list-style: none;
      padding: 0;
      margin: 0 auto;
      text-align: center;
      letter-spacing: 0.03rem;
      background: linear-gradient(to right, #bcbcc1, #cdcdcd, #bcbcc1);
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

  // 转盘
  .turntable {
    position: relative;
    margin: 0.4rem auto;
    width: 6rem;
    height: 6rem;
    background: #fed479;
    border-radius: 0.4rem;
    box-sizing: border-box;
    padding: 5%;

    .bulb {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }

    .bulb .bulb-1 {
      animation: bulb-animation 0.5s -0.25s infinite;
    }

    .bulb .bulb-2 {
      animation: bulb-animation 0.5s infinite;
    }

    .awards-list {
      margin: 0;
      padding: 0;
      list-style: none;
      width: 100%;
      height: 100%;
    }

    .awards-item {
      width: 32%;
      height: 32%;
      margin: 0.66%;
      float: left;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      box-sizing: border-box;
      border: 3px solid #fff;
      border-radius: 25%;
      font-size: 0.24rem;
      background: #fff;
      color: #d65c23;
      border-color: #ffffff;
      background-color: #ffffff;
      transition: border-color 0.1s;
    }

    .awards-item-draw {
      background: #963434;
      border: none;
      overflow: hidden;
    }

    .draw-btn {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 25%;
      height: 100%;
      width: 100%;
      color: #fff;
      font-size: 0.28rem;
      border: 3px solid #ff7051;
      background: #ff7051;
      animation: draw-btn-jump 0.5s infinite;
    }

    .run-item {
      position: relative;
      border-color: #ff7051;
    }
  }
}

@keyframes bulb-animation {
  0% {
    color: #FFFFFF;
  }

  50% {
    color: #FFE37F;
  }

  100% {
    color: #FFFFFF;
  }
}

@keyframes draw-btn-jump {
  0% {
    top: -6px;
  }

  50% {
    top: 0;
  }

  100% {
    top: -6px;
  }
}
</style>
