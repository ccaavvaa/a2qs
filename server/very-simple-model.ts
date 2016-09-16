import {ModelObject} from './model-object';

export class VerySimpleModel extends ModelObject {
    get id() { return this.data.id; }
    
    getA(): Promise<string> {
        return Promise.resolve<string>(this.data.a);
    }
    
    setA(value: string): Promise<void> {
        return this.setProperty('a', value);
    }

    
}