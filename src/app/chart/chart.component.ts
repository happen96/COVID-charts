import {Component, Input, OnInit} from '@angular/core';
import {Color} from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  @Input() chartData: any[];
  @Input() chartLabels: any[];
  @Input() chartType: string;
  @Input() colors: string;
  @Input() borderColor: string;

  chartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  chartLegend = true;

  lineChartColors: Color[];

  constructor() { }

  ngOnInit() {
    this.setLineColor();
  }

  setLineColor() {
    if (this.colors && this.colors.length > 0) {
      this.lineChartColors = [
        {
          borderColor: 'black',
          backgroundColor: this.colors ? this.colors : 'rgba(139,0,0,0.28)',
        },
      ];
    }
  }
}
