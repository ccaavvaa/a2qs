"use strict";

import * as bodyParser from "body-parser";
import * as express from "express";
import * as path from "path";
import {Container} from './container';
import {VerySimpleModel} from './very-simple-model';

/**
 * The server.
 *
 * @class Server
 */
class Server {

    public app: express.Application;

    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    public static bootstrap(): Server {
        return new Server();
    }

    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    constructor() {
        //create expressjs application
        this.app = express();

        //configure application
        this.app.use(bodyParser.json());

        this.app.get('/hello', (req, res) => {
            res.json({ msg: 'hello world!' });
        });

        this.app.get('/api/view/:modelName', (req, res) =>{
            let modelName = req.params.modelName;
            container.getNew(modelName)
            .then(m=> res.json(m));
        });
        this.app.post('/api/data/:id', (req, res) =>{
            console.log('ok? ' + req.body);
            container.patch(req.params.id, req.body.patches as any[])
            .then(m=> res.json(m.data));
        });
    }

    start() {
        this.app.listen(3030, (err: any, response: any) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log(response);
            }

        });
    }
}
Server.bootstrap().start();
var container = new Container();
container.registerConstructor(VerySimpleModel);