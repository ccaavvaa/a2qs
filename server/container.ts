import {Message, MessageType, PropChangedMessage} from './message';
import {ModelObject} from './model-object';
import {ruleDeclarations, RuleDeclaration} from './rule-declaration';

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

    static lastId: number = 0;

    private instances: any = {};

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

    registerConstructor(constr: any) {
        this.constructors.push(constr);

        if (constr.registerRules) {
            constr.registerRules(this);
        }

        ruleDeclarations
            .filter(r => r.type == MessageType.PropChanged && r.constr === constr)
            .forEach(rd => {
                rd.properties.forEach(propName => {
                    this.registerRule(
                        {
                            type: MessageType.PropChanged,
                            body: {
                                constr: rd.constr,
                                propName: propName
                            }
                        },
                        function (message: Message): Promise<void> {
                            let pcm = message as PropChangedMessage;
                            let target = pcm.body.target;
                            return (rd.rule as (target: any, propName: string) => Promise<void>)(target, propName);
                        }
                    )
                })
            });
        ruleDeclarations
            .filter(r => r.type == MessageType.ObjectInit && r.constr === constr)
            .forEach(rd => {
                this.registerRule(
                    {
                        type: MessageType.ObjectInit,
                        body: {
                            constr: rd.constr
                        }
                    },
                    function (message: Message): Promise<void> {
                        let target = message.body.target;
                        return (rd.rule as (target: any) => Promise<void>)(target);
                    }
                )
            });
    }

    createNew(className: string): Promise<any> {
        let constr = this.constructors.find((f => f.name == className));
        let instance = new constr(this, {});
        this.instances[instance.id] = instance;
        return this.sendMessage(
            {
                type: MessageType.ObjectInit,
                body: {
                    constr: constr,
                    target: instance
                }
            })
            .then<any>(() => instance);
    }

    getNew(className: string): Promise<any> {
        return this.createNew(className)
            .then(instance => instance.data);
    }

    async patch(id: string, patches: any[]): Promise<any> {
        let instance = this.instances[id] as ModelObject;
        for (let i = 0, len = patches.length; i < len; i++) {
            let patch = patches[i];
            await instance.setProperty(patch.path, patch.value);
        }
        return instance;
    }
}