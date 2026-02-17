import { Notifications, Subscriber } from '@/types';
import { FirebaseOptions } from 'firebase/app';

export type TFirebaseCloudMessagingWebConfig = {
  vapidKey: string;
  serviceWorker: string;
  credentials: FirebaseOptions;
};

export type TChannelsConfig =  {fcm: TFirebaseCloudMessagingWebConfig};
export type TNotificationSubscriber = Omit<Subscriber, 'createdAt' | 'updatedAt' | 'deviceToken'>;

export type TNotificationsConfig = {
  channels?: TChannelsConfig;
  subscriber: TNotificationSubscriber;
};

export type Notification = Notifications['data'][number];