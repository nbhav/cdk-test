import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as lambda from '../lib/lambda';
import * as iam from '../lib/iam';

import { Code, Runtime } from 'aws-cdk-lib/aws-lambda';

// example test. To run these tests, uncomment this file along with the
// example resource in lib/infrastructure-stack.ts
test('Lambda Function Created No Role', () => {
  const app = new cdk.App();
  const stack = new lambda.LambdaStack(app, 'MyTestStack',
        { runtime: Runtime.NODEJS_20_X,
        code: Code.fromAsset('../lambda'),
        handler: 'hello.handler'}
    );

    const template = Template.fromStack(stack);

    // Assert it creates the function with the correct properties...
    template.hasResourceProperties("AWS::Lambda::Function", {
        Handler: "hello.handler",
        Runtime: "nodejs20.x",
        });

});

test('Lambda Function Created Has Role', () => {
    const app = new cdk.App();
    const iamStack = new iam.RoleStack(app, 'MyTestStackIam', {
        env: {
            account: '123456789012', // dummy AWS account ID
            region: 'us-east-1',
          },
          roleName: 'MyRole',
          description: 'My role description',
          servicePrincipal: 'ecs-tasks.amazonaws.com',
          policyActions: ['s3:ListBucket', 's3:GetObject'],
    })
    const lambdaStack = new lambda.LambdaStack(app, 'MyTestStackLambda',
        {lambdaRole: iamStack.role,
          runtime: Runtime.NODEJS_20_X,
          code: Code.fromAsset('../lambda'),
          handler: 'hello.handler'}
    );



    // console.log(iamStack.role)

    const template = Template.fromStack(lambdaStack)
    console.log(JSON.stringify(template.toJSON(), null, 2));

    template.hasResourceProperties("AWS::Lambda::Function", {
        Handler: "hello.handler",
        Runtime: "nodejs20.x",
        
        // Not sure if this is the best waty to test this
        Role: {
            "Fn::Join": [
              "",
              [
                "arn:",
                { Ref: "AWS::Partition" },
                ":iam::123456789012:role/MyRole"
              ]
            ]
          }
        });

  });
  