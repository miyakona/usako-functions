"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecretManager = void 0;
const secret_manager_1 = require("@google-cloud/secret-manager");
const sprintf_js_1 = require("sprintf-js");
const functions = require("firebase-functions");
class SecretManager {
    constructor() {
        this.basePath = `projects/${functions.config().gcp.project_number}/secrets/%s/versions/%s`;
        this.client = new secret_manager_1.SecretManagerServiceClient();
    }
    async getValue(targetKey, targetVersion = 'latest') {
        var _a, _b, _c;
        const [version] = await this.client.accessSecretVersion({
            name: sprintf_js_1.sprintf(this.basePath, targetKey, targetVersion),
        });
        return (_c = (_b = (_a = version.payload) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.toString()) !== null && _c !== void 0 ? _c : '';
    }
}
exports.SecretManager = SecretManager;
//# sourceMappingURL=secret-manager.js.map