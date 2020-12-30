"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionBase = void 0;
const functions = require("firebase-functions");
const bot_sdk_1 = require("@line/bot-sdk");
const secret_manager_1 = require("./secret-manager");
class FunctionBase {
    static async notifyLine(messageText) {
        if (functions.config().app.env !== 'production' && !functions.config().app.is_notify) {
            console.log(`It didn\'t notify on LINE. It was send this message: ${messageText}`);
            return;
        }
        const message = {
            type: 'text',
            text: messageText
        };
        const secretManager = new secret_manager_1.SecretManager();
        const channelAccessToken = await secretManager.getValue('LINE_CHENNEL_ACCESS_TOKEN');
        const user_id_1 = await secretManager.getValue('LINE_USER_ID_1');
        const user_id_2 = await secretManager.getValue('LINE_USER_ID_1');
        const line = new bot_sdk_1.Client({ channelAccessToken: channelAccessToken });
        line.pushMessage(user_id_1, message);
        line.pushMessage(user_id_2, message);
        return;
    }
}
exports.FunctionBase = FunctionBase;
//# sourceMappingURL=function-base.js.map