import { StackProps } from "aws-cdk-lib";
import { Role } from 'aws-cdk-lib/aws-iam';
import { Code } from 'aws-cdk-lib/aws-lambda';
import { Runtime } from 'aws-cdk-lib/aws-lambda';


// Reference: https://constructs.dev/packages/@aws-cdk/aws-lambda/v/1.204.0?lang=typescript
export interface LambdaStackProps extends StackProps {
    lambdaRole ?: Role;
    handler: string;
    code: Code;
    runtime: Runtime;
}

