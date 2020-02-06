import {City} from './city';
import {ItemName} from './item-name';
import {Category} from './category';
import {Unit} from './unit';
import {User} from './user';
import {Manufacturer} from './manufacturer';
import {ItemSpecs} from './itemspecs';

export interface Listing {
  _id: string;
  name: ItemName;
  image: string;
  category: Category;
  qty: number;
  price: number;
  moisture: string;
  grainCount: string;
  grade: string;
  bargaintrgqty: number;
  bargainenabled: boolean;
  sampleNo: string;
  city: City;
  seller: any;
  unit: Unit;
  manufacturer: Manufacturer;
  specs: ItemSpecs;
  showaddedbyname: boolean;
  showseller: boolean;
  brokerage: boolean;
  addedby: User;
}
