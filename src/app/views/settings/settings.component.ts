import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MockData} from '../../shared/mock-data';
import {Province} from '../../shared/models/user.model';
import {LanguageName} from '../../shared/models/language.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Study} from '../../shared/models/study.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnChanges {
  languageNames: LanguageName[];
  provinces: Province[];
  allSelected = false;
  rForm: FormGroup;

  constructor(private router: Router) { }

  ngOnInit() {
    this.loadProperties();
    this.loadFormInstance(this.allSelected);
  }

  public loadProperties(): void {
    this.languageNames = MockData.LANGUAGES_NAME;
    this.provinces = MockData.PROVINCES;
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    let hayCambios = false;
    if (this.hasChange(changes.allSelected)) {
      hayCambios = changes.allSelected.currentValue;
    }
    this.loadFormInstance(hayCambios);
  }

  private hasChange(checkboxAll) {
    return checkboxAll && checkboxAll.currentValue;
  }

  private loadFormInstance(allSelect) {
    this.rForm = new FormGroup({
      language: new FormControl(),
      province: new FormControl(),
      allSelected: new FormControl(allSelect)
    });
  }

  public submit() {
    this.router.navigate(['/admin/profile']);
  }

}
