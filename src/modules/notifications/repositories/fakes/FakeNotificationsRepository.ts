import { ObjectID } from 'mongodb';

import INotificationsRespository from '@modules/notifications/repositories/iNotificationsRespository';
import ICreateNotificationDTO from '@modules/notifications/dtos/iCreateNotificationDTO';

import Notification from '../../infra/typeorm/schemas/Notification';

class NotificationsRepository implements INotificationsRespository {
  private notifications: Notification[] = [];

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, {
      id: new ObjectID(),
      content,
      recipient_id,
    });

    this.notifications.push(notification);

    return notification;
  }
}

export default NotificationsRepository;
