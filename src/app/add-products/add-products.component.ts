import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {  FileUploader,FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
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
  brgStatus: boolean;
  id: string;
  formControls: any;
  allFormControls: any;
  item: any;
  clicked: boolean = false;
  textBoxDisabled = true;
  maxEndDateTime: Date;

  constructor(private stateService: StateService, private cityService: CityService,private categoryService: CategoryService,
    private itemnameService: ItemnameService,private manufacturerService: ManufacturerService,private sellerService: UsersellerService,
    private unitService: UnitService,private itempost: ItemService,private addressService: AddressService,
    private addimage: AddImageService, private testitem: TestitemService,private auth: AuthService,private userService: UserService,
    private router: Router,private route: ActivatedRoute) {

      this.allFormControls = {
        // form = new FormGroup({
          // newitem: new FormGroup({
            itemname:  new FormControl(''),
            itemcategory:   new FormControl('',[Validators.required]),
            item:  new FormControl(''),
            sampleno:   new FormControl(''),
            grade:    new FormControl(''),
            moisture:    new FormControl(''),
            graincount:    new FormControl(''),
            price:   new FormControl('',[Validators.required]),
            seller:    new FormControl('',[Validators.required]),
            unit:    new FormControl('',[Validators.required]),
            qty:    new FormControl('',[Validators.required]),
            city:    new FormControl('',[Validators.required]),
            origin:    new FormControl('',[Validators.required]),
            address:    new FormControl('',[Validators.required]),
            itemstatus: new FormControl('false'),
            icumsa: new FormControl(''),
            manufacturer: new FormControl(''),
            image: new FormControl(''),
            bargainstatus: new FormControl('',[Validators.required]),
            bargaintrgqty: new FormControl(''),
            paymentdt : new FormControl(''),
            liftdt : new FormControl(''),
            istaxable: new FormControl('false', [
              Validators.required]),
              remarks : new FormControl('')
          }
    
    this.maxEndDateTime = new Date();
    this.maxEndDateTime.setTime(this.maxEndDateTime.getTime() + 1000 * 60 * 60 * 24 * 10);
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
      if (this.role == 'seller') {
        var currentid = this.userid;
        var filteredSellers =  this.sellers.filter(function(sellerlist) {
          return sellerlist._id == currentid;
        });
        this.sellers = filteredSellers
      }
    }, (error: Response) => {
      this.router.navigate(['/errorpage']);
      if (error.status === 400) {
        alert(' expected error, post already deleted');
      }
      console.log(error);
    });

    

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          this.loading = true
          var formData = {
            nameId:  this.form.value.newitem.itemname,     // this.form.get('newItem.sampleNo').value
            categoryId:   this.form.value.newitem.itemcategory,
            // item:  this.form.value.newitem.item,
            // sampleNo:   this.form.value.newitem.sampleno,
            grade:    this.form.value.newitem.grade ? this.form.value.newitem.grade : 'NA',
            grainCount:    this.form.value.newitem.graincount ? this.form.value.newitem.graincount : 'NA',
            price:   this.form.value.newitem.price,
            sellerId:    this.form.value.newitem.seller._id,
            unitId:    this.form.value.newitem.unit,
            qty:    this.form.value.newitem.qty,
            specs: {
              moisture:    this.form.value.newitem.moisture ? this.form.value.newitem.moisture : 'NA',
              graincount:    this.form.value.newitem.graincount ? this.form.value.newitem.graincount : 'NA',
              icumsa: this.form.value.newitem.icumsa ? this.form.value.newitem.icumsa : 'NA'
            },
            cityId:    this.form.value.newitem.city,
            origin:    this.form.value.newitem.origin,
            addressId:    this.form.value.newitem.address,
            isLive: this.form.value.newitem.itemstatus,
            manufacturerId:    this.form.value.newitem.manufacturer,
            image: JSON.parse(response).message,
            isTaxable: this.form.value.newitem.istaxable,
            // paymentdate: this.form.value.newitem.paymentdt,
            // liftdate: this.form.value.newitem.liftdt,
            addedby: this.userid,
            remarks: this.form.value.newitem.remarks ? this.form.value.newitem.remarks : 'NA'
          };
          // this.form.value.newitem.paymentdt ? formData.paymentdate = this.form.value.newitem.paymentdate : '';
          // this.form.value.newitem.liftdt ? formData.liftdate = this.form.value.newitem.liftdate : '';

          if (this.form.value.newitem.paymentdt) {
            // formData =''
          }
         this.itempost.create(formData)
         .subscribe(response => {
           this.loading = false
           alert('Product Listing was successful - ' + response.sampleNo +'.It will be available after product is reviewed');
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
      'grade',
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
      'istaxable',
      'bargaintrgqty',
      'bargainstatus',
      'remarks',
      'paymentdt',
      'liftdt'
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
      'istaxable',
      'remarks',
      'paymentdt',
      'liftdt'
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
      this.brgStatus = item['bargainenabled'] ? true :false;
      // this.form.controls.newitem['controls'].sampleno.setValue(item['sampleNo']);
      this.form.controls.newitem['controls'].grade.setValue(item['grade']);
      this.form.controls.newitem['controls'].moisture.setValue(item['specs'].moisture);
      this.form.controls.newitem['controls'].graincount.setValue(item['specs'].graincount);
      this.form.controls.newitem['controls'].unit.setValue(item['unit']._id);
      this.form.controls.newitem['controls'].qty.setValue(item['qty']);
      this.form.controls.newitem['controls'].icumsa.setValue(item['specs'].icumsa);
      this.form.controls.newitem['controls'].origin.setValue(item['origin']);
      // this.form.controls.newitem['controls'].manufacturer.setValue(item['manufacturer']._id);
      this.form.controls.newitem['controls'].price.setValue(item['price']);
      this.form.controls.newitem['controls'].bargainstatus.setValue(item['bargainenabled'] ? true :false);
      this.form.controls.newitem['controls'].istaxable.setValue(item['isTaxable'] ? true : false);
      this.form.controls.newitem['controls'].bargaintrgqty.setValue(item['bargaintrgqty']);
      this.form.controls.newitem['controls'].remarks.setValue(item['remarks']);
      this.form.controls.newitem['controls'].paymentdt.setValue(item['paymentdate'] ? item['paymentdate'] : '');
      this.form.controls.newitem['controls'].liftdt.setValue(item['liftdate'] ? item['liftdate'] : '');
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

  get remarks() {
    return this.form.get('newitem.remarks');
  }

  get bargainstatus() {
    return this.form.get('newitem.bargainstatus');
  }

  get paymentdt() {
    return this.form.get('newitem.paymentdt');
  }

  get liftdt() {
    return this.form.get('newitem.liftdt');
  }

  toggle(){
    if (!this.form.value.newitem.bargainstatus){
      this.textBoxDisabled = false;
    }
      this.textBoxDisabled = !this.textBoxDisabled
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
        remarks: this.form.value.newitem.remarks,
        paymentdate: this.form.value.newitem.paymentdt,
        liftdate: this.form.value.newitem.liftdt,
        bargainenabled: this.form.value.newitem.bargainstatus,
        bargaintrgqty: this.form.value.newitem.bargaintrgqty ? this.form.value.newitem.bargaintrgqty : '',
        addedby: this.userid
      };
      // console.log(upditem);
      this.itempost.update(upditem).subscribe((response) => {
        this.loading = false;
        if (this.role != 'admin'){
          alert('Item details updated successfully.Listing will be available once change is approved');
        } else {
          alert('Item details updated successfully');
        }
        this.router.navigate(['/products']);
      }, err => {
        this.loading = false;
        alert('There was a server error while updating this item');
      });
  }
 }
