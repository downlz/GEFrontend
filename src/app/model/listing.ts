import {City} from './city';
import {ItemName} from './item-name';
import {Category} from './category';
import {Unit} from './unit';
import {Manufacturer} from './manufacturer';
import {ItemSpecs} from './itemspecs';

export interface Listing {
  _id: string;
  name: ItemName;
  image: string;
  category: Category;
  qty: number;
  price: number;
  moisture: number;
  grainCount: number;
  grade: string;
  bargaintrgqty: number;
  sampleNo: string;
  city: City;
  seller: any;
  unit: Unit;
  manufacturer: Manufacturer;
  specs: ItemSpecs;
}
