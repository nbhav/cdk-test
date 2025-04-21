import { Construct } from 'constructs';
import { Stack } from 'aws-cdk-lib';
import { LambdaStackProps } from './props/lambda-props';
import { Runtime, Code, Function } from 'aws-cdk-lib/aws-lambda';

// Reference on Logic in Tutorial here:
// https://docs.aws.amazon.com/cdk/v2/guide/serverless-example.html

export class LambdaStack extends Stack{
    constructor(scope: Construct, id: string, props: LambdaStackProps){
        super(scope, id, props);
        // Ref: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda-readme.html
        // Define the Lambda function resource
        const helloWorldFunction = new Function(this, 'HelloWorldFunction', {
            runtime: Runtime.NODEJS_20_X, // Choose any supported Node.js runtime
            code: Code.fromAsset('../lambda'), // Points to the lambda directory
            handler: 'hello.handler', // Points to the 'hello' file in the lambda directory
            role: props.lambdaRole ? props.lambdaRole : undefined
        });
    }
}
