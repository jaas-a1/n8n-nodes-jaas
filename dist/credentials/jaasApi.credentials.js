"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jaasApi = void 0;
class jaasApi {
    constructor() {
        this.name = 'jaasApi';
        this.displayName = 'JaaS API';
        this.documentationUrl = 'https://127.0.0.1:8000/docs';
        this.properties = [
            {
                displayName: 'API Key',
                name: 'apiKey',
                type: 'string',
                default: '',
                required: true,
                description: 'Your JaaS API key',
            },
        ];
    }
}
exports.jaasApi = jaasApi;
//# sourceMappingURL=jaasApi.credentials.js.map