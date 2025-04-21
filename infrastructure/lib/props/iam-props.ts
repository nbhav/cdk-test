import { StackProps } from "aws-cdk-lib";

export interface IamProps extends StackProps {
    readonly env: {[key: string]: string };
    readonly roleName: string;
    readonly description: string;
    readonly servicePrincipal: string;
    readonly policyActions: string[];
}