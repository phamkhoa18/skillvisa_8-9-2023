import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/client/services/api.service';
import { Editor , Toolbar } from 'ngx-editor';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { DataService } from '../../services/data.service';

declare var $: any;

export class Posts {
  _id : string = '' ;
  title: string = '';
  id_select: string = '';
  image: string = '';
  content: string = '';
  outstanding: boolean = false;
  link : string = '' ;
}
@Component({
  selector: 'app-editposts',
  templateUrl: './editposts.component.html',
  styleUrls: ['./editposts.component.scss']
})
export class EditpostsComponent {
  editor: Editor = new Editor;
  html: any = '';
  htmlContent: string = '';
  listselectdanhmuc: any = [];
  isLoading: boolean = true;
  item : any ;
  selectedFile : File | undefined ;
  post: Posts = new Posts();

  constructor(public api: ApiService, public sanitizer: DomSanitizer, private toastr: ToastrService , private data : DataService) { }

  async ngOnInit(): Promise<any> {
    await this.getSelect();
    const post_r = {
      _id : this.data.isItem._id ,
      title: this.data.isItem.title,
      content: this.data.isItem.description,
      link : this.data.isItem.link,
      id_select: this.data.isItem.category_id._id,
      image: this.data.isItem.image,
      outstanding: this.data.isItem.outstanding
    };

    this.post = post_r ;
    console.log(this.post);

  }

  public Editor = DecoupledEditor;

  public onReady( editor: DecoupledEditor ): void {
    const element = editor.ui.getEditableElement()!;
    const parent = element.parentElement!;

    parent.insertBefore(
      editor.ui.view.toolbar.element!,
      element
    );
  }

  onEditorContentChange(event: any) {
    this.post.content = event.html;
    console.log(this.post.content);
  }

  log() {
    console.log(this.post.content);

  }


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }


  async getSelect(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      (await this.api.get('/listcategory')).subscribe(
        (v: any) => {
          this.listselectdanhmuc = v;
          this.isLoading = false;
          console.log(this.listselectdanhmuc);
          resolve();
        },
        (error: any) => {
          console.error(error);
          reject();
        }
      );
    });
  };

  async submit(data: NgForm) {
    if (data.valid) {
      this.isLoading = true;
      // 2 trường xảy ra
        // 1. sửa nhưng ko đổi ảnh
        if(!this.selectedFile) {
          const post_r = {
            _id : this.post._id ,
            title: this.post.title,
            description: this.post.content,
            link : this.post.link ,
            category_id: this.post.id_select,
            image: this.post.image,
            outstanding: this.post.outstanding
          };
          (await this.api.post("/updatenew", post_r)).subscribe(
            (v: any) => {
              if(v.status == 200) {
                this.toastr.success('Thêm bài viết thành công', `Bài viết mới đã được thêm`);
              } else {
                this.toastr.error('Thêm bài viết thất bại', 'Vui lòng kiểm tra kết nối');
              }
              this.isLoading = false ;
            })
        }else {
          const formData = new FormData();
          formData.append('_id' , this.post._id);
          formData.append('title' , this.post.title);
          formData.append('description' , this.post.content);
          formData.append('link' , this.post.link);
          formData.append('category_id' , this.post.id_select);
          formData.append('image' , this.selectedFile ?? '');
          formData.append('outstanding' , this.post.outstanding.toString() );

          (await this.api.post("/updatenew_image", formData)).subscribe(
            (v: any) => {
              console.log(v);

              if(v.status == 200) {
                this.toastr.success('Thêm bài viết thành công', `Bài viết mới đã được thêm`);
              } else {
                this.toastr.error('Thêm bài viết thất bại', 'Vui lòng kiểm tra kết nối');
              }
              this.isLoading = false ;
            })
        }

        // 2. đổi ảnh

    }
  }
}
