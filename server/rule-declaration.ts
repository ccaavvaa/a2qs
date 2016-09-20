import {MessageType} from './message';
export class RuleDeclaration {
    constructor(public type: MessageType, public constr: any, public properties: string[], public rule: any){}
}

export var ruleDeclarations: RuleDeclaration[] = [];