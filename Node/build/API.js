"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const playwright_1 = require("playwright");
const app = (0, express_1.default)();
const port = 3001;
app.get('/get-element-text', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { hospitalname, date } = req.query;
        if (!hospitalname || !date) {
            return res.status(400).json({ error: 'Missing hospitalname or date in the query parameters' });
        }
        const { hospitalnameText, dateText } = yield loginAndFetchPracticeElementName();
        res.status(200).json({ hospitalname: hospitalnameText, date: dateText });
    }
    catch (error) {
        console.error('Main Error:', error);
        res.status(500).json({ error: 'An error occurred while executing the Playwright script' });
    }
}));
function loginAndFetchPracticeElementName() {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield playwright_1.chromium.launch({ channel: 'chrome' });
        const page = yield browser.newPage();
        try {
            page.goto('https://beta.unislink.com/rpt/', { waitUntil: 'load' });
            yield page.getByRole('link', { name: 'Unislink AD' }).click();
            yield page.waitForLoadState('load');
            yield page.getByPlaceholder('Email, phone, or Skype').fill('shanmugarajeshwaran.m@unislink.com');
            yield page.getByRole('button', { name: 'Next' }).click();
            yield page.getByPlaceholder('Password').fill('Dur57272');
            yield page.getByRole('button', { name: 'Sign in' }).click();
            yield page.getByRole('button', { name: 'Yes' }).click();
            yield page.waitForLoadState('load');
            yield page.waitForSelector('body > app-root > app-layout > div > app-header > nav > ul:nth-child(4) > li:nth-child(1) > div > div > span');
            const hospitalnameText = yield page.textContent('body > app-root > app-layout > div > app-header > nav > ul:nth-child(4) > li:nth-child(1) > div > div > span');
            const dateText = yield page.textContent('body > app-root > app-layout > div > app-header > nav > ul:nth-child(4) > li:nth-child(1) > div > i > date-display > span');
            if (hospitalnameText === null) {
                throw new Error('Hospital name not found');
            }
            if (dateText === null) {
                throw new Error('Date not found');
            }
            console.log('Hospital Name:', hospitalnameText);
            console.log('DATE:', dateText);
            return { hospitalnameText, dateText };
        }
        catch (error) {
            console.error('Error:', error);
            throw error;
        }
        finally {
            yield browser.close();
        }
    });
}
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
