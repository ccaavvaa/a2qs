"use strict";
import { PersistantStore, DataDriverOptions } from 'persistantstore';
let options: DataDriverOptions = {
    dataUrl: 'http://sermilappaq/data/mdr',
    dataNamespace: 'TestVirit',
    dataProtocol: 'odata',
    tenantId: "1"
};
let persistantstore = new PersistantStore(options);

export {persistantstore};