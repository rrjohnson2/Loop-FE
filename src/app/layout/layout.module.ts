import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from './layout.routing.module';
import { LayoutNavbarComponent } from './layout-navbar/layout-navbar.component';
import { ContentComponent } from './landing/content/content.component';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RealtimeService } from '../services/realtime.service';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ActivitiesComponent } from './landing/activities/activities.component';
import { ShareIdeaService } from './landing/share-idea/share-idea.service';
import { LayoutService } from './layout.service';
import { IdeaCardComponent } from './landing/content/idea-card/idea-card.component';
import { RetortCardComponent } from './landing/content/retort-card/retort-card.component';
import { MessageCardComponent } from './landing/content/message-card/message-card.component';
import { IdeaCardService } from './landing/content/idea-card/idea-card.service';
import { RetortCardService } from './landing/content/retort-card/retort-card.service';
import { TrendingComponent } from './landing/trending/trending.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpdateProfileComponent } from './layout-navbar/update-profile/update-profile.component';
import { ShareIdeaComponent } from './landing/share-idea/share-idea.component';
import { PillComponent } from './pill/pill.component';
import { DateagoPipe } from './pipe/dateago.pipe';
import { IdeaModalComponent } from './landing/idea-modal/idea-modal.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { IdeaFilterPipe } from './pipe/idea-filter.pipe';
import { ProfileSettingsComponent } from './profile/profile-settings/profile-settings.component';
import { ProfileSettingsService } from './profile/profile-settings/profile-settings.service';
import { ImageCropperModule } from 'ngx-image-cropper';
import { UploadImageModalComponent } from './profile/profile-settings/upload-image-modal/upload-image-modal.component';
import { UploadImageModalService } from './profile/profile-settings/upload-image-modal/upload-image-modal.service';
import { IconComponent } from './icon/icon.component';
import { UpdateModalComponent } from './profile/profile-settings/update-modal/update-modal.component';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    LayoutComponent,
    LayoutNavbarComponent,
    ContentComponent,
    ActivitiesComponent,
    IdeaCardComponent,
    RetortCardComponent,
    MessageCardComponent,
    TrendingComponent,
    NotificationsComponent,
    UpdateProfileComponent,
    ShareIdeaComponent,
    PillComponent,
    DateagoPipe,
    IdeaModalComponent,
    LandingComponent,
    ProfileComponent,
    IdeaFilterPipe,
    ProfileSettingsComponent,
    UploadImageModalComponent,
    IconComponent,
    UpdateModalComponent,
  ],
  imports: [
    ImageCropperModule,
    NgbModule,
    CommonModule,
    LayoutRoutingModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    FormsModule,
    SharedModule,
    SocketIoModule.forRoot(config)
  ],
  providers:[RealtimeService,
    ShareIdeaService,
    LayoutService,
    IdeaCardService,
    RetortCardService,
    ProfileSettingsService,
    UploadImageModalService]
})
export class LayoutModule { }
