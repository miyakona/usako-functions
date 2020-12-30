"use strict";
// import * as functions from 'firebase-functions';
const functionList = [
    { key: 'NoticeTrashDay', path: './notice-trash-day' },
    { key: 'HelloWorld', path: './hello-world' },
];
// メソッドを登録
function registerFunctions(items) {
    for (let item of items) {
        if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === item.key) {
            exports[item.key] = require(item.path);
        }
    }
}
registerFunctions(functionList);
//# sourceMappingURL=index.js.map