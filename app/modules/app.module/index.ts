import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoot } from './app-root';
import { MainView, ChallengeView } from '@views';
import { AlphabetComponent, PresentationComponent, ChallengeComponent, ButtonComponent } from '@components';

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot([
            { path: '', component: MainView },
            { path: 'challenge/:letter', component: ChallengeView },
            { path: 'challenge', component: ChallengeView },
        ])
    ],
    declarations: [
        AppRoot,
        MainView,
        ChallengeView,
        AlphabetComponent,
        PresentationComponent,
        ChallengeComponent,
        ButtonComponent
    ],
    bootstrap: [
        AppRoot
    ]
})
export class AppModule { }