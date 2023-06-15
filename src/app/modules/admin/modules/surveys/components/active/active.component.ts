import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SurveysDataService } from 'src/app/core/services/surveys-data.service';
import { ActionsDropdownGridChildComponent } from 'src/app/modules/admin/shared';
import { survey } from 'src/app/shared/interfaces/survey';
import { LaunchSurveySelectComponent } from '..';
@Component({
  selector: 'app-active',
  templateUrl: './active.component.html'
})
export class ActiveComponent implements OnInit {
  rowData: survey[] = [];
  modalRef!: BsModalRef;
  constructor(private surveysDataService: SurveysDataService, private modalService: BsModalService) { }
  ngOnInit(): void {
    this.surveysDataService.fetchActiveSurveys().subscribe((data) => {
      this.surveysDataService.updateActiveSubject(data)
      this.surveysDataService.getActiveSurveys().subscribe((data) => {
        this.rowData = data;
        this.gridOptions.api?.setRowData(this.rowData);
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
          return param.data.title + '<br/>' + '<p class="text-secondary text-small pt-4">' + param.data.description + '</p>';
        }
      },
      {
        headerName: 'completion',
        field: 'completionPercentage',
        cellRenderer: function (param: any) {
          return param.data.completionPercentage + ' %';
        }
      },
      {
        headerName: 'Expires On',
        field: 'expiresOn',
        cellRenderer: function (params: any) {
          let date = new Date(params.data.expiresOn).toDateString();
          return date;
        }
      },
      {
        headerName: 'Launched On',
        field: 'launchedOn',
        cellRenderer: function (params: any) {
          let date = new Date(params.data.launchedOn).toDateString();
          return date + '<br>' + `<p class="text-secondary text-small"> by ` + (params.data.launchedBy) + `</p>`
        }
      },
      {
        headerName: 'Actions',
        field: 'actions',
        width: 100,
        cellRenderer: ActionsDropdownGridChildComponent,
        cellRendererParams: {
          actions:['Update', 'Close Survey']
        }
      },
    ],
    rowData: [],
    headerHeight: 50,
    rowHeight: 60
  }
  gridReady() {
    this.gridOptions.api?.sizeColumnsToFit();
  }
  launchNewSurvey() {
    this.modalRef = this.modalService.show(LaunchSurveySelectComponent, { class: 'modal-dialog-centered' });
  }
}