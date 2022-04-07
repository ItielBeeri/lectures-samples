import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { distinct, distinctUntilChanged, map, startWith, switchMap, tap } from 'rxjs/operators';
import { selectVM, VM } from './selectors';
import { changeAA, changeAB, changeB, GlobalState } from './state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'TryMemoization';

  constructor(private store: Store<GlobalState>) {}

  public valueControl = new FormControl(0);
  public indexControl = new FormControl(0);

  public index$!: Observable<number>;

  public aaElement1$!: Observable<VM>;
  public aaElement2$!: Observable<VM>;

  public ngOnInit() {
    this.index$ = this.indexControl.valueChanges.pipe(
      map((v) => parseInt(v)),
      startWith(0)
    );

    this.aaElement1$ = this.index$.pipe(
      switchMap((index) => this.store.select(selectVM(index))),
      tap((vm) => console.info('In AppComponent, in aaElement1', vm)),
      distinctUntilChanged(),
      tap((vm) =>
        console.info('In AppComponent, in aaElement1, after distinct', vm)
      )
    );
    this.aaElement2$ = this.index$.pipe(
      switchMap((index) => this.store.select(selectVM(index))),
      tap((vm) => console.info('In AppComponent, in aaElement2', vm)),
      distinctUntilChanged(),
      tap((vm) =>
        console.info('In AppComponent, in aaElement2, after distinct', vm)
      )
    );
  }

  public changeAA(value: string) {
    this.store.dispatch(changeAA({ aa: value }));
  }

  public changeAB(value: string) {
    this.store.dispatch(changeAB({ ab: value }));
  }

  public changeB(value: string) {
    this.store.dispatch(changeB({ b: value }));
  }
}
