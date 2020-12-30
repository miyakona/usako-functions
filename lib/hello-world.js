"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
//helloWorld
module.exports = functions.https.onCall(async (data, context) => {
    return "Hello World";
});
//# sourceMappingURL=hello-world.js.map