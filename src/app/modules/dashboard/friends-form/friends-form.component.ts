/*
 * File Created: Saturday, 17th October 2020 3:47:28 pm
 * Author: Zheng Zhou (zhengzhou.purdue@gmail.com)
 * -----
 * Last Modified: Sunday, 18th October 2020 1:47:02 pm
 * Modified By: Zheng Zhou (zhengzhou.purdue@gmail.com>)
 * -----
 */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addRecord } from '../../../app.actions';
import { ERROR_AGE_REQUIRED, ERROR_NAME_REQUIRED, ERROR_WEIGHT_REQUIRED } from '../../../../constants/app-constants';
import { FormData, FormError } from '../../../../typings';

@Component({
  selector: 'app-friends-form',
  templateUrl: './friends-form.component.html',
  styleUrls: ['./friends-form.component.scss']
})
export class FriendsFormComponent implements OnInit {

  public friendsForm!: FormGroup;
  public error: FormError = {
    name: ERROR_NAME_REQUIRED,
    age: ERROR_AGE_REQUIRED,
    weight: ERROR_WEIGHT_REQUIRED
  };

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<{form: FormData[]}>
  ) {
    this.friendsForm = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      weight: ['', Validators.required],
      friends: new FormArray([new FormControl('')])
    });
  }

  ngOnInit(): void {
  }

  get name(): FormControl {
    return this.friendsForm.get('name') as FormControl;
  }

  get age(): FormControl {
    return this.friendsForm.get('age') as FormControl;
  }

  get weight(): FormControl {
    return this.friendsForm.get('weight') as FormControl;
  }

  get friends(): FormArray {
    return this.friendsForm.get('friends') as FormArray;
  }

  addFriend(): void {
    this.friends.push(this.formBuilder.control(''));
  }

  onSubmit(): void {
    this.dispatchAddRecord();
    this.resetForm();
  }

  resetForm(): void {
    this.friends.clear();
    this.friendsForm.reset();
    this.friends.insert(0, new FormControl(''));
  }

  dispatchAddRecord(): void {
    this.store.dispatch(addRecord({payload: this.friendsForm.value}));
  }
}