import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { appReducer, counterReducer } from './Reducer/reducer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { SpinnerComponent } from './Shared/spinner/spinner.component';
import { AuthEffects } from './auth/State/auth.effects';
import { AuthInterceptor } from './service/AuthInterceptor';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomStateSerializer } from './Reducer/custom.serializer';
import { EntityDataModule, EntityDataService } from '@ngrx/data';
import { entityConfig } from './Reducer/entity-metada';
import { PostDataService } from './service/post-data.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    EffectsModule.forRoot([AuthEffects]),
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot({
      serializer:CustomStateSerializer
    }),
    FormsModule,
    ReactiveFormsModule,
    EntityDataModule.forRoot(entityConfig)
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    entityDataService: EntityDataService,
    PostsDataService: PostDataService
  ) {
    entityDataService.registerService('Post', PostsDataService);
  }
 }
