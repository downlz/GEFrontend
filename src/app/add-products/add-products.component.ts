import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';
import {  FileUploader,FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
// import { FormValidators} from '../login/login-form.validators';
import {CityService} from '../services/city.service';
import {ManufacturerService} from '../services/manufacturer.service';
import {StateService} from '../services/state.service';
import {UnitService} from '../services/unit.service';
import {CategoryService} from '../services/category.service';
import {AddressService} from '../services/address.service';
import {ItemnameService} from '../services/itemname.service';
import {AddImageService} from '../services/addimage.service';
import {TestitemService} from '../services/testitem.service';
import {AuthService} from '../services/auth.service';
import {ItemService} from '../services/item.service';
import { forkJoin } from 'rxjs';
import {UsersellerService} from '../services/seller.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppError } from '../common/app-error';
// import { environment } from 'src/environments/environment.prod';
import { environment } from '../../environments/environment'

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({url: environment.baseUrl + '/addimage', itemAlias: 'image'});
  
  cities: any;
  manufacturers: any;
  sellers: any;
  itemnames: any;
  addresses: any;
  units: any;
  categories: any;
  loginData: any;
  role: string;
  userres: any;
  userid: any;
  loading: boolean;
  form: FormGroup;
  mfgname: string;
  edit: boolean;
  id: string;
  formControls: any;
  allFormControls: any;
  item: any;
  clicked: boolean = false;

  constructor(private stateService: StateService, private cityService: CityService,private categoryService: CategoryService,
    private itemnameService: ItemnameService,private manufacturerService: ManufacturerService,private sellerService: UsersellerService,
    private unitService: UnitService,private itempost: ItemService,private addressService: AddressService,
    private addimage: AddImageService, private testitem: TestitemService,private auth: AuthService,private userService: UserService,
    private router: Router,private route: ActivatedRoute) {

      // this.allFormControls = {

      //   sampleNo: new FormControl('', [
      //     Validators.required,
      //   ]),
      //   availableQty: new FormControl(0, [
      //     Validators.required,
      //     Validators.min(1)
      //   ]),
      this.allFormControls = {
        // form = new FormGroup({
          // newitem: new FormGroup({
            itemname:  new FormControl(''),
            itemcategory:   new FormControl(),
            item:  new FormControl(''),
            sampleno:   new FormControl(''),
            grade:    new FormControl(''),
            moisture:    new FormControl(''),
            graincount:    new FormControl(''),
            price:   new FormControl(''),
            seller:    new FormControl(''),
            unit:    new FormControl('',[Validators.required]),
            qty:    new FormControl(''),
            city:    new FormControl(''),
            origin:    new FormControl(''),
            address:    new FormControl(''),
            itemstatus: new FormControl('false'),
            icumsa: new FormControl(''),
            manufacturer: new FormControl(''),
            image: new FormControl(''),
            istaxable: new FormControl('', [
              Validators.required])
          }

    const role = this.auth.getRole();
    this.role = role;

    this.route.paramMap
      .subscribe(async params => {
          const id = params.get('id');
          if (id) {
            this.id = id;
            this.edit = true;
            await this.getProduct(id);
          } else {
            this.edit = false;
          }
          this.initializeForm();
        });

  }

  ngOnInit() {

    forkJoin([this.cityService.getAll(), this.stateService.getAll(),this.categoryService.getAll(),this.itemnameService.getAll(),this.manufacturerService.getAll(),
      this.sellerService.getAll(),this.unitService.getAll(),this.userService.get('me')])
    .subscribe(response => {
      this.categories = response[2];
      this.cities = response[0];
      this.itemnames = response[3];
      this.manufacturers = response[4];
      this.sellers = response[5];
      this.units = response[6];
      this.userres = response[7];
      this.userid = this.userres._id;
      // this.addresses = response[7];
    // New Code  
    // forkJoin([this.cityService.getAll(), this.stateService.getAll(),this.categoryService.getAll(),
    //   this.itemnameService.getAll(),this.manufacturerService.getAll(),
    //   this.sellerService.getAll(),this.unitService.getAll(),this.userService.get('me')])
    // .subscribe(response => {
    //   this.cities = response[0];
    //   this.categories = response[2];
    //   this.itemnames = response[3];
    //   this.manufacturers = response[4];
    //   this.sellers = response[5];
    //   this.units = response[6];
      // this.userres = response[7];
      // this.userid = this.userres._id;

      // if (this.role == 'agent') {
      //   var filteredSellers =  this.sellers.filter(function(sellerlist) {
      //     return sellerlist.defaultseller === true;
      //   });
      //   this.sellers = filteredSellers
      // }
    }, (error: Response) => {
      this.router.navigate(['/errorpage']);
      if (error.status === 400) {
        alert(' expected error, post already deleted');
      }
      console.log(error);
    });

    

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
        //  console.log('ImageUpload:uploaded:', item, status, response);
          const formData = {
            nameId:  this.form.value.newitem.itemname,     // this.form.get('newItem.sampleNo').value
            categoryId:   this.form.value.newitem.itemcategory,
            // item:  this.form.value.newitem.item,
            sampleNo:   this.form.value.newitem.sampleno,
            grade:    this.form.value.newitem.grade,
            grainCount:    this.form.value.newitem.graincount,
            price:   this.form.value.newitem.price,
            sellerId:    this.form.value.newitem.seller._id,
            unitId:    this.form.value.newitem.unit,
            qty:    this.form.value.newitem.qty,
            specs: {
              moisture:    this.form.value.newitem.moisture,
              graincount:    this.form.value.newitem.graincount,
              icumsa: this.form.value.newitem.icumsa
            },
            cityId:    this.form.value.newitem.city,
            origin:    this.form.value.newitem.origin,
            addressId:    this.form.value.newitem.address,
            isLive: this.form.value.newitem.itemstatus,
            manufacturerId:    this.form.value.newitem.manufacturer,
            image: JSON.parse(response).message,
            isTaxable: this.form.value.newitem.istaxable,
            addedby: this.userid
          };
         this.itempost.create(formData)
         .subscribe(response => {
           alert('Product added successfully');
           this.router.navigate(['/products']);
         }, (error: AppError) => {
           console.log(error);
           if (error.originalError.status === 400) {
             alert('Invalid credentials');
           } else {
             this.router.navigate(['/errorpage']);
           }
         });
    }
 }

 initializeForm() {
  let controls: any;
  if (this.edit == true) {
    controls = [
      // 'itemcategory',
      // 'item',
      // 'sampleno',
      // 'grade',
      'moisture',
      'graincount',
      'price',
      // 'seller',
      'unit',
      'qty',
      // 'city',
      'origin',
      // 'address',
      'itemstatus',
      'icumsa',
      // 'manufacturer',
      // 'image',
      'istaxable'
    ];
  } else {
    controls = [
      'itemname',
      'itemcategory',
      'item',
      'sampleno',
      'grade',
      'moisture',
      'graincount',
      'price',
      'seller',
      'unit',
      'qty',
      'city',
      'origin',
      'address',
      'itemstatus',
      'icumsa',
      'manufacturer',
      'image',
      'istaxable'
    ];
  }
  const formControls = {};
    controls.map(control => {
      if (control) {
        formControls[control] = this.allFormControls[control];
      }
    });
    this.formControls = formControls;
    this.form = new FormGroup({
      newitem: new FormGroup(formControls)
    });
  }

  getProduct(id){
    this.loading = true;
    this.itempost.get(id).subscribe((item) => {
      this.item = item;
      // this.form.controls.newitem['controls'].sampleno.setValue(item['sampleNo']);
      // this.form.controls.newitem['controls'].grade.setValue(item['grade']);
      this.form.controls.newitem['controls'].moisture.setValue(item['specs'].moisture);
      this.form.controls.newitem['controls'].graincount.setValue(item['specs'].graincount);
      this.form.controls.newitem['controls'].unit.setValue(item['unit']._id);
      this.form.controls.newitem['controls'].qty.setValue(item['qty']);
      this.form.controls.newitem['controls'].icumsa.setValue(item['specs'].icumsa);
      this.form.controls.newitem['controls'].origin.setValue(item['origin']);
      // this.form.controls.newitem['controls'].manufacturer.setValue(item['manufacturer']._id);
      this.form.controls.newitem['controls'].price.setValue(item['price']);
      // this.form.controls.newitem['controls'].itemstatus.setValue(item['itemstatus'] ? true : false);
      this.form.controls.newitem['controls'].istaxable.setValue(item['isTaxable'] ? true : false);
      this.mfgname = item['manufacturer'].name;
      this.loading = false;
    }, error => {
      this.loading = false;
      console.log(error);
    });
  }

  get sampleno () {
    return this.form.get('newitem.sampleno');
  }

  get grade () {
    return this.form.get('newitem.grade');
  }

  get qty () {
    return this.form.get('newitem.qty');
  }

  get unit () {
    return this.form.get('newitem.unit');
  }

  get seller () {
    return this.form.get('newitem.seller');
  }

  get origin () {
    return this.form.get('newitem.origin');
  }

  get city () {
    return this.form.get('newitem.city');
  }

  get address () {
    return this.form.get('newitem.address');
  }

  get icumsa () {
    return this.form.get('newitem.icumsa');
  }

  get manufacturer () {
    return this.form.get('newitem.manufacturer');
  }

  get istaxable() {
    return this.form.get('newitem.istaxable');
  }

  onItemChange(datain2) {
    let item = this.form.get('newitem.itemname').value;
    this.categories = [];
    this.categoryService.getCategoriesByItem(item).subscribe((response) => {
      this.categories = response;
    }, (error: Response) => {
      console.log(error);
    });

  }

  onSellerChange(selectedseller){
    this.addresses = [];
    this.addressService.getUserAddr(selectedseller._id, selectedseller.phone).subscribe((response) => {
      this.addresses = response as any;
    }, (error: Response) => {
      console.log(error);
    });
  }

  updateproduct() {                                    
    this.clicked = true;
      // const upditem = this.form.getRawValue().newitem;
      // upditem._id = this.id;
      // const itemspecs = {
      //   moisture: this.form.value.newitem.moisture,
      //   graincount: this.form.value.newitem.graincount,
      //   icumsa: this.form.value.newitem.icumsa
      // };
      // upditem.grainCount = this.form.value.newitem.graincount;
      // upditem.specs = itemspecs;
      const upditem = {
        _id: this.id,
        grainCount:    this.form.value.newitem.graincount,
        price:   this.form.value.newitem.price,
        unitId:    this.form.value.newitem.unit,
        qty:    this.form.value.newitem.qty,
        specs: {
          moisture:    this.form.value.newitem.moisture,
          graincount:    this.form.value.newitem.graincount,
          icumsa: this.form.value.newitem.icumsa
        },
        origin:    this.form.value.newitem.origin,
        isLive: this.form.value.newitem.itemstatus,
        isTaxable: this.form.value.newitem.istaxable,
        addedby: this.userid
      };
      // upditem._id = this.id;
      this.itempost.update(upditem).subscribe((response) => {
        this.loading = false;
        alert('Product updated successfully.Listing will be available once change is approved');
        this.router.navigate(['/products']);
      }, err => {
        this.loading = false;
        alert('There was a server error while updating this item');
      });
  }
 }
