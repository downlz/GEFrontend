import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {  FileUploader,FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { FormValidators} from '../login/login-form.validators';
import {CityService} from '../services/city.service';
import {ManufacturerService} from '../services/manufacturer.service';
import {StateService} from '../services/state.service';
import {UnitService} from '../services/unit.service';
import {CategoryService} from '../services/category.service';
import {AddressService} from '../services/address.service';
import {ItemnameService} from '../services/itemname.service';
import {AddImageService} from '../services/addimage.service';
import {TestitemService} from '../services/testitem.service';
import {ItemService} from '../services/item.service';
import { forkJoin } from 'rxjs';
import {UserService} from '../services/user.service';
import {UsersellerService} from '../services/seller.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppError } from '../common/app-error';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({url: 'http://localhost:3000/api/addimage', itemAlias: 'image'});

  form = new FormGroup({
    newitem: new FormGroup({
      // 'name' : new FormControl('', [Validators.required,
      //   Validators.minLength(3),
      //   Validators.maxLength(50)]),
      // 'email' : new FormControl('', [Validators.email]),
      // 'phone' : new FormControl('', [Validators.required, Validators.minLength(10),
      //   Validators.maxLength(10), Validators.pattern('^[0-9]*$'),
      //   FormValidators.cannotContainSpace],
      //   FormValidators.shouldBeUnique),
      // 'password' : new FormControl('', [Validators.required, Validators.minLength(8)]),
      // 'pan' : new FormControl(),
      // 'sampleno' : new FormControl('', [Validators.required]),
      // 'grade' : new FormControl('', [Validators.required])
      // 'qty' : new FormControl('', [Validators.required]),
      // 'unit' : new FormControl('', [Validators.required]),
      // 'seller' : new FormControl('', [Validators.required]),
      // 'origin' : new FormControl('', [Validators.required]),
      // 'city' : new FormControl('', [Validators.required]),
      // 'address' : new FormControl('', [Validators.required]),
      // 'imagefile' : new FormControl('', [Validators.required])

      itemname:  new FormControl,
      itemcategory:   new FormControl,
      item:  new FormControl,
      sampleno:   new FormControl,
      grade:    new FormControl,
      moisture:    new FormControl,
      graincount:    new FormControl,
      price:   new FormControl,
      seller:    new FormControl,
      unit:    new FormControl,
      qty:    new FormControl,
      city:    new FormControl,
      origin:    new FormControl,
      address:    new FormControl,
      itemstatus: new FormControl,
      icumsa: new FormControl,
      manufacturer: new FormControl,
      image: new FormControl
    })
  });
  cities: any;
  manufacturers: any;
  sellers: any;
  itemnames: any;
  addresses: any;
  units: any;
  categories: any;
  loginData: any;
  constructor(private stateService: StateService, private cityService: CityService,private categoryService: CategoryService,
    private itemnameService: ItemnameService,private manufacturerService: ManufacturerService,private sellerService: UsersellerService,
    private unitService: UnitService,private user: UserService,private itempost: ItemService,private addressService: AddressService,
    private addimage: AddImageService, private testitem: TestitemService,
    private router: Router) { }

  ngOnInit() {
    forkJoin([this.cityService.getAll(), this.stateService.getAll(),this.categoryService.getAll(),this.itemnameService.getAll(),this.manufacturerService.getAll(),
      this.sellerService.getAll(),this.unitService.getAll(),this.addressService.getAll()])
    .subscribe(response => {
      this.categories = response[2];
      this.cities = response[0];
      this.itemnames = response[3];
      this.manufacturers = response[4];
      this.sellers = response[5];
      this.units = response[6];
      this.addresses = response[7];
    }, (error: Response) => {
      this.router.navigate(['/errorpage']);
      if (error.status === 400) {
        alert(' expected error, post already deleted');
      }
      console.log(error);
    });

    // this.uploader.onBeforeUploadItem = (fileItem: any) => {              Check feasibility if request can be sent in one form
    //       fileItem.formData.push( { someField: 'aplha' } );
    //       fileItem.formData.push( { someField2: 'beta' } );
    //       fileItem.formData.push( { someField2: 'theta' } );
    // };
    // console.log(this.fileItem)

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
        //  console.log('ImageUpload:uploaded:', item, status, response);
         const formData = {
           nameId:  this.form.value.newitem.itemname,
           categoryId:   this.form.value.newitem.itemcategory,
           // item:  this.form.value.newitem.item,
           sampleNo:   this.form.value.newitem.sampleno,
           grade:    this.form.value.newitem.grade,
           grainCount:    this.form.value.newitem.graincount,
           price:   this.form.value.newitem.price,
           sellerId:    this.form.value.newitem.seller,
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
           image: JSON.parse(response).message
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
         // alert('File uploaded successfully');
     };
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

  addproduct() {                                    // Currently no in use and needs to be corrected in future
    console.log("Do Nothing");
    // const formData = {
    //   itemname:  this.form.value.newitem.itemname,
    //   itemcategory:   this.form.value.newitem.itemcategory,
    //   item:  this.form.value.newitem.item,
    //   sampleNo:   this.form.value.newitem.sampleno,
    //   grade:    this.form.value.newitem.grade,
    //   price:   this.form.value.newitem.price,
    //   seller:    this.form.value.newitem.seller,
    //   unit:    this.form.value.newitem.unit,
    //   qty:    this.form.value.newitem.qty,
    //   specs: {
    //     moisture:    this.form.value.newitem.moisture,
    //     graincount:    this.form.value.newitem.graincount,
    //     icumsa: this.form.value.newitem.icumsa
    //   },
    //   city:    this.form.value.newitem.city,
    //   origin:    this.form.value.newitem.origin,
    //   address:    this.form.value.newitem.address,
    //   itemstatus: this.form.value.newitem.itemstatus,
    //   manufacturer:    this.form.value.newitem.manufacturer
    //   // image: this.selectedFile
    // };
    //
    // // formData.append('file', $scope.file);
    //
    // console.log(formData);
    //
    // this.itempost.create(formData)
    // .subscribe(response => {
    //   this.router.navigate(['/products']);
    // }, (error: AppError) => {
    //   console.log(error);
    //   if (error.originalError.status === 400) {
    //     alert('Invalid id or password');
    //   } else {
    //     this.router.navigate(['/errorpage']);
    //   }
    // });


  }
 }
