import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Role, ServicePrincipal, PolicyStatement, Policy } from 'aws-cdk-lib/aws-iam';
import { IamProps } from './props/iam-props';
import { CfnOutput } from 'aws-cdk-lib';

function createRole(scope: Construct, id: string, props: IamProps) {
  const role = new Role(scope, id, {
    roleName: props.roleName,
    description: props.description,
    assumedBy: new ServicePrincipal(props.servicePrincipal),
  });

  const policy = new Policy(scope, 'Policy', {
    statements: [
      new PolicyStatement({
        actions: props.policyActions,
        resources: ['*'],
      }),
    ],
  })

  role.attachInlinePolicy(policy)
  return role;
}

export class RoleStack extends cdk.Stack {
  public readonly role: Role;
  constructor(scope: Construct, id: string, props: IamProps) {
    super(scope, id, props);

    this.role = createRole(this, id, props);

    new CfnOutput(this, 'RoleArn', {
      value: this.role.roleArn,
      description: 'The ARN of the IAM role',
      exportName: 'RoleArn',
    });
  }
}
