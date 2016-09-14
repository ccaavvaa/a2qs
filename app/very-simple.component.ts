import {Component, OnInit, Input} from "@angular/core"
import { ActivatedRoute, Params } from '@angular/router';

import {ViewModelService} from './viewmodel.service';
@Component({
    selector: 'very-simple',
    templateUrl: 'app/very-simple.component.html',
    providers:[
        ViewModelService
    ]
})
export class VerySimpleComponent implements OnInit {
    private idView: string = 'very-simple';
    private id:string;
    @Input()
    data: any;

    get a(){return this.data.a;}
    set a(value:any){
        this.viewModelService.setProp(this.idView, this.id, 'a', value)
    }

    get b(){return this.data.b;}
    set b(value:any){
        this.viewModelService.setProp(this.idView, this.id, 'b', value)
    }
    constructor(
        private viewModelService: ViewModelService,
        private route: ActivatedRoute) {    }
    
    ngOnInit(): void {
        this.route.params.forEach((params: Params)=>{
           this.id = params['id'];
        });
        this.viewModelService
            .getViewModel(this.idView, this.id)
            .then(data => this.data = data);
    }

    goBack(): void {
        window.history.back();
    }
}