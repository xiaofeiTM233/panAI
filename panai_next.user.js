// ==UserScript==
// @name              网盘智能识别助手(NEXT)
// @namespace         https://github.com/52fisher/panAI
// @version           3.0.0
// @author            YouXiaoHou,52fisher
// @description       智能识别选中文字中的🔗网盘链接和🔑提取码，识别成功打开网盘链接并自动填写提取码，省去手动复制提取码在输入的烦恼。
// @license           AGPL-3.0-or-later
// @homepage          https://github.com/52fisher/panAI
// @supportURL        https://github.com/52fisher/panAI
// @updateURL         https://ghproxy.net/https://raw.githubusercontent.com/52fisher/panAI/main/panai_next.user.js
// @downloadURL       https://ghproxy.net/https://raw.githubusercontent.com/52fisher/panAI/main/panai_next.user.js
// @match             *://*/*
// @require           https://unpkg.com/hotkeys-js@3.13.3/dist/hotkeys.min.js
// @run-at            document-idle
// @grant             GM_openInTab
// @grant             GM_setValue
// @grant             GM_getValue
// @grant             GM_registerMenuCommand
// @grant             GM_getResourceText
// @grant             GM_info
// @icon              data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjggMTI4Ij48cGF0aCBkPSJNMTAzLjYgMTA3LjRjMy41LTIuMiA4LjktNi4xIDEzLjgtMTIuNXM3LjMtMTIuNSA4LjUtMTYuNWMuNS0xLjcgMi4yLTcuNSAyLjItMTQuNyAwLTEwLjEtMy4zLTI1LjEtMTUuNC0zNi44LTE0LjUtMTQtMzIuMS0xNC4zLTM1LjctMTQuMy04IDAtMTUuNyAxLjktMjIuNiA1LjJDNDQgMjMgMzUuNyAzMS40IDMwLjggNDEuN2MtMS4zIDIuOC00IDQuNy03LjEgNS00IC4zLTcuNSA0LjQtOC45IDkuNi0uNSAxLjktMS42IDMuNS0zLjEgNC43QzQuNCA2Ni44IDAgNzUuNyAwIDg1YzAgNi44IDIuMyAxMy4xIDYuMSAxOC4yIDUuNSA3LjQgMTQuMiAxMi4yIDI0IDEyLjJoNDcuMWM0LjQgMCAxMS0uNSAxOC4zLTMuNSAzLjItMS40IDUuOS0zIDguMS00LjV6IiBmaWxsPSIjNDQ0Ii8+PHBhdGggZD0iTTExOS44IDY0LjNjLjEtMTcuMS0xMC40LTI4LTEyLjUtMzAuMUM5NSAyMi4xIDc5LjkgMjEuOCA3Ni45IDIxLjhjLTE3LjYgMC0zMy4zIDEwLjUtMzkuOSAyNi43LS42IDEuMy0xLjggMi4zLTMuNCAyLjNoLS40Yy01LjggMC0xMC42IDQuOC0xMC42IDEwLjd2LjVjMCAxLjQtLjggMi42LTEuOSAzLjNDMTMuNCA2OSA4LjggNzYuOCA4LjggODVjMCAxMi4yIDkuOSAyMi4zIDIyLjIgMjIuM2g0NS4yYzMuNi0uMSAxNy42LS45IDI5LjYtMTIgMi45LTIuOCAxMy45LTEzLjcgMTQtMzF6IiBmaWxsPSIjZGI4NDEyIi8+PHBhdGggZD0iTTExMC44IDU3LjRsLjIgMy4zYzAgMS4zLTEuMSAyLjQtMi4zIDIuNC0xLjMgMC0yLjMtMS4xLTIuMy0yLjRsLS4xLTIuOHYtLjNjMC0xLjIuOS0yLjIgMi4xLTIuM2guM2MuNyAwIDEuMy4zIDEuNy43LS4yLjEuMy41LjQgMS40em0tMy4zLTEwLjNjMCAxLjItMSAyLjMtMi4yIDIuM2gtLjFjLS44IDAtMS42LS41LTItMS4yLTQuNi04LjMtMTMuMy0xMy41LTIyLjgtMTMuNS0xLjIgMC0yLjMtMS0yLjMtMi4ydi0uMWMwLTEuMiAxLTIuMyAyLjItMi4zaC4xYTMwLjM3IDMwLjM3IDAgMCAxIDE1LjggNC40YzQuNiAyLjggOC40IDYuOCAxMS4xIDExLjUuMS4zLjIuNy4yIDEuMXpNNjkuMiA0OWwxOS40IDE0LjhjMS45IDEuNSAzLjEgMy41IDMuNSA1Ljd2LjJjLjEuNC4xLjguMSAxLjIgMCAuNi0uMSAxLjEtLjIgMS42LS40IDIuMi0xLjcgNC4yLTMuNSA1LjZMNjkuMyA5M2MtMi42IDItNS40IDIuNS03LjcgMS40LS4xLS4xLS4yLS4xLS4yLS4yLTItMS4yLTMuMi0zLjUtMy4yLTYuNHYtNi42aC01LjdjLTYuOCAwLTEyLTQuNy0xMi0xMC45IDAtNC44IDIuNi04LjUgNy4yLTEwLjMgMS4zLS41IDIuNy4yIDMuMiAxLjVzLS4xIDIuOC0xLjQgMy4zYy0yLjcgMS4xLTQgMi45LTQgNS41IDAgMy41IDMgNiA3IDZoOC4xYy41IDAgMSAuMiAxLjQuNi43LjYgMS4xIDEuNyAxLjEgMi42djguNGMwIDEuMy40IDIgLjcgMi4xLjQuMiAxLjMgMCAyLjQtLjlsMTkuMi0xNC45YzEuMi0uOSAxLjgtMi4xIDEuOC0zLjNzLS42LTIuMy0xLjctMy4xTDY2LjIgNTNjLTEuMS0uOS0yLTEuMS0yLjQtLjktLjMuMi0uNy45LS43IDIuMXY3LjZjMCAuOS0uNSAxLjctMS4yIDIuMS0uNC4zLS44LjQtMS4zLjQtMS40IDAtMi41LTEuMS0yLjUtMi41di03LjZjMC0zLjEgMS4zLTUuNSAzLjUtNi42bC43LS4zYzIuMS0uNyA0LjYtLjEgNi45IDEuN3oiIGZpbGw9IiM0NDQiLz48L3N2Zz4=
// ==/UserScript==

