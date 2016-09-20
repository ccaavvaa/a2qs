import {ModelObject} from './model-object';
import {Container, RuleCondition, Rule} from './container';
import {Message, MessageType, PropChangedBody, PropChangedMessage} from './message';
import {PropChangedRule, InitRule} from './decorators'; 

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

    constructor (container: Container, data: any){
        super(container, data)
    }

    @PropChangedRule(['a'])
    static async rule2(target: VerySimpleModel, propName: string): Promise<void>
    {
        return target.setB(await target.getA() + " from a");
    }
    @InitRule()
    static async rule3(target: VerySimpleModel): Promise<void>
    {
        return target.setA("initial aa");
    }
    
/*    static async initRule(message: Message): Promise<void> {
        let pcm = message as PropChangedMessage;
        let target = pcm.body.target as VerySimpleModel;

        return target.setA("initial a");
    }
*/
    static registerRules(container: Container) {
        /*
        container.registerRule(
            {
                type: MessageType.PropChanged,
                body: {
                    constr: VerySimpleModel,
                    propName: 'a'
                }
            }, VerySimpleModel.rule1);
        */

        /*
        container.registerRule(
            {
                type: MessageType.ObjectInit,
                body: {
                    constr: VerySimpleModel
                }
            }, VerySimpleModel.initRule);
            */
    }
}