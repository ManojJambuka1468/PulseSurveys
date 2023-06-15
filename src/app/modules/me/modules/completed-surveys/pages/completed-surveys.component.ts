import { Component, OnInit } from '@angular/core';
import { GridApi, GridOptions, GridReadyEvent, ICellRenderer, ICellRendererParams } from 'ag-grid-community';
import { SurveysDataService } from 'src/app/core/services/surveys-data.service';
import { UserService } from 'src/app/core/services/user.service';
import { survey } from 'src/app/shared/interfaces/survey';
@Component({
  selector: 'app-completed-surveys',
  templateUrl: './completed-surveys.component.html',
})
export class CompletedSurveysComponent implements OnInit {
  private gridApi!: GridApi;
  today: Date = new Date();
  rowData: survey[] = [];
  searchText!:string;
  customFilterDates!: Date[];
  filterValue:string="Launched Between";
  constructor(private userService:UserService, private surveysDataService: SurveysDataService) { }
  ngOnInit(): void {
    
  }
  getRowData(){
    this.userService.fetchCompletedSurveys().subscribe((data) => {
      this.userService.updateCompletedSubject(data)

      this.userService.getCompletedSurveys().subscribe((data) => {
        console.log(data);
        this.rowData = data;
        setTimeout(() => {
          this.gridOptions.api?.setRowData(this.rowData); 
        }, 1000);
        this.onSearchTextChange();
      });
    });
  }
  gridOptions: GridOptions = {
    columnDefs: [
      {
        headerName: 'Survey Title',
        field: 'surveyTitle',
        width: 500,
        cellRenderer: function (param: any) {
          return param.data.title + '<br/>' + '<p class="text-secondary text-small pt-4">' + param.data.description +'</p>';
        },
        getQuickFilterText: (params) => {
          return params.data.title+params.data.description;
        },
      },
      {
        headerName: 'Launched On',
        field: 'launchedOn',
        cellRenderer: (params:any)=>this.dateNameRenderer(params.data.launchedOn,params.data.launchedBy),
        getQuickFilterText: (params) => {
          return this.dateNameRenderer(params.data.launchedOn, params.data.launchedBy);
        },
      },
      {
        headerName: 'Closed On',
        field: 'closedOn',
        cellRenderer: (params:any)=>this.dateNameRenderer(params.data.closedOn,params.data.closedBy),
        getQuickFilterText: (params) => {
          return this.dateNameRenderer(params.data.closedOn, params.data.closedBy);
        },
      },
      {
        headerName: 'Completed on',
        field: 'completedOn',
        cellRenderer: (params:any)=>this.dateNameRenderer(params.data.completedOn),
        getQuickFilterText: (params) => {
          return this.dateNameRenderer(params.data.completedOn);
        },
      }
    ],
    rowData: [],
    headerHeight :40,
    rowHeight :55,
  }
  gridReady(params:any) {
    this.gridApi = params.api;
    this.gridOptions.api?.sizeColumnsToFit();
    this.getRowData();
  }
  onSearchTextChange(){
    this.gridApi.setQuickFilter(this.searchText);
  }
  dateNameRenderer= function (date:string,SetBy?:string){
    if(date){
      let formattedDate = new Date(date).toDateString();
      if(SetBy){
        return (formattedDate + '<br>' + `<p class="text-muted text-small pt-4">by ` + SetBy + `</p>`);
      }
      else{
        return (formattedDate);
      }
    }
    return '<span class="text-secondary text-small pt-4">Not Closed Yet</span>'
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