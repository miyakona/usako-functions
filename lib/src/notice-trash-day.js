"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const bot_sdk_1 = require("@line/bot-sdk");
const secret_manager_1 = require("./secret-manager");
module.exports = functions.pubsub.schedule('0 19 * * *')
    .timeZone('Asia/Tokyo')
    .onRun(async (context) => {
    const dt = new Date();
    dt.setDate(dt.getDate() + 1);
    var comment = [];
    // 翌日が第何週目かを求める
    const isTheWhatWeekly = Math.floor((dt.getDate() - 1) / 7) + 1;
    switch (dt.getDay()) {
        // 月
        case 1:
            comment.push('可燃ごみ');
            break;
        // 火
        case 2:
            if (isTheWhatWeekly == 2 || isTheWhatWeekly == 4) {
                comment.push('不燃ごみ');
            }
            break;
        // 水
        case 3:
            comment.push('資源プラスチック');
            break;
        // 木
        case 4:
            comment.push('可燃ごみ');
        // 金
        case 5:
            break;
        // 土
        case 6:
            comment.push('古紙・ペットボトル・飲食用びん,かん');
            break;
    }
    // ごみの日じゃない場合は何もしない
    if (comment.length < 1) {
        return;
    }
    const message = {
        type: 'text',
        text: `明日は ${comment.join('、')} のゴミの日だよ！\n準備忘れずに！`
    };
    const secretManager = new secret_manager_1.SecretManager();
    const channelAccessToken = await secretManager.getValue('LINE_CHENNEL_ACCESS_TOKEN');
    const user_id_1 = await secretManager.getValue('LINE_USER_ID_1');
    const user_id_2 = await secretManager.getValue('LINE_USER_ID_1');
    const line = new bot_sdk_1.Client({ channelAccessToken: channelAccessToken });
    line.pushMessage(user_id_1, message);
    line.pushMessage(user_id_2, message);
    return 0;
});
//# sourceMappingURL=notice-trash-day.js.map