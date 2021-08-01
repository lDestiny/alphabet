import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { letters as defaultData } from './letters';
import { ILetter } from '@components';

let letters: Array<ILetter> = [];

function isLetter(obj: any): obj is ILetter {
    return typeof obj == 'object' 
        && typeof obj.code == 'string'
        && typeof obj.image == 'string'
        && typeof obj.label == 'string'
        && Array.isArray(obj.words)
        && typeof obj.isVovel == 'boolean';
}

try { 
    const json = localStorage.getItem('letters');
    if (json) {
        const data = JSON.parse(json); 
        if (!Array.isArray(data) || !data.every(isLetter) || !data.length){
            throw new Error();            
        }
        letters = data;
    } else {
        throw new Error();
    }
} catch(err) {
    letters = defaultData
}
@Component({
    selector: 'challenge-view',
    templateUrl: './challenge.view.html',
    styleUrls: ['./challenge.view.scss']
})

export class ChallengeView {
    activeLetter?: ILetter;
    letters = letters;

    constructor(private _route: ActivatedRoute) {
        localStorage.setItem('letters', JSON.stringify(this.letters));
        this.activeLetter = this.letters.find(letter => letter.code == _route.snapshot.params['letter']);
    }

    ngOnInit() {
        this._route.url
            .subscribe(() => {
                this.activeLetter = this.letters.find(letter => letter.code == this._route.snapshot.params['letter']);
            });
    }
}
