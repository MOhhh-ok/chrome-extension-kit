import { Action } from '@masa-dev/chrome-extension-kit';

export const testAction = new Action<number, string>(
    'testAction',
    'background',
    async (data) => {
        return `aa${data}bb`;
    }
);
