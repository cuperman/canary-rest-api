import path = require('path');

import { Stack, Construct, StackProps } from '@aws-cdk/core';
import { Function, Code, Runtime } from '@aws-cdk/aws-lambda';
import { RestApi, LambdaIntegration } from '@aws-cdk/aws-apigateway';

export class ContactsRestApiStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const backendCode = Code.fromAsset(path.join(__dirname, '../../backend'));
    const backendRuntime = Runtime.NODEJS_10_X;

    const createContact = new Function(this, 'CreateContact', {
      code: backendCode,
      runtime: backendRuntime,
      handler: 'index.createContact'
    });

    const readContacts = new Function(this, 'ReadContacts', {
      code: backendCode,
      runtime: backendRuntime,
      handler: 'index.readContacts'
    });

    const readContact = new Function(this, 'ReadContact', {
      code: backendCode,
      runtime: backendRuntime,
      handler: 'index.readContact'
    });

    const updateContact = new Function(this, 'UpdateContact', {
      code: backendCode,
      runtime: backendRuntime,
      handler: 'index.updateContact'
    });

    const deleteContact = new Function(this, 'DeleteContact', {
      code: backendCode,
      runtime: backendRuntime,
      handler: 'index.deleteContact'
    });

    const api = new RestApi(this, 'ContactsRestApi');

    const contactsCollection = api.root.addResource('contacts');
    contactsCollection.addMethod('POST', new LambdaIntegration(createContact));
    contactsCollection.addMethod('GET', new LambdaIntegration(readContacts));

    const contactsMember = contactsCollection.addResource('{id}');

    contactsMember.addMethod('GET', new LambdaIntegration(readContact));
    contactsMember.addMethod('PATCH', new LambdaIntegration(updateContact));
    contactsMember.addMethod('DELETE', new LambdaIntegration(deleteContact));
  }
}
