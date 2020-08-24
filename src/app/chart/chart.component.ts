import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  @Input() chartData: any[];
  @Input() chartLabels: any[];
  @Input() chartType: string;

  chartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  chartLegend = true;

  constructor() { }

  ngOnInit() {
  }

}
