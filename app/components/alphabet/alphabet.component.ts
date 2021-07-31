import { Component, Input } from '@angular/core';

export interface ILetter {
    code: string;
    image: string;
    label: string;
    words: Array<string>;
    isVovel: boolean;
}

@Component({
    selector: 'alphabet',
    templateUrl: './alphabet.component.html',
    styleUrls: ['./alphabet.component.scss']
})

export class AlphabetComponent {
    @Input() activeLetter?: ILetter['code'];
    @Input() letters: Array<ILetter> = [];
}
