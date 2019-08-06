// // import { AbstractControl, Validators, ValidationErrors } from '@angular/forms';
// export class NavigationPanel {
//   static onPageChange(page, dataObject: any) {
//     data: Array<any>;
//     this.data = [...(this.dataObject || [])];
//     this.data = this.data.splice((page - 1) * this.pageSize, this.pageSize);
//     this.currentPage = page;
//     return this.currentPage;
//   }

//   static shouldBeUnique(control: AbstractControl): Promise<ValidationErrors | null> {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         if (control.value === '1234567890') {
//           resolve({ shouldBeUnique: true });
//         } else { resolve(null); }
//       }, 2000);
//     });
//   }
// }
