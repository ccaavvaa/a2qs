import {Container} from './container';
import {Message, MessageType} from './message';

export abstract class ModelObject {
    get id() { return this.data.id; }

    constructor(protected container: Container, protected data: any) {
        if(!data){
            this.data = {};
        }

        if(!data.id){
            data.id = ++Container.lastId + '';
        }
    }
    setProperty(propName: string, value: any): Promise<void>{
        this.data[propName] = value;
        return this.container.sendMessage({
                type: MessageType.PropChanged,
                body: {
                    constr: this.constructor,
                    target: this,
                    propName: propName,
                }
            });
    }
    static registerRules(container: Container): void{};
}