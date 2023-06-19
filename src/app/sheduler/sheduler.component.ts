import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Request } from '../models/request';
import { NgForm } from '@angular/forms';
import { Charge } from '../models/charge';
import { ProductSchedules } from '../models/product.schedules';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-sheduler',
  templateUrl: './sheduler.component.html',
  styleUrls: ['./sheduler.component.css']
})
export class ShedulerComponent implements OnInit{

  request: Request = {
    amount: 0,
    repaymentFrequency: 'monthly',
    period: 1,
    startDate: new Date,
    interestType: 'FIXED_RATE'
  }

  charges: Charge[] = []
  productSchedules: ProductSchedules[] = []

  ngOnInit(): void {
    console.log("component loaded")
  }

  constructor(private dataService: DataService) {
  }

  onSubmit(form: NgForm) {
    console.log("submitting data form calculation");
    console.log(this.request);
    return this.dataService.prepareLoanSchedule(this.request).subscribe(res => {
      if (res.charges) { //extract charges
        this.charges = []
        for (const key of Object.keys(res.charges)) {
          let charge: Charge = {name: '', value: ''}
          charge.name = key
          charge.value = res.charges[charge.name]
          this.charges.push(charge)
        }
      }
      if(res.loanScheduleList) {
        this.productSchedules = []
        for (const key of Object.keys(res.loanScheduleList)) {
          let productSchedule = {name: '', schedules: []}
          productSchedule.name = key
          productSchedule.schedules = res.loanScheduleList[key]
          this.productSchedules.push(productSchedule)
        }
      }
      console.log(this.productSchedules);
      
      
    }, error => {
      console.log(error);

    })
  }

  async exportAsPDF()
    {
      let data = document.getElementById('exportable')!;

      await html2canvas(data).then(canvas => {
        const contentDataURL = canvas.toDataURL('image/png');
      
        let pdf = new jspdf('l', 'cm', 'a4');
        pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);
      
        pdf.save('export.pdf');
      });
    }
}
