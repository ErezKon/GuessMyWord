import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WordContainerComponent } from './words/word-container/word-container.component';
import { WordsContainerComponent } from './words/words-container/words-container.component';

const routes: Routes = [
  {
    path: '',
    component: WordsContainerComponent
  },
  {
    path: 'words',
    component: WordsContainerComponent
  },
  {
    path: 'he-IL/words',
    component: WordsContainerComponent
  },
  {
    path: 'en-US/words',
    component: WordsContainerComponent
  },
  {
    path: 'word/:language/:id',
    component: WordContainerComponent
  },
  {
    path: 'he-IL/word/:language/:id',
    component: WordContainerComponent
  },
  {
    path: 'en-US/word/:language/:id',
    component: WordContainerComponent
  },
  {
    path: '**',
    component: WordsContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
