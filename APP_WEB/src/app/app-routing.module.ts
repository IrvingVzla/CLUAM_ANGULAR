import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './components/shop/shop.component';
import { HeroSliderComponent } from './components/hero-slider/hero-slider.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { ShopCartComponent } from './components/shop-cart/shop-cart.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HeroSliderComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'contacto', component: FormularioComponent },
  { path: 'shop-cart', component: ShopCartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
