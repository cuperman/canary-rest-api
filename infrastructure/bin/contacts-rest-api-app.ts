#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { ContactsRestApiStack } from '../lib/contacts-rest-api-stack';

const app = new cdk.App();
new ContactsRestApiStack(app, 'ContactsRestApiApp');
