// import {City} from './city';
// import {ItemName} from './item-name';
// import {Category} from './category';
import {Unit} from './unit';
import {Listing} from './listing';

export interface GBListing {
  _id: string;
  item: Listing;
  dealprice: number;
  moq: number;
  maxqty: number;
  totalqty: number;
  taxrate: number;
  remarks: string;
  gbstarttime: string;
  gbendtime: string;
  unit: Unit;
}
