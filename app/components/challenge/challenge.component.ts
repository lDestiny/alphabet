import { Component, Input } from '@angular/core';
import { ILetter } from '@components';


function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

interface IWordLetter {
    active: boolean;
    code: string;
}

let timeout: NodeJS.Timeout;

@Component({
    selector: 'challenge',
    templateUrl: './challenge.component.html',
    styleUrls: ['./challenge.component.scss']
})

export class ChallengeComponent {
    @Input() letter?: ILetter;
    answer?: boolean
    private _word: Array<IWordLetter> = [];

    constructor() {
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

    ngOnInit() {
        this._updateModel();
    }

    ngOnChanges() {
        this._updateModel();
    }

    private _updateModel() {
        if (!this.letter) {
            throw new Error('Необходимо указать букву');
        }
        this.word = this.letter?.words[getRandomInt(this.letter.words.length)];
    }

    check(letter: IWordLetter) {
        const answer = this.letter?.code.toLowerCase() == letter.code.toLowerCase()
        letter.active = answer;
        this.answer = answer;
        timeout = setTimeout(() => {
            if (timeout) clearTimeout(timeout);
            this.answer = undefined;
        }, 600);
    }
}
