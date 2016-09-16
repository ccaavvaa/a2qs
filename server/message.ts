
export enum MessageType {
    ObjectInit = 1,
    PropChange
}

export interface Message{
    type: MessageType;
    body: any;
}
