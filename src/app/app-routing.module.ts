import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'check-in',
    loadChildren: () =>
      import('./pages/check-in/check-in.module').then(
        (m) => m.CheckInPageModule
      ),
  },
  {
    path: 'thanks',
    loadChildren: () => import('./pages/thanks/thanks.module').then( m => m.ThanksPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
