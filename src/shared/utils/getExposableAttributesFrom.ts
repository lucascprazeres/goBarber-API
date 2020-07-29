import { classToClass } from 'class-transformer';

//  this function can only be used on classes
//  whoose attributes contains class-transformer decorators
function getExposableAttributesFrom(obj: Object): Object {
  return classToClass(obj);
}

export default getExposableAttributesFrom;
