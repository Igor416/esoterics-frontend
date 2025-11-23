export interface IContent {
  arcanes: number[]
  text: string
}

export interface IBlock {
  title: string,
  content: IContent[]
}

export interface IInfo {
  category: string,
  blocks: IBlock[],
  positions: string[]
}

export interface IMatrixData {
  info: IInfo[],
  combinations: {
    [key: string]: number
  },
  numbers: {
    [key: string]: number
  }
}