// import * as functions from 'firebase-functions';

interface FunctionListItem {
  key: string
  path: string
}

const functionList: FunctionListItem[] = [
  { key: 'NoticeTrashDay', path: './notice-trash-day' },
]

// メソッドを登録
function registerFunctions(items: FunctionListItem[]): void {
  for (const item of items) {
    if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === item.key) {
      exports[item.key] = require(item.path)
    }
  }
}

registerFunctions(functionList)
