
import {ModelObject} from './model-object';
export enum MessageType {
    Undefined = 0,
    ObjectInit = 1 << 1,
    PropChanged = 1 << 2
}

export interface Message {
    type: MessageType;
    body: any;
}

export interface PropChangedBody {
    constr: Function;
    target: ModelObject;
    propName: string;
}

export interface PropChangedMessage extends Message {
    body: PropChangedBody;
}
