"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var app_1 = require("firebase-admin/app");
var firestore_1 = require("firebase-admin/firestore");
var config_1 = __importDefault(require("./config"));
// FIRESTORE SDK DOCS https://firebase.google.com/docs/auth/admin
(0, app_1.initializeApp)({
    credential: (0, app_1.cert)({
        projectId: config_1.default.server.db.projectId,
        clientEmail: config_1.default.server.db.clientEmail,
        privateKey: config_1.default.server.db.privateKey,
    }),
});
exports.db = (0, firestore_1.getFirestore)();
