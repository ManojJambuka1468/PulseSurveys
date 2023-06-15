import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SurveysDataService } from 'src/app/core/services/surveys-data.service';
import { UserService } from 'src/app/core/services/user.service';
import { survey } from 'src/app/shared/interfaces/survey';
import { ActionsGridChildComponent } from '../components';


@Component({
  selector: 'app-open-surveys',
  templateUrl: './open-surveys.component.html'
})
export class OpenSurveysComponent implements OnInit {
  modalRef!: BsModalRef;
  rowData: survey[] = [];
  selectedSurvey!: survey;

  constructor(private userService:UserService,private surveysDataService: SurveysDataService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.userService.fetchOpenSurveys().subscribe((data) => {
      this.userService.updateSubject(data);

      this.userService.getOpenSurveys().subscribe((data) => {
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
          return param.data.title + '<br/>' + '<p class="text-secondary text-small pt-4">' + param.data.description +'.</p>';
        }
      },
      {
        headerName: 'Expires On',
        field: 'expiresOn',
        cellRenderer: function (params: any) {
          let date = new Date(params.data.expiresOn);
          let currentDate = new Date();
          let daysLeft: number = Math.ceil((Math.abs(currentDate.getTime() - date.getTime())) / (1000 * 60 * 60 * 24));
          if (daysLeft >= 5) {
            return date.toDateString() + '<br>' + `<p class="text-secondary text-small" *ngIf="daysLeft=5" > Expires in ` + daysLeft + ' days. </p>';
          }
          else {
            return date.toDateString() + '<br>' + `<p class="text-danger text-small" *ngIf="daysLeft=5" > Expires in ` + daysLeft + ' days. </p>';
          }
        }
      },
      {
        headerName: 'Launched On',
        field: 'launchedOn',
        cellRenderer: function (params: any) {
          let date = new Date(params.data.launchedOn).toDateString();
          return date + '<br>' + `<p class="text-muted text-small pt-4">by ` + (params.data.launchedBy) + `</p>`
        }
      },
      {
        headerName: 'Actions',
        field: 'actions',
        width: 100,
        cellRenderer: ActionsGridChildComponent,
        cellRendererParams: {
          action: 'Take Survey'
        }
      },
    ],
    rowData: [],
    headerHeight :40,
    rowHeight :55
  }
  gridReady() {
    this.gridOptions.api?.sizeColumnsToFit();
  }

  takeSurvey(surveyId?: number) {
    console.log(surveyId, 'Hello');
  }

}

