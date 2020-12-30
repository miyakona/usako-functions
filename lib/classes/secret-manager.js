"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecretManager = void 0;
const secret_manager_1 = require("@google-cloud/secret-manager");
const sprintf_js_1 = require("sprintf-js");
const Config = require("../config");
class SecretManager {
    constructor() {
        this.basePath = `projects/${Config.GCP_PROJECT_ID}/secrets/%s/%s`;
        this.client = new secret_manager_1.SecretManagerServiceClient();
    }
    async getValue(targetKey, targetVersion = 'latest') {
        var _a;
        const [version] = await this.client.accessSecretVersion({
            name: sprintf_js_1.sprintf(this.basePath, targetKey, targetVersion),
        });
        if (!version.payload || !version.payload.data) {
            throw new Error();
        }
        return (_a = version.payload.data.toString()) !== null && _a !== void 0 ? _a : '';
    }
}
exports.SecretManager = SecretManager;
//# sourceMappingURL=secret-manager.js.map