import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  ngOnInit(): void {
  }

  @Input() expenseDataSet: any = {};

  public chartType: string = 'pie';

  public chartDatasets: Array<any> = [];

  public chartLabels: Array<any> = [];

  public chartColors: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774'],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  
  ngOnChanges(changes: SimpleChanges) {
    this.chartDatasets = [];
    var eVal = Object.values(this.expenseDataSet)
    if(eVal.length > 0){
      this.chartDatasets.push({ "data": eVal, "label": 'Expense Per Category'});
      this.chartLabels = Object.keys(this.expenseDataSet);
    }
  }
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

}
