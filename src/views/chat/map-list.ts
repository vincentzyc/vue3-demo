import { QuestionList, AnswerList, MapList } from "./chat"

export const questionList: QuestionList = {
  Q1: '<p>这是第1个问题<span class="cred">哈哈</span>自定义html</p>',
  Q2: '<img src="https://img.yzcdn.cn/vant/cat.jpeg" alt="图片"/><img src="https://img.yzcdn.cn/vant/leaf.jpg" alt="图片" onload="scroll2Bottom()"/>',
  Q3: '这是第3个问题这是第3个问题这是第3个问题',
  Q4: '这是第4个这这是第4个问题题问题',
  Q5: '<p>这是第5个问题</p><img src="https://img.yzcdn.cn/vant/ipad.jpeg" alt="ipad" onload="scroll2Bottom()"/>',
  Q6: '这是第6个问第7个题',
  Q7: '这是第7个问题第7个第7个',
  Q8: '问题结束',
  Q9: '结束语',
}

export const answerList: AnswerList = {
  A1: '这是第1个回答选项',
  A2: '这是第2个答选项回答选项',
  A3: '这是第3个回答选项',
  A4: '这是第4个回答选项答',
  A5: '这答选项是第5个回答选项答选项',
  A6: '这是第6个回答选项',
  A7: '这是第7个回答选项这是第7个回答选项',
  A8: '这是第8个回答选项',
  A9: '这是第9个回答选项答选项',
  A10: '这是第10个回答选项',
  A11: '这是第11个回答选项答选项答选项',
  A12: '这是第12个回答选项',
  A13: '这是第13个回答选项答选项答选项答选项',
  A14: '这是第14个回答选项',
  A15: '这是第15个回答选项答选项',
  A16: '这是第16个回答选项'
}

export const mapList: MapList = {
  Q1: {
    A1: 'Q6',
    A2: 'Q3',
    A3: 'Q7',
    A4: 'Q5',
  },
  Q2: {
    A5: 'Q4',
    A6: 'Q3',
    A7: 'Q8',
    A8: 'Q1',
  },
  Q3: {
    A9: 'Q2',
    A10: 'Q4',
    A11: 'Q8',
  },
  Q4: {
    A5: 'Q1',
    A7: 'Q8',
    A2: 'Q3',
    A8: 'Q4',
  },
  Q5: {
    A1: 'Q5',
    A3: 'Q6',
    A9: 'Q7',
    A11: 'Q8',
  },
  Q6: {
    A4: 'Q2',
    A6: 'Q6',
    A10: 'Q4',
    A12: 'Q7',
  },
  Q7: 'Q8',
  Q8: 'Q9'
}