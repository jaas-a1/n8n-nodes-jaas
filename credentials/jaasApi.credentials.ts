import {
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class jaasApi implements ICredentialType {
  name = 'jaasApi';
  displayName = 'JaaS API';
  documentationUrl = 'https://jaas-ai.net';
  properties: INodeProperties[] = [
    {
      displayName: 'API Key',
      name: 'apiKey',
      type: 'string',
			typeOptions: {
    		password: true,
  		},
      default: '',
      required: true,
      description: 'Your JaaS API key',
    },
  ];
}
