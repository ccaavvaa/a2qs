import {Container} from './container';
import {Message, MessageType} from './message';

export abstract class ModelObject {
    constructor(protected container: Container, protected data: any) { }
    protected setProperty(propName: string, value: any): Promise<void>{
        this.data[propName] = value;
        return this.container.sendMessage({
                type: MessageType.PropChanged,
                body: {
                    className: this.constructor.name,
                    target: this,
                    propName: propName,
                }
            });
    }
    static registerRules(container: Container): void{};
}