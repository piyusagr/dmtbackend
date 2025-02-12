"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseEjsFile = void 0;
const ejs_1 = require("ejs");
const TEMPLATES_PATH = 'apps/backend/src/templates/';
const parseEjsFile = async (input) => {
    const file = await (0, ejs_1.renderFile)(`${TEMPLATES_PATH}${input.template}`, input.data || {}, { async: true });
    return file;
};
exports.parseEjsFile = parseEjsFile;
//# sourceMappingURL=email-render.helpers.js.map