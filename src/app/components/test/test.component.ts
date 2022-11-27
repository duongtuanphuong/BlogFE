import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent  implements AfterViewInit{

  imagePost : any ={
    id :null,
    url : null
  }

  arr : Array<{id:number,url: string[]}> =[];

  // @ViewChildren('.hawk') data !: QueryList<ElementRef>;

  constructor(){
  }
  ngAfterViewInit(): void {
    // var er = this.data.first.nativeElement;
    // console.log(er.childNodes[0].getAttribute('src'));
    let data = document.querySelectorAll('.hawk img');
    data.forEach(res =>{
      this.imagePost.id = res.getAttribute('data-id');
      this.imagePost.url = res.getAttribute('src');
      this.arr.push(this.imagePost);
    })
    // this.data.forEach(res =>{
    //   this.imagePost.id = res.nativeElement.getAttribute('data-id');
    //   this.imagePost.url = res.nativeElement.childNodes[0].getAttribute('src');
    // })
    console.log(this.arr);

  }

 

  
}
