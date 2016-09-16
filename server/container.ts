import {Message, MessageType} from './message';

export interface RuleCondition {
    type: MessageType,
    body: any
}
export type Rule = (message: Message) => Promise<void>;

class RuleRegistration {
    constructor(public condition: RuleCondition, public rule: Rule) { }

    match(message: Message): boolean {
        if (message.type && this.condition.type != message.type) {
            return false;
        }

        let bodyConditions = Object.getOwnPropertyNames(this.condition.body);
        for (let i = 0, len = bodyConditions.length; i < len; i++) {
            let p = bodyConditions[i];
            if (this.condition.body[p] == message.body[p]) continue;
            return false;
        }
        return true;
    }
}

export class Container {
    
    private rules: RuleRegistration[] = [];

    async sendMessage(msg: Message): Promise<void> {
        let matchedRules = this.rules
            .filter(r => r.match(msg))
            .map(r => r.rule);
        for (let i = 0, len = matchedRules.length; i < len; i++) {
            let r = matchedRules[i];
            await r(msg);
        }
    }

    registerRule(condition: RuleCondition, rule: Rule) {
        this.rules.push(new RuleRegistration(condition, rule));
    }


    private constructors: any[] = [];

    registerConstructor(constr:any){
        this.constructors.push(constr);

        if(constr.prototype.registerRules){
           constr.prototype.registerRules(this); 
        }
    }

    createNew(className: string): Promise<any>{
        let constr = this.constructors.find((f=>f.name == className));
        let instance = new constr(this);
        
        return this.sendMessage(
            {
                type: MessageType.ObjectInit, 
                body: {
                    constr:instance.constructor, 
                    target:instance
                }
            })
            .then<any>(()=>instance);
    }
}