import {ruleDeclarations, RuleDeclaration} from './rule-declaration';
import {MessageType} from './message';


export function PropChangedRule(properties: string[]){
    return function (target: any, propertyKey:string, descriptor: PropertyDescriptor){
        let ruleDeclaration = new RuleDeclaration(MessageType.PropChanged, target, properties, descriptor.value);
        ruleDeclarations.push(ruleDeclaration);
    }
}
export function InitRule() {
    return function (target: any, propertyKey:string, descriptor: PropertyDescriptor){
        let ruleDeclaration = new RuleDeclaration(MessageType.ObjectInit, target, null, descriptor.value);
        ruleDeclarations.push(ruleDeclaration);
    }
}