import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css'],
})
export class LinechartComponent implements OnChanges {

  @Input() expenseDataSet: any = {};
  @Input() incomeDataSet: any = {};

  public chartType: string = 'bar';

  public chartDatasets: Array<any> = [];
  // = [
  //   { data: [7000, 6500, 8000, 7000, 7600, 7000, 8000], label: 'Total Income Per Month' },
  //   { data: [6500, 6500, 7700, 7000, 7000, 6000, 7000], label: 'Total Expense Per Month' },
  //   { data: [500, 0, 300, 0, 600, 1000, 1000], label: 'Total Saving Per Month' }
  // ];

  public chartLabels: Array<any> = [];
  // = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(239, 150, 112, .2)',
      borderColor: 'rgba(239, 73, 2, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(66, 244, 161, .2)',
      borderColor: 'rgba(2, 249, 134, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(127, 245, 249, .2)',
      borderColor: 'rgba(2, 231, 239,.7)',
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.chartDatasets = [];
    var eVal = Object.values(this.expenseDataSet)
    var iVal = Object.values(this.incomeDataSet)
    var keySet = eVal.length > iVal.length ? this.expenseDataSet : this.incomeDataSet
    if(eVal.length > 0){
      this.chartDatasets.push({ data: eVal, "label": 'Total Expense Per Month'});
      this.chartDatasets.push({ data: iVal, "label": 'Total Income Per Month'})
      this.chartLabels = Object.keys(keySet);
    }
  }
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
}