import {Injectable} from "@angular/core";

@Injectable()
export class ViewModelService {
    private testView: any = {
        idViewModel: '1',
        a: 'aaaa',
        b: 'aaab'
    }

    getViewModel(idView: string, idViewModel: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            setTimeout(resolve(this.testView), 500);
        });
    }

    setProp(idView: string, idViewModel: string, prop: string, value: any): void {
        console.log(prop + ' ' + value);
        this.testView[prop] = value;
        setTimeout(() => {
            switch (prop) {
                case 'a': this.testView.b = this.testView.a + ' from a'; break;
            }
        }, 500);
    }
}