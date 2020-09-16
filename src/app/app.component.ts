import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'task';
  quote = '';
  author = '';
  count = 0;

  constructor(private http:HttpClient){

  }
  onGenerate(){
    this.http.get("https://programming-quotes-api.herokuapp.com/quotes/random")
    .subscribe((res:any)=>{
      this.quote = res.en;
      this.author ="- " +res.author;
      sessionStorage.setItem("id",res._id)
      console.log(this.quote, this.author);
      this.count++;
    })
  }

  onToggleLanguage(){
    console.log(sessionStorage.getItem("id"));
    this.http.get("https://programming-quotes-api.herokuapp.com/quotes/id/"+sessionStorage.getItem("id"))
    .subscribe((res:any)=>{
      console.log(JSON.stringify(res));

      if(this.quote == res.sr){

        this.quote = res.en;
      }
      else {
        this.quote = res.sr;
      }


    })
  }



  onDownload() {
    const data = document.getElementById('quoteDownload');
    html2canvas(data).then(canvas => {
      const imgWidth = 200;
      const pageHeight = 100;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png', 100);
      const pdf = new jspdf('p', 'mm', 'a4');
      const position = 15;
      pdf.addImage(contentDataURL, 'PNG', 5, position, imgWidth, imgHeight);
      pdf.save('download.pdf');
    });
  }

}
