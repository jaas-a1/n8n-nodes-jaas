import {
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class jaasApi implements ICredentialType {
  name = 'jaasApi';
  displayName = 'JaaS API';
  documentationUrl = 'https://127.0.0.1:8000/docs';
  properties: INodeProperties[] = [
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
