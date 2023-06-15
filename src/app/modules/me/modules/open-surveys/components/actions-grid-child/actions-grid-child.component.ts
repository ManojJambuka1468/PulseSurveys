import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TakeSurveyStepperWizardComponent } from '..';

@Component({
  selector: 'app-actions-grid-child',
  templateUrl: './actions-grid-child.component.html'
})
export class ActionsGridChildComponent implements ICellRendererAngularComp {

  action!: string;
  params!: any;
  constructor(private modalRef: BsModalRef, private modalService: BsModalService) { }

  agInit(params: ICellRendererParams<any, any, any>): void {
    this.params = params;
  }
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    this.params = params;
    return false
  }

  takeSurvey() {
    this.modalRef = this.modalService.show(TakeSurveyStepperWizardComponent, { class: 'full-modal', initialState: { modaltitle: 'Update Template', modalButton: 'Submit', templateId: this.params.data.id } });
  }
}
