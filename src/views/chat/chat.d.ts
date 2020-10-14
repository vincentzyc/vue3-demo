export interface QuestionList {
  [k: string]: string
}

export interface AnswerList {
  [k: string]: string
}

export interface MapList {
  [k: string]: string | {
    [k: string]: string
  }
}

export interface MsgList {
  message: string
  direction: string
}

