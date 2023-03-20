import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators,ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productAddForm: FormGroup
  constructor(private formBuilder:FormBuilder,
    private productService:ProductService,
    private toastrService:ToastrService){}

  ngOnInit(): void {
    this.createProductAddForm();
  }
 
  createProductAddForm(){
    this.productAddForm= this.formBuilder.group({
      productName:["",Validators.required],
      unitPrice:["",Validators.required],
      unitsInStock:["",Validators.required],
      categoryId:["",Validators.required] 
    })
  }
  add(){
    if(this.productAddForm.valid){
      let productModule = Object.assign({},this.productAddForm.value) 
      this.productService.add(productModule).subscribe(
      {
        next:(response)=>{ 
          this.toastrService.success(response.message,"Başarılı")
        },
        error:(responseError:any)=>{
          if(responseError.error.ValidationErrors.lenght>0){
                
                for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
                  
                  this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Doğrulama Hatası")
                }
                
              }
        }
      }

      )
      
    }else{
      this.toastrService.error("Hatalı Veya Eksik Veri")
    }
    
    
  }

}
