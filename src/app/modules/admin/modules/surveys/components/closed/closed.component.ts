import { Component, OnInit } from '@angular/core';
import { GridApi, GridOptions } from 'ag-grid-community';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SurveysDataService } from 'src/app/core/services/surveys-data.service';
import { ActionsDropdownGridChildComponent } from 'src/app/modules/admin/shared';
import { survey } from 'src/app/shared/interfaces/survey';
@Component({
  selector: 'app-closed',
  templateUrl: './closed.component.html'
})
export class ClosedComponent implements OnInit {
  searchText!: string;
  modalRef!: BsModalRef;
  gridApi!: GridApi;
  rowData: survey[] = [];
  today: Date = new Date();
  customFilterDates!: Date[];
  filterValue:string="Launched Between";
  constructor(private surveysDataService: SurveysDataService) { }
  ngOnInit(): void {
    this.surveysDataService.fetchClosedSurveys().subscribe((data) => {
      this.surveysDataService.updateClosedSubject(data)

      this.surveysDataService.getClosedSurveys().subscribe((data) => {
        this.rowData = data;
        this.gridOptions.api?.setRowData(this.rowData);
      });
    });
  }
  gridOptions: GridOptions = {
    columnDefs: [
      {
        headerName: 'Survey Title',
        field: 'title',
        width: 350,
      },
      {
        headerName: 'Launched On',
        field: 'launchedOn',
        cellRenderer: (params: any) => this.dateNameRenderer(params.data.launchedOn, params.data.launchedBy),
        getQuickFilterText: (params) => {
          return this.dateNameRenderer(params.data.launchedOn, params.data.launchedBy);
        },
      },
      {
        headerName: 'Closed On',
        field: 'closedOn',
        cellRenderer: (params: any) => this.dateNameRenderer(params.data.closedOn, params.data.closedBy),
        getQuickFilterText: (params) => {
          return this.dateNameRenderer(params.data.closedOn, params.data.closedBy);
        },
      },
      {
        headerName: 'completion',
        field: 'completionPercentage',
        cellRenderer: function (param: any) {
          return Math.round(param.data.completionPercentage) + ' %';
        },
        getQuickFilterText: (params) => {
          return params.data.completionPercentage;
        },
      },
      {
        headerName: 'Actions',
        field: 'actions',
        width: 100,
        cellRenderer: ActionsDropdownGridChildComponent,
        cellRendererParams: {
          actions: ["Re-launch Survey", "View"]
        }
      },
    ],
    rowData: [],
    headerHeight: 40,
    rowHeight: 55
  }
  gridReady(params: any) {
    this.gridApi = params.api;
    this.gridOptions.api?.sizeColumnsToFit();
  }
  onSearchTextChange() {
    this.gridApi.setQuickFilter(this.searchText);
  }
  dateNameRenderer = function (date: string, SetBy?: string) {
    let formattedDate = new Date(date).toDateString();
    if (SetBy) {
      return (formattedDate + '<br>' + `<p class="text-muted text-small pt-4">by` + SetBy + `</p>`);
    }
    else {
      return (formattedDate);
    }
  }

  getDate(year: number, month: number, day: number) {
    return new Date(this.today.getFullYear() - year, this.today.getMonth() - month, this.today.getDate() - day);
  }

  updateFilter(fromDate: Date, toDate: Date) {
    fromDate.setHours(0, 0, 0, 0);
    toDate.setHours(23, 59, 59, 999);

    this.gridOptions.api?.setRowData(
      this.rowData.filter(row => {
        const launchedOnDate = new Date(row.launchedOn);
        return launchedOnDate >= fromDate && launchedOnDate <= toDate;
      })
      );
    this.filterValue=this.formatDate(fromDate)+' - '+this.formatDate(toDate);
    this.customFilterDates = [];
  }

  resetFilter(){
    this.searchText = "";
    this.gridApi.setQuickFilter(this.searchText);
    this.filterValue = "Launched Between";
    this.gridOptions.api?.setRowData(this.rowData);
  }

  formatDate(date:Date){
    const dateParts = date.toLocaleDateString('en-IN',{ day: '2-digit',month: 'short', year: 'numeric' }).split('-');
    return `${dateParts[0]} ${dateParts[1]} ${dateParts[2]}`;
  }
}

