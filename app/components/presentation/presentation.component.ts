import { Component, Input } from '@angular/core';
import { ILetter } from '@components';

@Component({
    selector: 'presentation',
    templateUrl: './presentation.component.html',
    styleUrls: ['./presentation.component.scss']
})

export class PresentationComponent {
    @Input() letter?: ILetter;

    constructor() {
    }

    ngOnInit() {
        this._required();
    }

    ngOnChanges() {
        this._required();
    }

    private _required() {
        if (!this.letter) {
            throw new Error('Необходимо указать букву');
        }
    }
}
