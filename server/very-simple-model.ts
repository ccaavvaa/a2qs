import {ModelObject} from './model-object';
import {Container, RuleCondition, Rule} from './container';
import {Message, MessageType, PropChangedBody, PropChangedMessage} from './message';

export class VerySimpleModel extends ModelObject {
    get id() { return this.data.id; }
    
    getA(): Promise<string> {
        return Promise.resolve<string>(this.data.a);
    }
    
    setA(value: string): Promise<void> {
        return this.setProperty('a', value);
    }

    getB(): Promise<string> {
        return Promise.resolve<string>(this.data.b);
    }
    
    setB(value: string): Promise<void> {
        return this.setProperty('b', value);
    }

    static async rule1(message: Message): Promise<void>{
        let pcm = message as PropChangedMessage;
        let target = pcm.body.target as VerySimpleModel;

        return target.setB(await target.getA() + "from a");
    }

    static async initRule(message: Message): Promise<void>{
        let pcm = message as PropChangedMessage;
        let target = pcm.body.target as VerySimpleModel;

        return target.setA("initial a");
    }

    static registerRules(container: Container){
        container.registerRule(
            {
                type: MessageType.PropChanged,
                body: {
                    constr: VerySimpleModel.constructor,
                    propName: 'a'
                } 
            }, VerySimpleModel.rule1);
        container.registerRule(
            {
                type: MessageType.ObjectInit,
                body: {
                    constr: VerySimpleModel.constructor
                }
            }, VerySimpleModel.initRule)
        )
    }
}