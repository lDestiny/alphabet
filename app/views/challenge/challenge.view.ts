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
        if (!Array.isArray(data) || !data.every(isLetter)){
            throw new Error('Error');            
        } else {
            letters = data;
        }
    }
} catch(err) {
    letters = defaultData
}


function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

interface IWordLetter {
    active: boolean;
    code: string;
}

let timeout: NodeJS.Timeout;

@Component({
    selector: 'challenge-view',
    templateUrl: './challenge.view.html',
    styleUrls: ['./challenge.view.scss']
})

export class ChallengeView {
    activeLetter?: ILetter;
    letters = letters;
    answer?: boolean;
    private _word: Array<IWordLetter> = [];

    constructor(private _route: ActivatedRoute) {
        localStorage.setItem('letters', JSON.stringify(this.letters));
        this.activeLetter = this.letters.find(letter => letter.code == _route.snapshot.params['letter']);
        if (this.activeLetter) this.word = this.activeLetter.words[getRandomInt(this.activeLetter.words.length)]
    }

    set word(data: any) { 
        this._word = String(data).split('')
            .map((item: string) => {
                return {
                    active: false,
                    code: item
                }
            })
    }

    get word(): Array<IWordLetter> {
        return this._word;
    }

    check(letter: IWordLetter) {
        const answer = this.activeLetter?.code.toLowerCase() == letter.code.toLowerCase()
        letter.active = answer;
        this.answer = answer;
        timeout = setTimeout(() => {
            if(timeout) clearTimeout(timeout);
            this.answer = undefined;            
        }, 600);
    }

    ngOnInit() {
        this._route.url
            .subscribe(() => {
                this.activeLetter = this.letters.find(letter => letter.code == this._route.snapshot.params['letter']);
                if (this.activeLetter) this.word = this.activeLetter.words[getRandomInt(this.activeLetter.words.length)];
                this.answer = undefined;
            });
    }
}
