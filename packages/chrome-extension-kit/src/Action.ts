export class Action<S, R> {
    constructor(
        private key: string,
        private destination: 'activeTab' | 'background',
        private listener: (data: S) => Promise<R>
    ) {}

    send(data: S): Promise<R> {
        return new Promise((resolve, reject) => {
            const message = { action: this.key, data };
            const callback = (response: R) => {
                if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
                else resolve(response);
            };
            switch (this.destination) {
                case 'activeTab':
                    chrome.tabs.query(
                        { active: true, currentWindow: true },
                        (tabs) => {
                            if (!tabs[0]?.id) return;
                            chrome.tabs.sendMessage(
                                tabs[0].id,
                                message,
                                callback
                            );
                        }
                    );
                    break;
                case 'background':
                    chrome.runtime.sendMessage(message, callback);
                    break;
            }
        });
    }

    listen() {
        chrome.runtime.onMessage.addListener(
            (message, sender, sendResponse) => {
                if (message.action === this.key) {
                    this.listener(message.data).then((r) => {
                        sendResponse(r);
                    });
                }
                return true;
            }
        );
    }
}
