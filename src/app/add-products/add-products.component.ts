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
import {AuthService} from '../services/auth.service';
import {ItemService} from '../services/item.service';
import { forkJoin } from 'rxjs';
import {UserService} from '../services/user.service';
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

  form = new FormGroup({
    newitem: new FormGroup({
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
      itemstatus: new FormControl( 'false', [
        Validators.required]),
      icumsa: new FormControl,
      manufacturer: new FormControl,
      image: new FormControl,
      istaxable: new FormControl('true', [
        Validators.required])
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
  role: string;
  constructor(private stateService: StateService, private cityService: CityService,private categoryService: CategoryService,
    private itemnameService: ItemnameService,private manufacturerService: ManufacturerService,private sellerService: UsersellerService,
    private unitService: UnitService,private user: UserService,private itempost: ItemService,private addressService: AddressService,
    private addimage: AddImageService, private testitem: TestitemService,private auth: AuthService,
    private router: Router) { }

  ngOnInit() {

    const role = this.auth.getRole();
    this.role = role;

    forkJoin([this.cityService.getAll(), this.stateService.getAll(),this.categoryService.getAll(),this.itemnameService.getAll(),this.manufacturerService.getAll(),
      this.sellerService.getAll(),
      this.unitService.getAll()])
      // ,this.addressService.getAll()
    .subscribe(response => {
      this.cities = response[0];
      this.categories = response[2];
      this.itemnames = response[3];
      this.manufacturers = response[4];
      this.sellers = response[5];
      this.units = response[5];

      if (this.role == 'agent') {
        var filteredSellers =  this.sellers.filter(function(sellerlist) {
          return sellerlist.defaultseller === true;
        });
        this.sellers = filteredSellers
      }
      // this.addresses = response[7];
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
           isTaxable: this.form.value.newitem.istaxable
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
