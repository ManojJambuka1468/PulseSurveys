import { Component, OnInit } from '@angular/core';
import { GridOptions, TemplateService } from 'ag-grid-community';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SurveysDataService } from 'src/app/core/services/surveys-data.service';
import { TemplatesDataService } from 'src/app/core/services/templates-data.service';
import { ActionsDropdownGridChildComponent, StepperWizardComponent } from 'src/app/modules/admin';
import { survey } from 'src/app/shared/interfaces/survey';
import { template } from 'src/app/shared/interfaces/template';
@Component({
  selector: 'app-general',
  templateUrl: './general.component.html'
})
export class GeneralComponent implements OnInit {
  rowData: template[] = [];
  surveytobeUpdated!: survey;
  modalRef!: BsModalRef;
  constructor(private surveysDataService: SurveysDataService, private modalService: BsModalService, private templateService: TemplatesDataService) { }

  ngOnInit(): void {
    this.templateService.fetchTemplates().subscribe((data) => {
      this.templateService.updateTemplatesSubject(data);

      this.templateService.getTemplates().subscribe((data) => {
        this.rowData = data;
        this.gridOptions.api?.setRowData(this.rowData);
      });
    });
  }
  gridOptions: GridOptions = {
    columnDefs: [
      {
        headerName: 'Template Title',
        field: 'surveyTitle',
        width: 500,
        cellRenderer: function (param: any) {
          return param.data.title + '<br/>' + '<p class="text-secondary text-small pt-4">' + param.data.description + '</p>';
        }
      },
      {
        headerName: 'Created On',
        field: 'addedOn',
        cellRenderer: function (params: any) {
          let date = new Date(params.data.addedOn).toDateString();
          return date + '<br/>' + '<p class="text-secondary text-small pt-4"> by ' + params.data.addedBy + '</p>';
        }
      },
      {
        headerName: 'Last Updated On',
        field: 'updatedOn',
        cellRenderer: function (params: any) {
          let date = new Date(params.data.updatedOn).toDateString();
          return date + '<br>' + `<p class="text-muted text-small"> by ` + (params.data.updatedBy) + `</p>`
        } 
      },
      {
        headerName: 'Actions',
        field: 'actions',
        width: 100,
        cellRenderer: ActionsDropdownGridChildComponent,
        cellRendererParams: {
          actions:['Update Template','Delete Template']
        }
      },
    ],
    rowData: [],
    headerHeight: 50,
    rowHeight: 55
  }
  gridReady() {
    this.gridOptions.api?.sizeColumnsToFit();
  }
  openCreateSurveyStepper(){
    this.modalRef = this.modalService.show(StepperWizardComponent, { class: 'full-modal', initialState: { modaltitle: 'Create Template', modalButton: 'Create Template'} });
  }
}