(function () {

    // 常量定义
    const CONSTANTS = {
        DEFAULT_SETTINGS: [
            { name: 'setting_success_times', value: 0 },
            { name: 'setting_auto_click_btn', value: true },
            { name: 'setting_active_in_front', value: true },
            { name: 'setting_timer_open', value: false },
            { name: 'setting_auto_complete', value: false },
            { name: 'setting_text_as_password', value: false },
            { name: 'setting_timer', value: 5000 },
            { name: 'setting_hotkeys', value: 'F1' }
        ],
        CUSTOM_CLASSES: {
            dialog: 'panai-dialog',
            dialogOverlay: 'panai-dialog-overlay',
            dialogContent: 'panai-dialog-content',
            dialogHeader: 'panai-dialog-header',
            dialogTitle: 'panai-dialog-title',
            dialogBody: 'panai-dialog-body',
            dialogFooter: 'panai-dialog-footer',
            confirmButton: 'panai-confirm-btn',
            cancelButton: 'panai-cancel-btn',
            denyButton: 'panai-deny-btn',
            timerBar: 'panai-timer-bar'
        },
        PASSWORD_REGEX: /wss:[a-zA-Z0-9]+|(?<=\s*(?:密|提取|访问|訪問|key|password|pwd|#|\?p=|\?code=)\s*[码碼]?\s*[：:=]?\s*)[a-zA-Z0-9]{3,8}/i,
        PLUGIN_STYLES: `
        .panai-setting-label { display: flex;align-items: center;justify-content: space-between;padding-top: 20px; }
        .panai-setting-checkbox { width: 16px;height: 16px; }
        .panai-dialog-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 100000;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        }
        .panai-dialog-overlay.active {
            opacity: 1;
            pointer-events: auto;
        }
        .panai-dialog-content {
            background: white;
            border-radius: 8px;
            width: fit-content;
            max-width: 500px;
            box-shadow: 10px 10px 24px 6px rgba(0,0,0,0.1);
            transform: translateY(-20px);
            transition: transform 0.3s ease;
        }
        .panai-dialog-overlay.active .panai-dialog-content {
            transform: translateY(0);
        }
        .panai-dialog-header {
            padding: 16px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .panai-dialog-title {
            margin: 0;
            font-size: 18px;
            font-weight: 600;
            color: #333;
        }
        .panai-dialog-close {
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            color: #999;
            padding: 0 5px;
        }
        .panai-dialog-close:hover {
            color: #333;
        }
        .panai-dialog-body {
            padding: 0 20px;
            max-height: 70vh;
            overflow-y: auto;
        }
        .panai-dialog-footer {
            padding: 20px;
            display: flex;
            justify-content: center;
            gap: 10px;
        }
        .panai-dialog-footer button {
            padding: 6px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.2s ease;
        }
        .panai-cancel-btn {
            background: #f5f5f5;
            border: 1px solid #ddd;
            color: #666;
        }
        .panai-cancel-btn:hover {
            background: #eee;
        }
        .panai-confirm-btn {
            background: #2778c4;
            border: 1px solid #2778c4;
            color: white;
        }
        .panai-confirm-btn:hover {
            background: #1e64b2;
        }
        .panai-deny-btn {
            background: #f59e0b;
            border: 1px solid #f59e0b;
            color: white;
        }
        .panai-deny-btn:hover {
            background: #d97706;
        }
        .panai-toast {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #333;
            color: white;
            padding: 10px 20px;
            border-radius: 4px;
            z-index: 100001;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
            max-width: 80%;
            text-align: center;
        }
        .panai-toast.active {
            opacity: 1;
        }
        .panai-toast.success {
            background: #F0F9EB;
            color:#67C23A;
        }
        .panai-toast.error {
            background: #FEF0F0;
            color:#F56C6C;
        }
        .panai-toast.info {
            background: #FDF6EC;
            color:#E6A23C;
        }
        .panai-timer-bar {
            height: 3px;
            background: #2778c4;
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            transition: width linear;
        }
        .panai-dialog-body textarea,.panai-dialog-body input[type="text"], .panai-dialog-body input[type="range"] {
            width: 100%;
            padding: 8px 12px;
            margin-bottom: 15px;
            border: 1px solid #ddd;
            border-radius: 4px;
            box-sizing: border-box;
        }
       .panai-dialog-body textarea {
            min-height: 100px;
            resize: vertical;
        }
    `
    };

    // 自定义Dialog组件
    class Dialog {
        constructor() {
            // 绑定toast方法的上下文，确保this指向正确
            this.toast = this.toast.bind(this);
            this.createElements();
            this.bindEvents();
        }

        // 创建基础DOM元素
        createElements() {
            // 创建遮罩层和对话框容器
            this.overlay = document.createElement('div');
            this.overlay.className = `${CONSTANTS.CUSTOM_CLASSES.dialogOverlay}`;

            this.content = document.createElement('div');
            this.content.className = `${CONSTANTS.CUSTOM_CLASSES.dialogContent}`;

            // 创建对话框结构
            this.header = document.createElement('div');
            this.header.className = `${CONSTANTS.CUSTOM_CLASSES.dialogHeader}`;

            this.title = document.createElement('h3');
            this.title.className = `${CONSTANTS.CUSTOM_CLASSES.dialogTitle}`;

            this.closeBtn = document.createElement('button');
            this.closeBtn.className = 'panai-dialog-close';
            this.closeBtn.innerHTML = '&times;';

            this.body = document.createElement('div');
            this.body.className = `${CONSTANTS.CUSTOM_CLASSES.dialogBody}`;

            this.footer = document.createElement('div');
            this.footer.className = `${CONSTANTS.CUSTOM_CLASSES.dialogFooter}`;

            // 创建toast元素
            this.toastElement = document.createElement('div');
            this.toastElement.className = 'panai-toast';

            // 组装对话框
            this.header.appendChild(this.title);
            //this.header.appendChild(this.closeBtn);
            this.content.appendChild(this.header);
            this.content.appendChild(this.body);
            this.content.appendChild(this.footer);
            this.overlay.appendChild(this.content);

            // 添加到页面
            document.body.appendChild(this.overlay);
            document.body.appendChild(this.toastElement);

            // 计时器相关
            this.timer = null;
            this.timerBar = null;
            this.resolve = null;
        }

        // 绑定事件
        bindEvents() {
            // 关闭按钮事件
            this.closeBtn.addEventListener('click', () => {
                this.hide();
                if (this.resolve) {
                    this.resolve({ isConfirmed: false, dismiss: 'close' });
                    this.resolve = null;
                }
            });

            // 点击遮罩层关闭
            this.overlay.addEventListener('click', (e) => {
                if (e.target === this.overlay) {
                    this.closeBtn.click();
                }
            });

            // ESC键关闭
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.overlay.classList.contains('active')) {
                    this.closeBtn.click();
                }
            });
        }

        // 显示对话框
        show() {
            this.overlay.classList.add('active');
        }

        // 隐藏对话框
        hide() {
            this.overlay.classList.remove('active');
            this.clearButtons();
            this.clearTimer();

            // 清空内容
            this.body.innerHTML = '';
            this.title.innerHTML = '';
        }

        // 清除按钮
        clearButtons() {
            while (this.footer.firstChild) {
                this.footer.removeChild(this.footer.firstChild);
            }
        }

        // 清除计时器
        clearTimer() {
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }
            if (this.timerBar) {
                this.content.removeChild(this.timerBar);
                this.timerBar = null;
            }
        }

        // 创建按钮
        createButton(text, className, callback) {
            const button = document.createElement('button');
            button.textContent = text;
            button.className = className;
            button.type = 'button';
            button.addEventListener('click', callback);
            this.footer.appendChild(button);
            return button;
        }

        // 普通提示框
        alert(options) {
            return new Promise((resolve) => {
                this.title.innerHTML = options.title || '';
                this.body.innerHTML = options.html || options.text || '';

                // 清除现有按钮并创建确认按钮
                this.clearButtons();
                this.createButton(options.confirmButtonText || '确定',
                    `${CONSTANTS.CUSTOM_CLASSES.confirmButton}`, () => {
                        this.hide();
                        resolve({ isConfirmed: true });
                    });

                this.show();
            });
        }

        // 确认对话框
        confirm(options) {
            return new Promise((resolve) => {
                this.resolve = resolve;
                this.title.innerHTML = options.title || '';
                this.body.innerHTML = options.html || options.text || '';

                // 清除现有按钮
                this.clearButtons();

                // 创建取消按钮
                this.createButton(options.cancelButtonText || '取消',
                    `${CONSTANTS.CUSTOM_CLASSES.cancelButton}`, () => {
                        this.hide();
                        resolve({ isConfirmed: false });
                        this.resolve = null;
                    });

                // 创建确认按钮
                this.createButton(options.confirmButtonText || '确定',
                    `${CONSTANTS.CUSTOM_CLASSES.confirmButton}`, () => {
                        const inputs = this.body.querySelectorAll('input, textarea');
                        const inputValues = {};
                        inputs.forEach(input => {
                            inputValues[input.id] = input.value;
                        });

                        this.hide();
                        // 在返回结果中包含 inputValues
                        resolve({ isConfirmed: true, inputValues });
                        this.resolve = null;
                    });

                // 添加计时器
                if (options.timer) {
                    this.timerBar = document.createElement('div');
                    this.timerBar.className = CONSTANTS.CUSTOM_CLASSES.timerBar;
                    this.content.appendChild(this.timerBar);

                    let timeLeft = options.timer;
                    const totalTime = options.timer;

                    this.timer = setInterval(() => {
                        timeLeft -= 100;
                        const percentage = (timeLeft / totalTime) * 100;
                        this.timerBar.style.width = `${percentage}%`;

                        if (timeLeft <= 0) {
                            clearInterval(this.timer);
                            this.hide();
                            resolve({ isConfirmed: true, dismiss: 'timer' });
                            this.resolve = null;
                        }
                    }, 100);
                }

                this.show();
            });
        }

        // 带否认按钮的对话框
        confirmWithDeny(options) {
            return new Promise((resolve) => {
                this.resolve = resolve;
                this.title.innerHTML = options.title || '';
                this.body.innerHTML = options.html || options.text || '';

                // 清除现有按钮
                this.clearButtons();

                // 创建取消按钮
                this.createButton(options.cancelButtonText || '取消',
                    `${CONSTANTS.CUSTOM_CLASSES.cancelButton}`, () => {
                        this.hide();
                        resolve({ isConfirmed: false });
                        this.resolve = null;
                    });

                // 创建否认按钮
                this.createButton(options.denyButtonText || '否',
                    `${CONSTANTS.CUSTOM_CLASSES.denyButton}`, () => {
                        this.hide();
                        resolve({ isDenied: true });
                        this.resolve = null;
                    });

                // 创建确认按钮
                this.createButton(options.confirmButtonText || '是',
                    `${CONSTANTS.CUSTOM_CLASSES.confirmButton}`, () => {
                        const inputs = this.body.querySelectorAll('input, textarea');
                        const inputValues = {};
                        inputs.forEach(input => {
                            inputValues[input.id] = input.value;
                        });

                        this.hide();
                        // 在返回结果中包含 inputValues
                        resolve({ isConfirmed: true, inputValues });
                        this.resolve = null;
                    });

                this.show();
            });
        }

        // 显示提示消息 - 修复后的toast方法
        toast(options) {
            if (!this.toastElement) {
                // 确保toast元素存在
                this.toastElement = document.createElement('div');
                this.toastElement.className = 'panai-toast';
                document.body.appendChild(this.toastElement);
            }

            this.toastElement.innerHTML = options.title || '';
            this.toastElement.className = 'panai-toast'; // 重置类名

            if (options.icon) {
                this.toastElement.classList.add(options.icon);
            }

            this.toastElement.classList.add('active');

            // 清除可能存在的旧计时器
            if (this.toastTimer) {
                clearTimeout(this.toastTimer);
            }

            // 设置自动隐藏计时器
            this.toastTimer = setTimeout(() => {
                this.toastElement.classList.remove('active');
            }, options.timer || 3000);
        }
    }

    // 状态变量
    let lastText = "lorem&";
    let dialog; // 自定义对话框实例
    let util;
    let PAN_CONFIGS; // 先声明，后初始化

    // 工具函数集合
    function createUtil() {
        return {
            /**
             * 带前缀的控制台日志
             * @param {any} content - 日志内容
             */
            clog: (content) => {
                console.group("%c %c [网盘智能识别助手]",
                    `background:url(${GM_info.script.icon}) center center no-repeat;background-size:12px;padding:3px`, "");
                console.log(content);
                console.groupEnd();
            },

            /**
             * 解析URL查询参数
             * @param {string} name - 参数名
             * @returns {string|null} 参数值
             */
            parseQuery: (name) => {
                const reg = new RegExp(`(?<=(?:${name})\\=)(?:wss:[a-zA-Z0-9]+|[\\w-]+)`, "i");
                const pd = location.href.replace(/%3A/g, ":").match(reg);
                return pd ? pd[0] : null;
            },

            /**
             * 获取存储的值
             * @param {string} name - 键名
             * @returns {any} 值
             */
            getValue: (name) => GM_getValue(name),

            /**
             * 设置存储的值
             * @param {string} name - 键名
             * @param {any} value - 值
             */
            setValue: (name, value) => GM_setValue(name, value),

            /**
             * 延迟函数
             * @param {number} time - 延迟时间(毫秒)
             * @returns {Promise}
             */
            sleep: (time) => new Promise(resolve => setTimeout(resolve, time)),

            /**
             * 添加样式到页面
             * @param {string} id - 样式ID
             * @param {string} tag - 标签名
             * @param {string} css - 样式内容
             */
            addStyle: (id, tag = 'style', css) => {
                const doc = document;
                let styleDom = doc.getElementById(id);
                if (styleDom) return;

                const style = doc.createElement(tag);
                style.rel = 'stylesheet';
                style.id = id;
                tag === 'style' ? style.innerHTML = css : style.href = css;
                document.head.appendChild(style);
            },

            /**
             * 检查元素是否隐藏
             * @param {HTMLElement} el - 元素
             * @returns {boolean} 是否隐藏
             */
            isHidden: (el) => {
                try {
                    return el.offsetParent === null;
                } catch (e) {
                    return false;
                }
            },

            /**
             * 判断是否为移动设备
             */
            isMobile: !!navigator.userAgent.match(
                /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone|HarmonyOS|MicroMessenger)/i
            ),

            /**
             * 查询元素
             * @param {string|string[]} selector - 选择器或选择器数组
             * @returns {HTMLElement|null} 找到的元素
             */
            query: (selector) => {
                if (Array.isArray(selector)) {
                    for (let i = 0; i < selector.length; i++) {
                        const element = document.querySelector(selector[i]);
                        if (element) return element;
                    }
                    return null;
                }
                return document.querySelector(selector);
            }
        };
    }

    /**
     * 初始化网盘配置（在util初始化之后调用）
     */
    function initPanConfigs() {
        PAN_CONFIGS = {
            'baidu': {
                reg: /((?:https?:\/\/)?(?:e?yun|pan)\.baidu\.com\/(doc\/|enterprise\/)?(?:s\/[\w~]*(((-)?\w*)*)?|share\/\S{4,}))/,
                host: /(pan|e?yun)\.baidu\.com/,
                input: ['#accessCode', '.share-access-code', '#wpdoc-share-page > .u-dialog__wrapper .u-input__inner'],
                button: ['#submitBtn', '.share-access .g-button', '#wpdoc-share-page > .u-dialog__wrapper .u-btn--primary'],
                name: '百度网盘',
                storage: 'hash',
                autoCompleteReg: /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])\b[\w-]{23}\b/,
                autoCompleteUrlPrefix: 'https://pan.baidu.com/s/'
            },
            'aliyun': {
                reg: /((?:https?:\/\/)?(?:(?:www\.)?(?:aliyundrive|alipan)\.com\/s|alywp\.net)\/[a-zA-Z\d]+)/,
                host: /www\.(aliyundrive|alipan)\.com|alywp\.net/,
                input: ['form .ant-input', 'form input[type="text"]', 'input[name="pwd"]'],
                button: ['form .button--fep7l', 'form button[type="submit"]'],
                name: '阿里云盘',
                storage: 'hash'
            },
            'weiyun': {
                reg: /((?:https?:\/\/)?share\.weiyun\.com\/[a-zA-Z\d]+)/,
                host: /share\.weiyun\.com/,
                input: ['.mod-card-s input[type=password]', 'input.pw-input'],
                button: ['.mod-card-s .btn-main', ".pw-btn-wrap button.btn"],
                name: '微云',
                storage: 'hash'
            },
            'lanzou': {
                reg: /((?:https?:\/\/)?(?:[a-zA-Z0-9\-.]+)?(?:lanzou[a-z]|lanzn|lanpv)\.com\/[a-zA-Z\d_\-]+(?:\/[\w-]+)?)/,
                host: /(?:[a-zA-Z\d-.]+)?(?:lanzou[a-z]|lanzn|lanpv)\.com/,
                input: ['#pwd'],
                button: ['.passwddiv-btn', '#sub'],
                name: '蓝奏云',
                storage: 'hash',
            },
            'ilanzou': {
                reg: /(?:https?:\/\/)?(?:[a-zA-Z0-9\-.]+)?ilanzou\.com\/s\/[?=\w-]+/,
                host: /www\.ilanzou\.com/,
                input: ['.code-input'],
                button: ['.code-checkbefore'],
                name: '蓝奏云优享版',
                storage: 'hash'
            },
            'tianyi': {
                reg: /((?:https?:\/\/)?cloud\.189\.cn\/(?:t\/|web\/share\?code=)?[a-zA-Z\d]+)/,
                host: /cloud\.189\.cn/,
                input: ['.access-code-item #code_txt', "input.access-code-input"],
                button: ['.access-code-item .visit', ".button"],
                name: '天翼云盘',
                storage: () => util.isMobile === true ? 'local' : 'hash',
                storagePwdName: 'tmp_tianyi_pwd'
            },
            'caiyun': {
                reg: /((?:https?:\/\/)?caiyun\.139\.com\/(?:m\/i|w\/i\/|web\/|front\/#\/detail)\??(?:linkID=)?[a-zA-Z\d]+)/,
                host: /(?:cai)?yun\.139\.com/,
                input: ['.token-form input[type=text]'],
                button: ['.token-form .btn-token'],
                name: '移动云盘',
                storage: 'local',
                storagePwdName: 'tmp_caiyun_pwd'
            },
            'xunlei': {
                reg: /((?:https?:\/\/)?pan\.xunlei\.com\/s\/[\w-]{10,})/,
                host: /pan\.xunlei\.com/,
                input: ['.pass-input-wrap .td-input__inner'],
                button: ['.pass-input-wrap .td-button'],
                name: '迅雷云盘',
                storage: 'hash',
                autoCompleteReg: /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])\b[\w-]{26}\b/,
                autoCompleteUrlPrefix: 'https://pan.xunlei.com/s/'
            },
            '123pan': {
                reg: /((?:https?:\/\/)?www\.(?:123pan|123865|123684|123652|123912)\.com\/s\/[\w-]{6,})/,
                host: /www\.(?:123pan|123865|123684|123652|123912)\.com/,
                input: ['.ca-fot input', ".appinput .appinput"],
                button: ['.ca-fot button', ".appinput button"],
                name: '123云盘',
                storage: 'hash'
            },
            '360': {
                reg: /((?:https?:\/\/)?(?:[a-zA-Z\d\-.]+)?(?:yunpan\.360\.cn|yunpan\.com)(\/lk)?\/surl_\w{6,})/,
                host: /[\w.]+?yunpan\.com/,
                input: ['.pwd-input'],
                button: ['.submit-btn'],
                name: '360云盘',
                storage: 'local',
                storagePwdName: 'tmp_360_pwd'
            },
            '115': {
                reg: /((?:https?:\/\/)?115\.com\/s\/[a-zA-Z\d]+)/,
                host: /115\.com/,
                input: ['.form-decode input'],
                button: ['.form-decode .submit a'],
                name: '115网盘',
                storage: 'hash'
            },
            'cowtransfer': {
                reg: /((?:https?:\/\/)?(?:[a-zA-Z\d-.]+)?cowtransfer\.com\/s\/[a-zA-Z\d]+)/,
                host: /(?:[a-zA-Z\d-.]+)?cowtransfer\.com/,
                input: ['.receive-code-input input'],
                button: ['.open-button'],
                name: '奶牛快传',
                storage: 'hash'
            },
            'ctfile': {
                reg: /((?:https?:\/\/)?(?:[a-zA-Z\d-.]+)?(?:ctfile|545c|u062|ghpym)\.com\/\w+\/[a-zA-Z\d-]+)/,
                host: /(?:[a-zA-Z\d-.]+)?(?:ctfile|545c|u062)\.com/,
                input: ['#passcode'],
                button: ['.card-body button'],
                name: '城通网盘',
                storage: 'hash'
            },
            'quark': {
                reg: /((?:https?:\/\/)?pan\.quark\.cn\/s\/[a-zA-Z\d-]+)/,
                host: /pan\.quark\.cn/,
                input: ['input[class*=ShareReceive]'],
                button: ['.ant-btn-primary'],
                name: '夸克网盘',
                storage: 'local',
                storagePwdName: 'tmp_quark_pwd',
                autoCompleteReg: /(?=.*[a-z])(?=.*[0-9])\b[a-z0-9]{12}\b/,
                autoCompleteUrlPrefix: 'https://pan.quark.cn/s/'
            },
            'pikpak': {
                reg: /((?:https?:\/\/)?mypikpak\.com\/s\/[\w-]+)/,
                host: /(?:[a-zA-Z\d-.]+)?mypikpak\.com/,
                input: ['.el-input__wrapper input'],
                button: ['.passcode-input+button'],
                name: 'PikPak',
                storage: 'hash',
            },
            'feijipan': {
                reg: /((?:https?:\/\/)?share\.feijipan\.com\/s\/[a-zA-Z\d-]+)/,
                host: /share\.feijipan\.com/,
                name: '飞机盘',
                storage: 'hash'
            },
            'vdisk': {
                reg: /(?:https?:\/\/)?vdisk.weibo.com\/lc\/\w+/,
                host: /vdisk\.weibo\.com/,
                input: ['#keypass', "#access_code"],
                button: ['.search_btn_wrap a', "#linkcommon_btn"],
                name: '微盘',
                storage: 'hash',
            },
            'wenshushu': {
                reg: /((?:https?:\/\/)?(?:www\.wenshushu|ws28)\.cn\/(?:k|box|f)\/\w+)/,
                host: /www\.wenshushu\.cn/,
                input: ['.pwd-inp .ivu-input'],
                button: ['.pwd-inp .ivu-btn'],
                name: '文叔叔网盘',
                storage: 'hash'
            },
            'uc': {
                reg: /(?:https?:\/\/)?drive\.uc\.cn\/s\/[a-zA-Z\d]+/,
                host: /drive\.uc\.cn/,
                input: ["input[class*='ShareReceivePC--input']", '.input-wrap input'],
                button: ["button[class*='ShareReceivePC--submit-btn'", '.input-wrap button'],
                name: 'UC云盘',
                storage: 'hash'
            },
            'jianguoyun': {
                reg: /((?:https?:\/\/)?www\.jianguoyun\.com\/p\/[\w-]+)/,
                host: /www\.jianguoyun\.com/,
                input: ['input[type=password]'],
                button: ['.ok-button', '.confirm-button'],
                name: '坚果云',
                storage: 'hash'
            },
            'wo': {
                reg: /(?:https?:\/\/)?pan\.wo\.cn\/s\/[\w_]+/,
                host: /(pan\.wo\.cn|panservice\.mail\.wo\.cn)/,
                input: ['input.el-input__inner', ".van-field__control"],
                button: ['.s-button', ".share-code button"],
                name: '联通云盘',
                storage: () => util.isMobile === true ? 'local' : 'hash',
                storagePwdName: 'tmp_wo_pwd'
            },
            'mega': {
                reg: /((?:https?:\/\/)?(?:mega\.nz|mega\.co\.nz)\/#F?![\w!-]+)/,
                host: /(?:mega\.nz|mega\.co\.nz)/,
                input: ['.dlkey-dialog input'],
                button: ['.dlkey-dialog .fm-dialog-new-folder-button'],
                name: 'Mega',
                storage: 'local'
            },
            'flowus': {
                reg: /((?:https?:\/\/)?flowus\.cn\/[\S ^\/]*\/?share\/[a-z\d]{8}-[a-z\d]{4}-[a-z\d]{4}-[a-z\d]{4}-[a-z\d]{12})/,
                host: /flowus\.cn/,
                name: 'FlowUs息流',
                storage: 'hash'
            },
            'chrome': {
                reg: /^https?:\/\/chrome.google.com\/webstore\/.+?\/([a-z]{32})(?=[\/#?]|$)/,
                host: /chrome\.google\.com/,
                replaceHost: "chrome.crxsoso.com",
                name: 'Chrome商店',
            },
            'edge': {
                reg: /^https?:\/\/microsoftedge.microsoft.com\/addons\/.+?\/([a-z]{32})(?=[\/#?]|$)/,
                host: /microsoftedge\.microsoft\.com/,
                replaceHost: "microsoftedge.crxsoso.com",
                name: 'Edge商店',
            },
            'firefox': {
                reg: /^https?:\/\/(reviewers\.)?(addons\.mozilla\.org|addons(?:-dev)?\.allizom\.org)\/.*?(?:addon|review)\/([^/<>"'?#]+)/,
                host: /addons\.mozilla\.org/,
                replaceHost: "addons.crxsoso.com",
                name: 'Firefox商店',
            },
            'microsoft': {
                reg: /^https?:\/\/(?:apps|www).microsoft.com\/(?:store|p)\/.+?\/([a-zA-Z\d]{10,})(?=[\/#?]|$)/,
                host: /(apps|www)\.microsoft\.com/,
                replaceHost: "apps.crxsoso.com",
                name: 'Windows商店',
            },
            'noire': {
                reg: /(?:https?:\/\/)?drive\.noire\.cc\/s\/\w+/,
                host: /drive\.noire\.cc/,
                input: ['#pwd'],
                button: ['button.MuiButton-containedSecondary'],
                name: '爱丽丝的记事本',
                storage: 'local',
                storagePwdName: 'tmp_noire_pwd',
                originalLink: true,
            },
        };
    }

    /**
     * 初始化配置数据
     */
    function initSettings() {
        CONSTANTS.DEFAULT_SETTINGS.forEach(setting => {
            if (util.getValue(setting.name) === undefined) {
                util.setValue(setting.name, setting.value);
            }
        });
    }

    /**
     * 添加页面事件监听
     */
    function addPageListeners() {
        document.addEventListener("mouseup", smartIdentify, true);
        document.addEventListener("keydown", handleKeyPress, true);
    }

    /**
     * 获取选中内容的HTML或文本
     * @param {Selection} selection - 选择对象
     * @param {boolean} isDOM - 是否返回DOM对象
     * @returns {string|HTMLElement} 选中的内容
     */
    function getSelectionContent(selection, isDOM = false) {
        const testDiv = document.createElement("div");
        if (!selection.isCollapsed) {
            const docFragment = selection.getRangeAt(0).cloneContents();
            testDiv.appendChild(docFragment);
        }
        return isDOM ? testDiv : selection.toString();
    }

    /**
     * 智能识别选中的文本
     * @param {Event} event - 事件对象
     * @param {string} str - 要识别的字符串
     */
    async function smartIdentify(event, str = '') {
        const selection = window.getSelection();
        const text = str || getSelectionContent(selection);

        // 自动推导网盘前缀的开关
        const isAutoComplete = util.getValue('setting_auto_complete');
        const isTextAsPassword = util.getValue('setting_text_as_password');

        // 选择相同文字或空不识别
        if (text !== lastText && text !== '') {
            const startTime = performance.now();
            lastText = text;
            util.clog(`当前选中文字：${text}`);

            // 解析链接和密码
            let linkObj = parseLink(text);
            util.clog(`解析结果：${JSON.stringify(linkObj)}`);

            let { link, name } = linkObj;
            let pwd = parsePassword(text);

            // 从父元素解析链接
            if (!link) {
                linkObj = parseParentLink(selection);
                link = linkObj.link;
                name = linkObj.name;
            }

            // 将超链接文本作为密码
            if (isTextAsPassword && !pwd) {
                pwd = parseLinkTextAsPassword(selection);
            }

            // 自动补全链接
            if (isAutoComplete && !link) {
                linkObj = parseLink(text, true);
                link = linkObj.link;
                name = linkObj.name;
            }

            // 如果找到链接
            if (link) {
                // 补全协议头
                if (!/https?:\/\//.test(link)) {
                    link = 'https://' + link;
                }

                // 计算耗时
                const endTime = performance.now();
                const timeCost = (endTime - startTime).toFixed(3);
                util.clog(`文本识别结果：${name} 链接：${link} 密码：${pwd} 耗时：${timeCost}毫秒`);

                // 显示提示并处理用户操作
                handleLinkDetection(linkObj, link, name, pwd);
            }
        }
    }

    /**
     * 处理检测到的链接
     * @param {Object} linkObj - 链接对象
     * @param {string} link - 链接地址
     * @param {string} name - 网盘名称
     * @param {string} pwd - 密码
     */
    function handleLinkDetection(linkObj, link, name, pwd) {
        // 更新成功识别次数
        util.setValue(
            'setting_success_times',
            util.getValue('setting_success_times') + 1
        );

        // 获取实际的storage值（如果是函数则执行）
        const storageType = typeof linkObj.storage === 'function'
            ? linkObj.storage()
            : linkObj.storage;

        // 配置弹窗选项
        const options = {
            title: `发现<span style="color: #2778c4;margin: 0 5px;">${name}</span>链接`,
            html: `<span style="font-size: 0.8em;">${!!pwd ? '密码：' + pwd : '是否打开？'}</span>`,
            confirmButtonText: '打开',
            cancelButtonText: '关闭'
        };

        // 添加倒计时设置
        if (util.getValue('setting_timer_open')) {
            options.timer = util.getValue('setting_timer');
        }

        // 显示弹窗并处理用户选择
        dialog.confirm(options).then(res => {
            lastText = 'lorem&';
            window.getSelection().empty();

            // 用户确认或倒计时结束
            if (res.isConfirmed || res.dismiss === 'timer') {
                // 本地存储密码
                if (storageType === "local") {
                    util.setValue(linkObj.storagePwdName, pwd);
                }

                // 打开链接
                const active = util.getValue('setting_active_in_front');
                if (pwd && !linkObj.originalLink) {
                    const extraLink = link.includes('?')
                        ? `${link}&pwd=${pwd}#${pwd}`
                        : `${link}?pwd=${pwd}#${pwd}`;
                    GM_openInTab(extraLink, { active });
                } else {
                    GM_openInTab(link, { active });
                }
            }
        });
    }

    /**
     * 处理按键事件
     * @param {Event} event - 事件对象
     */
    function handleKeyPress(event) {
        // 回车键确认
        if (event.key === 'Enter') {
            const confirmBtn = document.querySelector(`.${CONSTANTS.CUSTOM_CLASSES.confirmButton}`);
            confirmBtn && confirmBtn.click();
        }

        // ESC键取消
        if (event.key === 'Escape') {
            const cancelBtn = document.querySelector(`.${CONSTANTS.CUSTOM_CLASSES.cancelButton}`);
            cancelBtn && cancelBtn.click();
        }
    }

    /**
     * 添加快捷键支持
     */
    function addHotKeySupport() {
        const hotkey = util.getValue('setting_hotkeys');
        hotkeys(hotkey, (event) => {
            event.preventDefault();
            showIdentifyBox();
        });
    }

    /**
     * 解析文本中的网盘链接
     * @param {string} text - 文本内容
     * @param {boolean} autoCompletePrefix - 是否自动补全链接前缀
     * @returns {Object} 解析结果
     */
    function parseLink(text = '', autoCompletePrefix = false) {
        const result = { name: '', link: '', storage: '', storagePwdName: '' };
        if (!text) return result;

        try {
            text = decodeURIComponent(text);
        } catch (e) {
            // 解码失败则使用原始文本
        }

        // 文本预处理
        text = text
            .replace(/[点點]/g, '.')
            .replace(/[\u4e00-\u9fa5()（）,\u200B，\uD83C-\uDBFF\uDC00-\uDFFF]/g, '')
            .replace(/lanzous/g, 'lanzouw'); // 修正lanzous打不开的问题

        // 匹配网盘链接
        for (const name in PAN_CONFIGS) {
            const config = PAN_CONFIGS[name];

            // 自动补全链接前缀
            if (autoCompletePrefix && config.autoCompleteReg) {
                text = text.replace(config.autoCompleteReg, `${config.autoCompleteUrlPrefix}$&`);
            }

            // 检查是否匹配当前网盘
            if (config.reg.test(text)) {
                const matches = text.match(config.reg);
                result.name = config.name;
                result.link = matches[0];
                result.storage = config.storage;
                result.storagePwdName = config.storagePwdName || null;
                result.originalLink = config.originalLink || false;

                // 替换主机名
                if (config.replaceHost) {
                    result.link = result.link.replace(config.host, config.replaceHost);
                }

                return result;
            }
        }

        return result;
    }

    /**
     * 从父元素解析链接
     * @param {Selection} selection - 选择对象
     * @returns {Object} 解析结果
     */
    function parseParentLink(selection) {
        const dom = getSelectionContent(selection, true).querySelector('*[href]');
        return parseLink(dom ? dom.href : "");
    }

    /**
     * 将链接文本作为密码解析
     * @param {Selection} selection - 选择对象
     * @returns {string} 密码
     */
    function parseLinkTextAsPassword(selection) {
        const dom = getSelectionContent(selection, true).querySelector('*[href]');
        // 仅支持英文大小写、数字作为密码
        if (dom && /^[a-zA-Z0-9]+$/.test(dom.innerText)) {
            return dom.innerText;
        }
        return '';
    }

    /**
     * 解析文本中的提取码
     * @param {string} text - 文本内容
     * @returns {string} 提取码
     */
    function parsePassword(text) {
        // 文本预处理
        text = text
            .replace(/\u200B/g, '')
            .replace('%3A', ":")
            .replace(/(?:本帖)?隐藏的?内容[：:]?/, "");

        // 匹配提取码
        const match = text.match(CONSTANTS.PASSWORD_REGEX);
        return match ? match[0] : '';
    }

    /**
     * 根据域名检测网盘类型
     * @returns {string} 网盘类型
     */
    function detectPanType() {
        const hostname = location.hostname;
        for (const name in PAN_CONFIGS) {
            const config = PAN_CONFIGS[name];
            if (config.host.test(hostname)) {
                return name;
            }
        }
        return '';
    }

    /**
     * 自动填写密码
     */
    function autoFillPassword() {
        // 从URL获取密码
        const queryPwd = util.parseQuery('pwd|p');
        const hashPwd = location.hash.slice(1).replace(/\W/g, ""); // 过滤非密码字符
        let pwd = queryPwd || hashPwd;

        // 检测当前网盘类型
        const panType = detectPanType();

        // 处理对应网盘的密码填写
        for (const name in PAN_CONFIGS) {
            const config = PAN_CONFIGS[name];
            if (panType === name) {
                // 获取实际的storage值（如果是函数则执行）
                const storageType = typeof config.storage === 'function'
                    ? config.storage()
                    : config.storage;

                // 本地存储的密码
                if (storageType === 'local') {
                    // URL中密码优先
                    pwd = pwd || util.getValue(config.storagePwdName);
                    pwd && fillPasswordAndSubmit(config.input, config.button, pwd);
                }

                // Hash中的密码
                if (storageType === 'hash') {
                    // 过滤不正常的Hash
                    if (/^(?:wss:[a-zA-Z\d]+|[a-zA-Z0-9]{3,8})$/.test(pwd)) {
                        pwd && fillPasswordAndSubmit(config.input, config.button, pwd);
                    }
                }
            }
        }
    }

    /**
     * 填写密码并提交
     * @param {string[]} inputSelectors - 输入框选择器
     * @param {string[]} buttonSelectors - 按钮选择器
     * @param {string} pwd - 密码
     */
    /* function fillPasswordAndSubmit(inputSelectors, buttonSelectors, pwd) {
        let attempts = 10; // 最大尝试次数
        const interval = setInterval(async () => {
            attempts--;
    
            // 查找输入框和按钮
            const input = util.query(inputSelectors);
            const button = util.query(buttonSelectors);
    
            // 找到可见的输入框
            if (input && !util.isHidden(input)) {
                clearInterval(interval);
    
                // 显示提示 - 使用修复后的toast方法
                dialog.toast({
                    title: 'AI已识别到密码！正自动帮您填写',
                    icon: 'success',
                    timer: 2000
                });
    
                // 填写密码
                const lastValue = input.value;
                input.value = pwd;
    
                // 触发输入事件（兼容Vue/React）
                const event = new Event('input', { bubbles: true });
                const tracker = input._valueTracker;
                if (tracker) {
                    tracker.setValue(lastValue);
                }
                input.dispatchEvent(event);
    
                // 自动点击提交按钮
                if (util.getValue('setting_auto_click_btn')) {
                    await util.sleep(1000); // 延迟1秒点击
                    button.click();
                }
            } else if (attempts <= 0) {
                // 超过最大尝试次数
                clearInterval(interval);
            }
        }, 800); // 每800ms尝试一次
    } */

    /**
     * 填写密码并提交（改进版）
     * @param {string[]} inputSelectors - 输入框选择器
     * @param {string[]} buttonSelectors - 按钮选择器
     * @param {string} pwd - 密码
     */
    function fillPasswordAndSubmit(inputSelectors, buttonSelectors, pwd) {
        let attempts = 10; // 最大尝试次数
        let delay = 800;   // 初始延迟时间
        let attemptCount = 0; // 当前尝试次数
        let passwordFilled = false; // 密码是否已填写

        const interval = setInterval(() => {
            attemptCount++;
            attempts--;

            // 查找输入框和按钮
            const input = util.query(inputSelectors);
            const button = util.query(buttonSelectors);
            

            // 填写密码逻辑（独立于按钮状态）
            if (input && !passwordFilled && !util.isHidden(input)) {
                passwordFilled = true;

                // 显示提示
                dialog.toast({
                    title: 'AI已识别到密码！正自动帮您填写',
                    icon: 'success',
                    timer: 2000
                });

                // 填写密码
                const lastValue = input.value;
                input.value = pwd;

                // 触发输入事件（兼容Vue/React）
                const event = new Event('input', { bubbles: true });
                const tracker = input._valueTracker;
                if (tracker) {
                    tracker.setValue(lastValue);
                }
                input.dispatchEvent(event);
            }

            // 点击按钮逻辑
            if (passwordFilled && button && !button.disabled) {
                clearInterval(interval);

                // 自动点击提交按钮
                if (util.getValue('setting_auto_click_btn')) {
                    setTimeout(() => button.click(), 1000); // 延迟1秒点击
                }
            } else if (attempts <= 0) {
                // 超过最大尝试次数
                clearInterval(interval);

                if (!passwordFilled) {
                    // dialog.toast({
                    //     title: `尝试${attemptCount}次后仍未找到密码输入框`,
                    //     icon: 'error',
                    //     timer: 3000
                    // });
                    //有可能未找到密码输入框，也有可能无需密码，所以不提示
                } else if (!button) {
                    dialog.toast({
                        title: `尝试${attemptCount}次后仍未找到提交按钮`,
                        icon: 'error',
                        timer: 3000
                    });
                } else {
                    dialog.toast({
                        title: `尝试${attemptCount}次后提交按钮仍不可用`,
                        icon: 'error',
                        timer: 3000
                    });
                }
            } else {
                // 指数退避：每次尝试后增加延迟时间
                delay = Math.min(delay * 1.5, 5000); // 最大延迟5秒

                // 计算下次重试的秒数（保留一位小数）
                const nextRetrySeconds = (delay / 1000).toFixed(1);

                // 显示重试提示
                let message = '';
                if (!passwordFilled) {
                    //message = `尝试${attemptCount}次，未找到密码输入框，${nextRetrySeconds}秒后重试（剩余${attempts}次）`;
                    //有可能未找到密码输入框，也有可能无需密码，所以不提示
                } else if (!button) {
                    message = `密码已填写，尝试${attemptCount}次，未找到提交按钮，${nextRetrySeconds}秒后重试（剩余${attempts}次）`;
                } else {
                    message = `密码已填写，尝试${attemptCount}次，提交按钮不可用，${nextRetrySeconds}秒后重试（剩余${attempts}次）`;
                }

                dialog.toast({
                    title: message,
                    icon: 'info',
                    timer: 1000
                });
            }
        }, delay);
    }
    /**
     * 重置识别次数
     */
    function resetIdentifyCount() {
        dialog.confirm({
            title: '确定要重置识别次数吗？',
            text: '',
            confirmButtonText: '确定',
            cancelButtonText: '取消'
        }).then(res => {
            lastText = 'lorem&';
            if (res.isConfirmed) {
                util.setValue('setting_success_times', 0);
                history.go(0);
            }
        });
    }

    /**
     * 显示识别框
     */
    function showIdentifyBox() {
        const hotkeys = util.getValue('setting_hotkeys');

        const html = `
        <textarea
            placeholder="若选方式一，请按 Ctrl+V 粘贴要识别的文字"
            id="panai-textarea"
        ></textarea>
        <div style="font-size: 12px;color: #999;margin-bottom: 8px;text-align: center;">
            提示：在任意网页按下 <span style="font-weight: 700;">${hotkeys}</span> 键可快速打开本窗口。
        </div>
        <div style="font-size: 14px;line-height: 22px;padding: 10px 0 5px;text-align: left;">
            <div style="font-size: 16px;margin-bottom: 8px;font-weight: 700;">支持以下两种方式：</div>
            <div><b>方式一：</b>直接粘贴文字到输入框，点击“识别方框内容”按钮。</div>
            <div>
                <b>方式二：</b>点击“读取剪切板”按钮。
                <span style="color: #d14529;font-size: 12px;">
                    会弹出“授予网站读取剪切板”权限，同意后会自动识别剪切板中的文字。
                </span>
            </div>
        </div>
    `;

        dialog.confirmWithDeny({
            title: '识别剪切板中文字',
            html: html,
            confirmButtonText: '识别方框内容',
            denyButtonText: '读取剪切板',
            cancelButtonText: '关闭'
        }).then(res => {
            util.clog(res)
            if (res.isConfirmed) {
                const value = res.inputValues['panai-textarea']
                smartIdentify(null, value);
            }
            if (res.isDenied) {
                navigator.clipboard.readText()
                    .then(text => smartIdentify(null, text))
                    .catch(() => {
                        // 使用修复后的toast方法
                        dialog.toast({
                            title: '读取剪切板失败，请先授权或手动粘贴后识别！',
                            icon: 'error'
                        });
                    });
            }
        });
    }
    /**
     * 显示设置框
     */
    function showSettingsBox() {
        // 配置所有设置项（恢复缺失的设置项）
        const settings = [
            {
                id: 'S-Auto',
                storageKey: 'setting_auto_click_btn',
                type: 'checkbox',
                label: '填写密码后自动提交',
                className: 'panai-setting-checkbox'
            },
            {
                id: 'S-Active',
                storageKey: 'setting_active_in_front',
                type: 'checkbox',
                label: '前台打开网盘标签页',
                className: 'panai-setting-checkbox'
            },
            {
                id: 'S-Timer-Open',
                storageKey: 'setting_timer_open',
                type: 'checkbox',
                label: '倒计时结束自动打开',
                className: 'panai-setting-checkbox',
                onChange: (value, elements) => {
                    elements['Panai-Range-Wrapper'].style.display = value ? 'flex' : 'none';
                }
            },
            {
                id: 'Panai-Range-Wrapper',
                type: 'wrapper',
                label: `
                <span>倒计时 <span id="Timer-Value">（{{timer}}秒）</span></span>
                <input type="range" id="S-Timer" data-storage-key="setting_timer" min="0" max="10000" step="500" value="{{timer}}" style="width: 200px;">
            `,
                dependsOn: 'S-Timer-Open'
            },
            {
                id: 'S-Text-As-Password',
                storageKey: 'setting_text_as_password',
                type: 'checkbox',
                label: '超链接的文本内容作为密码（实验性）',
                className: 'panai-setting-checkbox'
            },
            {
                id: 'S-Auto-Complete',
                storageKey: 'setting_auto_complete',
                type: 'checkbox',
                label: '自动推导网盘链接(实验性)',
                className: 'panai-setting-checkbox',
                title: '目前仅支持百度、迅雷、夸克等网盘链接进行自动推导补全'
            },
            {
                id: 'S-hotkeys',
                storageKey: 'setting_hotkeys',
                type: 'text',
                label: '快捷键设置',
                style: 'width: 100px;',
                defaultValue: 'F1'
            }
        ];

        // 获取所有设置值并缓存
        const settingValues = {};
        settings.forEach(setting => {
            if (setting.storageKey) {
                // 确保值不为undefined
                const storedValue = util.getValue(setting.storageKey);
                settingValues[setting.storageKey] = storedValue !== undefined
                    ? storedValue
                    : setting.defaultValue !== undefined
                        ? setting.defaultValue
                        : setting.type === 'checkbox' ? false : '';
            }
        });

        // 生成HTML
        let html = '<div style="font-size: 1em;">';
        settings.forEach(setting => {
            // 处理普通输入项
            if (['checkbox', 'text', 'range'].includes(setting.type)) {
                const value = settingValues[setting.storageKey];
                const checked = setting.type === 'checkbox' && value ? 'checked' : '';
                const title = setting.title ? `title="${setting.title}"` : '';
                const style = setting.style ? `style="${setting.style}"` : '';
                const className = setting.className ? setting.className : '';
                const inputValue = setting.type === 'text' ? (value || '') : '';

                html += `
                <label class="panai-setting-label" ${title}>
                    ${setting.label}
                    <input type="${setting.type}" id="${setting.id}" data-storage-key="${setting.storageKey}"
                           ${checked} ${setting.type === 'text' ? `value="${inputValue}"` : ''}
                           class="${className}" ${style}>
                </label>
            `;
            }
            // 处理包装器类型
            else if (setting.type === 'wrapper') {
                const dependsSetting = settings.find(s => s.id === setting.dependsOn);
                const dependsValue = dependsSetting ? settingValues[dependsSetting.storageKey] : false;
                const display = dependsValue ? '' : 'display: none';
                // 替换模板变量
                const timerValue = settingValues.setting_timer || 5000;
                const labelHtml = setting.label.replace(
                    /{{timer}}/g,
                    timerValue / 1000
                );

                html += `
                <label class="panai-setting-label" id="${setting.id}" style="${display}">
                    ${labelHtml}
                </label>
            `;
            }
        });
        html += '</div>';

        // 显示对话框（无保存按钮，只有关闭按钮）
        dialog.alert({
            title: '识别助手配置',
            html: html,
        }).then(res => {
            // 关闭对话框时不需要额外操作，因为已经实时保存
        });

        // 缓存所有元素引用
        const elements = {};
        settings.forEach(setting => {
            if (setting.id) {
                elements[setting.id] = document.getElementById(setting.id);
            }
        });
        // 添加额外需要的元素
        elements['Timer-Value'] = document.getElementById('Timer-Value');
        elements['S-Timer'] = document.getElementById('S-Timer'); // 显式获取滑块元素

        // 实时保存设置的函数
        const saveSetting = (setting, element) => {
            if (!setting.storageKey || !element) return;

            let value;
            switch (setting.type) {
                case 'checkbox':
                    value = element.checked;
                    break;
                case 'range':
                    value = parseInt(element.value, 10);
                    // 更新显示
                    if (elements['Timer-Value']) {
                        elements['Timer-Value'].innerText = `（${value / 1000}秒）`;
                    }
                    break;
                case 'text':
                    value = element.value.trim() || setting.defaultValue || '';
                    break;
                default:
                    value = element.value;
            }

            // 保存值
            util.setValue(setting.storageKey, value);

            // 显示保存提示
            dialog.toast({
                title: '设置已更新',
                icon: 'success',
                timer: 1000
            });
        };

        // 绑定事件（同时处理UI更新和实时保存）
        settings.forEach(setting => {
            const element = elements[setting.id];
            if (element) {
                // 定义通用的变更处理函数
                const handleChange = (e) => {
                    const value = setting.type === 'checkbox' ? e.target.checked : e.target.value;

                    // 执行设置项自身的变更逻辑（如显示/隐藏相关控件）
                    if (setting.onChange) {
                        setting.onChange(value, elements);
                    }

                    // 实时保存设置
                    saveSetting(setting, element);
                };

                // 根据输入类型绑定合适的事件
                if (setting.type === 'range') {
                    // 滑块实时更新
                    element.addEventListener('input', handleChange);
                } else {
                    // 其他控件在值变更时更新
                    element.addEventListener('change', handleChange);

                    // 文本框在输入时就实时保存
                    if (setting.type === 'text') {
                        element.addEventListener('input', handleChange);
                    }
                }
            }
        });

        // 初始化：确保首次打开时正确显示依赖项
        const timerOpenElement = elements['S-Timer-Open'];
        const timerWrapper = elements['Panai-Range-Wrapper'];

        if (timerOpenElement && timerWrapper) {
            const isTimerEnabled = timerOpenElement.checked;
            timerWrapper.style.display = isTimerEnabled ? 'flex' : 'none';
        }
    }

    /**
     * 注册菜单命令
     */
    function registerMenuCommands() {
        GM_registerMenuCommand(
            `👀 已识别：${util.getValue('setting_success_times')}次`,
            () => resetIdentifyCount()
        );

        GM_registerMenuCommand(
            `📋️ 识别剪切板中文字（快捷键 ${util.getValue('setting_hotkeys')}）`,
            () => showIdentifyBox()
        );

        GM_registerMenuCommand(
            '⚙️ 设置',
            () => showSettingsBox()
        );
    }

    /**
     * 添加插件样式
     */
    function addPluginStyles() {
        if (document.head) {
            util.addStyle(
                'panai-style',
                'style',
                CONSTANTS.PLUGIN_STYLES
            );
        }

        // 监听head变化，确保样式被添加
        const headObserver = new MutationObserver(() => {
            util.addStyle(
                'panai-style',
                'style',
                CONSTANTS.PLUGIN_STYLES
            );
        });

        headObserver.observe(document.head, { childList: true, subtree: true });
    }

    /**
     * 检查是否为顶层窗口
     * @returns {boolean} 是否为顶层窗口
     */
    function isTopWindow() {
        return window.self === window.top;
    }

    /**
     * 初始化插件
     */
    function initPanHelper() {
        // 初始化自定义对话框
        dialog = new Dialog();
        // 先初始化工具
        util = createUtil();
        // 再初始化网盘配置（此时util已可用）
        initPanConfigs();

        // 执行初始化流程
        initSettings();
        addPluginStyles();
        addHotKeySupport();
        autoFillPassword();
        addPageListeners();

        // 只在顶层窗口注册菜单命令
        if (isTopWindow()) {
            registerMenuCommands();
        }
    }

    // 启动插件
    initPanHelper();
})();