import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntroListRoutingModule } from './intro-list-routing.module';
import { IntroListComponent } from './intro-list.component';
import {HeaderModule} from '@scripter/components/common/header/header.module';
import {LoadingSpotModule} from '@scripter/components/common/loading-spot/loading-spot.module';
import {FooterModule} from '@scripter/components/common/footer/footer.module';
import {IntroListItemModule} from '@scripter/components/intro/intro-list-item/intro-list-item.module';


@NgModule({
  declarations: [IntroListComponent],
  imports: [
    CommonModule,
    IntroListRoutingModule,
    HeaderModule,
    LoadingSpotModule,
    FooterModule,
    IntroListItemModule
  ]
})
export class IntroListModule { }
