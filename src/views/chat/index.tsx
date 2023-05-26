import { defineComponent, ref, reactive, nextTick, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { NavBar } from "vant";
import { questionList, answerList, mapList } from "./map-list"
import "@/assets/css/chat.less"
import { easeBottom } from '@/utils/dom';
import { MsgList } from "./chat"
import { useHeight } from '@/composition/use-rect';

export default defineComponent(() => {
  const router = useRouter()
  const answerRef = ref();
  const msgList: Array<MsgList> = reactive([])
  const chatBottomHeight = useHeight(answerRef);
  const showLoading = ref(true)
  const loadingText = ref('对方正在输入中...')

  let timer = 0
  let loadingTimer = 0
  let ansList: Array<string> = reactive([])
  let answers = mapList.Q1

  window.scroll2Bottom = () => easeBottom()

  const getDelayTime = () => Math.ceil((Math.random() * 2 + 1.5) * 1000)  //1.5-3.5秒
  const getLoadingDelayTime = () => Math.ceil(Math.random() + 0.5 * 1000)  //0.5-1.5秒

  const onClickLeft = () => {
    router.back()
  }

  const scrollPageBottom = async () => {
    await nextTick()
    chatBottomHeight.value = useHeight(answerRef).value;
    window.scroll2Bottom()
  }

  const chatFinish = () => {
    console.log('聊天结束');
    showLoading.value = false
  }

  const setMsg = (message: string, direction: 'left' | 'right') => {
    msgList.push({
      message: message,
      direction: direction
    })
  }

  const setQuestion = (question: string) => {
    setMsg(questionList[question], 'left')
    answers = mapList[question]
    if (!answers) return chatFinish()
    if (typeof answers === 'string') {
      timer = setTimeout(() => {
        setQuestion(answers as string)
        scrollPageBottom()
      }, getDelayTime());
    } else {
      ansList = Object.keys(answers)
    }
  }

  const addAnswer = (item: string) => {
    setMsg(answerList[item], 'right')
    ansList = []
    loadingText.value = '请稍等...'
    loadingTimer = setTimeout(() => {
      loadingText.value = '对方正在输入中...'
    }, getLoadingDelayTime());
    timer = setTimeout(() => {
      setQuestion(typeof answers === 'string' ? answers : answers[item])
      scrollPageBottom()
    }, getDelayTime());
  }

  const messageDom = () => msgList.length > 0 && (
    <div class="chat-wrapper" style={{ marginBottom: chatBottomHeight.value + 50 + 'px' }}>
      {msgList.map(item => (
        <li class={['flex pd10 align-start', item.direction === 'left' ? 'justify-start' : 'justify-end']}>
          {item.direction === 'left' ? <div class="avatar"></div> : null}
          <div class={['mg-l10 bubble', item.direction === 'left' ? 'bubble-left' : 'bubble-right']} >
            <p class="bgfff lh20 fs12" v-html={item.message}></p>
          </div>
          {item.direction === 'right' ? <div class="avatar"></div> : null}
        </li>
      ))}
    </div>)

  const answerDom = () => ansList.length > 0 ? (
    <div class="answers-wrapper flex flex-wrap max640" ref={answerRef}>
      {ansList.map((item: string) => (
        <div class="btnbox col-6 flex">
          <div class="flex flex-center btn" onClick={() => addAnswer(item)}>{answerList[item]}</div>
        </div>
      ))}
    </div>
  ) : (
    <div class="answers-wrapper max640">
      <div class="loadingtxt fs12 lh20  mg10 text-center" v-show={showLoading.value}>{loadingText.value}</div>
    </div>
    )

  onMounted(() => {
    setQuestion('Q1')
  })
  onUnmounted(() => {
    clearTimeout(timer)
    clearTimeout(loadingTimer)
  })

  return () => (
    <div class="pd-nav">
      <NavBar fixed title="聊天室" left-arrow onClick-left={onClickLeft} />
      {messageDom()}
      {answerDom()}
    </div>
  )
})