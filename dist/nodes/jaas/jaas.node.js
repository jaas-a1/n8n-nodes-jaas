"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jaas = void 0;
const n8n_workflow_1 = require("n8n-workflow");
class jaas {
    constructor() {
        this.description = {
            displayName: 'JaaS',
            name: 'jaas',
            icon: 'file:jaas_icon.svg',
            group: ['transform'],
            version: 1,
            description: 'Evaluate Chat Bots',
            defaults: {
                name: 'JaaS',
            },
            inputs: ['main'],
            outputs: ['main'],
            credentials: [
                {
                    name: 'jaasApi',
                    required: true,
                },
            ],
            properties: [
                {
                    displayName: 'Evaluation Criteria 1',
                    name: 'criteria1',
                    type: 'string',
                    default: 'Accuracy',
                    required: false,
                },
                {
                    displayName: 'Evaluation Criteria 2',
                    name: 'criteria2',
                    type: 'string',
                    default: '',
                    required: false,
                },
                {
                    displayName: 'Evaluation Criteria 3',
                    name: 'criteria3',
                    type: 'string',
                    default: '',
                    required: false,
                },
                {
                    displayName: 'Type of Evaluation',
                    name: 'type',
                    type: 'options',
                    options: [
                        {
                            name: 'Single',
                            value: 'S',
                        },
                        {
                            name: 'Conversational',
                            value: 'C',
                        },
                        {
                            name: 'Verified',
                            value: 'V',
                        },
                    ],
                    default: 'S',
                    required: false,
                },
            ],
        };
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        for (let i = 0; i < items.length; i++) {
            try {
                const question = items[i].json.question || "";
                const answer = items[i].json.answer || "";
                const context = items[i].json.context || "";
                const ground_truth_answer = items[i].json.ground_truth_answer || "";
                const cohort = items[i].json.cohort || "N8N-NC";
                const evaluation_criteria1 = this.getNodeParameter('criteria1', i) || "Accuracy";
                const evaluation_criteria2 = this.getNodeParameter('criteria2', i) || "";
                const evaluation_criteria3 = this.getNodeParameter('criteria3', i) || "";
                const evaluation_criteria = [evaluation_criteria1, evaluation_criteria2, evaluation_criteria3]
                    .filter(c => c && c.trim() !== "");
                const type = this.getNodeParameter('type', i);
                const credentials = await this.getCredentials('jaasApi');
                const apiKey = credentials.apiKey;
                if (apiKey === undefined) {
                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'No API key provided!');
                }
                const jaasData = await this.helpers.request({
                    method: 'POST',
                    url: 'https://api.jaas-ai.com/v1/evaluate',
                    headers: {
                        'accept': 'application/json',
                        'Authorization': 'Bearer ' + apiKey,
                    },
                    body: {
                        'question': question,
                        'ground_truth_answer': ground_truth_answer,
                        'answer': answer,
                        'context': context,
                        'evaluation_criteria': evaluation_criteria,
                        'type': type,
                        'cohort': cohort,
                    },
                    json: true,
                });
                returnData.push({
                    json: {
                        'status': jaasData.status,
                        'criteria': jaasData.criteria,
                        'type': jaasData.evaluation_type,
                    },
                });
            }
            catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({
                        json: {
                            error: error.message,
                        },
                    });
                    continue;
                }
                throw new n8n_workflow_1.NodeOperationError(this.getNode(), error);
            }
        }
        return [returnData];
    }
}
exports.jaas = jaas;
//# sourceMappingURL=jaas.node.js.map