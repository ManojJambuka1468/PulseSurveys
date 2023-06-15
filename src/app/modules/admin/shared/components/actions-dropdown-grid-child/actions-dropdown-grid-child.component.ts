import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ConfirmationComponent } from 'src/app/shared';
import { StepperWizardComponent, UpdateSurveyDetailsComponent } from '..';
@Component({
  selector: 'app-actions-dropdown-grid-child',
  templateUrl: './actions-dropdown-grid-child.component.html'
})
export class ActionsDropdownGridChildComponent implements ICellRendererAngularComp {
  modalRef!: BsModalRef;
  params!: any;
  actions!: string[];
  constructor(private modalService: BsModalService, private router: Router, private activatedRoute: ActivatedRoute) { }
  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.actions = this.params.actions;
  }
  refresh(params: ICellRendererParams) {
    this.params = params;
    return false;
  }
  performAction(action: string) {
    if (action === 'Update') {
      this.updateSurveyDetails();
    }
    else if (action === 'Close Survey') {
      this.showConfirmation('close');
    }
    else if (action === 'Re-launch Survey') {
      this.reLaunchSurvey();
    }
    else if (action === 'View') {
      this.router.navigate(['view', this.params.data.id], { relativeTo: this.activatedRoute });
    }
    else if (action == 'Update Template') {
      this.modalRef = this.modalService.show(StepperWizardComponent, { class: 'full-modal', initialState: { modaltitle: 'Update Template', modalButton: 'Save & Close', templateId: this.params.data.id } });
    }
    else if ('Delete Template') {
      this.showConfirmation('delete');
    }
  }
  showConfirmation(action:string) {
    this.modalRef = this.modalService.show(ConfirmationComponent, { class: 'modal-dialog-centered', initialState: { action: action, selectedSurveyId: this.params.data.id } });
  }
  updateSurveyDetails() {
    this.modalRef = this.modalService.show(UpdateSurveyDetailsComponent, { class: 'modal-dialog-centered', initialState: { modaltitle: 'Update Survey', modalButton: 'Update', selectedSurveyId: this.params.data.id } });
  }
  reLaunchSurvey() {
    this.modalRef = this.modalService.show(UpdateSurveyDetailsComponent, { class: 'modal-dialog-centered', initialState: { modaltitle: 'Re-launch Survey', modalButton: 'Relaunch', selectedSurveyId: this.params.data.id } });
  }
}