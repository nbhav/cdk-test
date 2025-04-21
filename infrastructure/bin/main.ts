#!/usr/local/opt/node/bin/node
import * as cdk from 'aws-cdk-lib';
import { RoleStack } from '../lib/iam';
import { LambdaStack } from '../lib/lambda';
import { Code, Runtime } from 'aws-cdk-lib/aws-lambda';

const app = new cdk.App();
const roleStackObj = new RoleStack(app, 'role', {
  env: {
    account: '123456789012', // dummy AWS account ID
    region: 'us-east-1',
  },
  roleName: 'MyRole',
  description: 'My role description',
  servicePrincipal: 'ecs-tasks.amazonaws.com',
  policyActions: ['s3:ListBucket', 's3:GetObject'],
});



new LambdaStack(app, "test",
   {lambdaRole: roleStackObj.role,
    runtime: Runtime.NODEJS_20_X,
    code: Code.fromAsset('../lambda'),
    handler: 'hello.handler'});