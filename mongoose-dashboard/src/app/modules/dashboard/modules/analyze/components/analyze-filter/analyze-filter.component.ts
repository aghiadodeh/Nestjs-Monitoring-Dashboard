import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { analyzeFilterSchema } from '../../configurations/analyze-filter.schema';
import { GenericFiltersComponent } from '@x-angular/cms';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { TranslateModule } from '@ngx-translate/core';
import { AnalyzeService } from '../../services/analyze.service';
import moment from 'moment-timezone';
import { AnalyzeFilterDto } from '../../dto/analyze-filter.dto';

@Component({
  selector: 'app-analyze-filter',
  standalone: true,
  imports: [
    ButtonModule,
    AccordionModule,
    TranslateModule,
    GenericFiltersComponent,
  ],
  templateUrl: './analyze-filter.component.html',
  styleUrl: './analyze-filter.component.scss'
})
export class AnalyzeFilterComponent implements AfterViewInit {
  public filterSchema = analyzeFilterSchema();
  @ViewChild(GenericFiltersComponent) filterComponent!: GenericFiltersComponent;

  constructor(private analyzeService: AnalyzeService) { }

  ngAfterViewInit(): void {
    this.applyFilters();
  }

  // fetch data with new filters
  public applyFilters(): void {
    const filters = this.filterComponent.getFilters();
    this.analyzeService.applyFilters(filters);
  }

  // fetch data after reset filters
  public resetFilters(): void {
    this.filterComponent.resetFilters();
    this.analyzeService.applyFilters({});
  }
}
