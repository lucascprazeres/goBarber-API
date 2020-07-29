import { getMongoRepository, MongoRepository } from 'typeorm';

import INotificationsRespository from '@modules/notifications/repositories/iNotificationsRespository';
import ICreateNotificationDTO from '@modules/notifications/dtos/iCreateNotificationDTO';

import Notification from '../schemas/Notification';

class NotificationsRepository implements INotificationsRespository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({
      content,
      recipient_id,
    });

    await this.ormRepository.save(notification);

    return notification;
  }
}

export default NotificationsRepository;
