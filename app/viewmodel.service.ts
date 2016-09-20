import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ViewModelService {
    constructor(private http: Http) { }
    private url: string = '/api/';
    private testView: any = {
        idViewModel: '1',
        a: 'aaaa',
        b: 'aaab'
    }

    getViewModel(idView: string, idViewModel: string): Promise<any> {
        let url = this.url + 'view/' + 'VerySimpleModel';
        console.log(url);
        return this.http.get(url)
            .toPromise()
            .then(r => { this.testView = r.json(); return this.testView });
        //return new Promise<any>((resolve, reject) => {


        //setTimeout(resolve(this.testView), 500);
        //});
    }

    setProp(idView: string, idViewModel: string, prop: string, value: any): void {
        console.log(prop + ' ' + value);
        this.testView[prop] = value;
        let url = this.url + 'data/' + this.testView.id;
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        let patches: any = { patches: [{ op: 'add', path: prop, value: value }] };
        this.http
            .post(url, JSON.stringify(patches), { headers: headers })
            .toPromise()
            .then(res => {
                let o = res.json();
                if (prop === 'a') {
                    this.testView.b = o.b;
                } else {
                    this.testView.a = o.a;
                }
            });

    }
}