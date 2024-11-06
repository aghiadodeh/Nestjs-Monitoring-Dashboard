import { Component, OnInit } from '@angular/core';
import { AnalyzeService } from '../../services/analyze.service';
import { DestroyedComponent } from '@x-angular/cms';
import { TranslateModule } from '@ngx-translate/core';
import { ChartModule } from 'primeng/chart';
import { DividerModule } from 'primeng/divider';
import { PrimeNGConfig } from 'primeng/api';
import { takeUntil } from 'rxjs';
import { AnalyzeRequestResponse } from '../../models/analyze-request.response';
import { DatePipe } from '@angular/common';
import moment from 'moment';

@Component({
  selector: 'app-analyze-charts',
  standalone: true,
  imports: [
    ChartModule,
    DividerModule,
    TranslateModule,
  ],
  templateUrl: './analyze-charts.component.html',
  styleUrl: './analyze-charts.component.scss',
  providers: [DatePipe]
})
export class AnalyzeChartsComponent extends DestroyedComponent implements OnInit {
  public requestSuccessData: any;
  public requestDurationData: any;
  public requestCreatedAtData: any;
  public requestURLsCountData: any;
  public requestURLsDurationData: any;

  public barOptions: any;
  public pieOptions: any;
  public lineOptions: any;

  constructor(
    public analyzeService: AnalyzeService,
    private primeNgConfig: PrimeNGConfig,
    private datePipe: DatePipe,
  ) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.initializeOptions();
    this.subscribeData();
  }

  private subscribeData(): void {
    this.analyzeService.requestAnalyze.data$
      .pipe(takeUntil(this.destroyed))
      .subscribe((data: AnalyzeRequestResponse | undefined) => {
        if (data) {
          this.initializeSuccessRequest(data);
          this.initializeRequestDuration(data);
          this.initializeRequestCreatedAt(data);
        }
      });
  }

  private initializeSuccessRequest(data: AnalyzeRequestResponse): void {
    if (data.total == undefined || data.success == undefined  || data.exceptions == undefined ) return;
    const documentStyle = getComputedStyle(document.documentElement);
    const errors = data.total - data.success - data.exceptions;
    this.requestSuccessData = {
      labels: [
        `${this.translate('success')} (${data.success})`,
        `${this.translate('errors')} (${errors})`,
        `${this.translate('exceptions')} (${data.exceptions})`
      ],
      datasets: [
        {
          data: [data.success, errors, data.exceptions],
          backgroundColor: [documentStyle.getPropertyValue('--green-500'), documentStyle.getPropertyValue('--orange-500'), documentStyle.getPropertyValue('--red-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--green-400'), documentStyle.getPropertyValue('--orange-400'), documentStyle.getPropertyValue('--red-400')]
        }
      ],
    };
  }

  private initializeRequestDuration(data: AnalyzeRequestResponse): void {
    const { duration, durationURLs, durationBoundaries } = data;
    if (!duration || !durationURLs) return;
    const documentStyle = getComputedStyle(document.documentElement);
    const labels: string[] = [];
    const counts: number[] = [];

    duration.forEach(e => {
      if (durationBoundaries) {
        const index = durationBoundaries.findIndex(duration => duration == e.id);
        if (index != -1 && index != durationBoundaries.length - 1) {
          e.id = durationBoundaries[index + 1];
        }
      }
      labels.push(`${e.id} ms`);
      counts.push(e.count ?? 0);
    });

    const urls: string[] = [];
    const min: number[] = [];
    const max: number[] = [];
    const average: number[] = [];
    const requestsCount: number[] = [];

    durationURLs.forEach(e => {
      e.url = `${e.url}`.replace("api/", "")
      urls.push(e.method ? `${e.method} - ${e.url}` : `${e.url}`);
      min.push(e.min ?? 0);
      max.push(e.max ?? 0);
      average.push(e.average ?? 0);
      requestsCount.push(e.count ?? 0);
    })

    this.requestDurationData = {
      labels,
      datasets: [
        {
          label: this.primeNgConfig.getTranslation('requests'),
          fill: true,
          data: counts,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          tension: 0.4,
          backgroundColor: 'rgba(38, 168, 255, 0.2)'
        },
      ],
    }

    this.requestURLsCountData = {
      labels: urls,
      datasets: [
        {
          label: this.primeNgConfig.getTranslation('requests'),
          fill: true,
          data: requestsCount,
          borderColor: documentStyle.getPropertyValue('--green-500'),
          tension: 0.4,
          backgroundColor: 'rgba(107, 255, 38, 0.4)'
        },
      ],
    };

    this.requestURLsDurationData = {
      labels: urls,
      datasets: [
        {
          label: 'Min',
          fill: true,
          data: min,
          backgroundColor: documentStyle.getPropertyValue('--green-500'),
        },
        {
          label: 'Max',
          fill: true,
          data: max,
          backgroundColor: documentStyle.getPropertyValue('--orange-500'),
        },
      ],
    }
  }

  private initializeRequestCreatedAt(data: AnalyzeRequestResponse): void {
    const { createdAt } = data;
    if (!createdAt) return;
    const documentStyle = getComputedStyle(document.documentElement);
    const labels: string[] = [];
    const counts: number[] = [];
    createdAt.forEach(e => {
      labels.push(this.transformDate(`${e.id}`));
      counts.push(e.count ?? 0);
    });

    this.requestCreatedAtData = {
      labels,
      datasets: [
        {
          label: this.primeNgConfig.getTranslation('requests'),
          fill: true,
          data: counts,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          tension: 0.4,
          backgroundColor: 'rgba(38, 168, 255, 0.2)'
        },
      ],
    }
  }

  private initializeOptions(): void {
    this.pieOptions = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: 'grey',
          }
        }
      }
    };

    this.lineOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: { color: 'grey' }
        }
      },
      scales: {
        x: {
          ticks: { color: 'grey' },
          grid: { color: 'lightgrey' }
        },
        y: {
          ticks: { color: 'grey' },
          grid: { color: 'lightgrey' }
        }
      }
    };

    this.barOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: { color: 'grey' }
        },
        tooltip: {
          callbacks: {
            label: function (context: any) {
              try {
                const dataset = context.dataset;
                const label = dataset.label;
                return `${label} - ${context.formattedValue}ms`;
              } catch (_) {
                return "-";
              }
            }
          }
        },
      },
      scales: {
        x: {
          ticks: {
            color: 'grey',
            font: { weight: 500 }
          },
          grid: {
            color: 'lightgrey',
            drawBorder: false
          }
        },
        y: {
          ticks: { color: 'grey' },
          grid: {
            color: 'lightgrey',
            drawBorder: false
          }
        }
      }
    };
  }

  private translate(key: string) {
    return this.primeNgConfig.getTranslation(key);
  }

  private transformDate(date: string): string {
    const timezone = moment.tz.guess();
    const { fromDate, toDate } = this.analyzeService.filterSchema$.value;
    if (fromDate && toDate) {
      if (moment(fromDate).isSame(toDate, 'hour')) {
        return moment.tz(date, timezone).format('HH:mm');
      } else if (moment(fromDate).isSame(toDate, 'day') || moment(toDate).diff(fromDate, 'hour') < 25) {
        return moment.tz(date, timezone).format('yyyy/MM/DD HH:mm');
      } else if (moment(fromDate).isSame(toDate, 'month')) {
        return moment.tz(date, timezone).format('yyyy/MM/DD');
      } else {
        return moment.tz(date, timezone).format('yyyy/MM/DD HH:mm');
      }
    }
    return date;
  }
}
