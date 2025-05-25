import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroSliderComponent } from './components/hero-slider/hero-slider.component';
import { ShopComponent } from './components/shop/shop.component';
import { CommonModule } from '@angular/common';
import { FormularioComponent } from './components/formulario/formulario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShopCartComponent } from './components/shop-cart/shop-cart.component';
import { FormsModule } from '@angular/forms';
// Importa el componente directamente en lugar del módulo
import { FilterSidebarComponent } from './filters/filter-sidebar/filter-sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroSliderComponent,
    ShopComponent,
    FormularioComponent,
    ShopCartComponent,
    FilterSidebarComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
   
  ],
  providers: [provideClientHydration(withEventReplay())],
  bootstrap: [AppComponent],
})
export class AppModule {}
