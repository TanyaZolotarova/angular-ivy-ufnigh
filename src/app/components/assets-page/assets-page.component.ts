import {Component, OnInit, ViewChild, AfterViewInit, OnDestroy} from '@angular/core';
import {UserData} from "../../shared/models/user.data";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {SelectionModel} from "@angular/cdk/collections";
import {ApiService} from "../../shared/services/api.service";
import {Observable, Subscription} from "rxjs";
import {select, Store} from "@ngrx/store";
// import {LoadListUsers} from "../../store/actions/users.actions";
// import {selectUserList} from "../../store/reducers/users.reducer";
// import {selectUserList, UserState} from "../../store/reducers/users.reducer";




const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];



@Component({
  selector: 'app-assets-page',
  templateUrl: './assets-page.component.html',
  styleUrls: ['./assets-page.component.css']
})


export class AssetsPageComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['select', 'pic','id', 'assets'];
  dataSource: MatTableDataSource<UserData>;
  selection = new SelectionModel<UserData>(true, []);

  public subscriptions: Array<Subscription> = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // public assets$: Observable<UserData[]> = this.store.pipe(
  //   select(selectUserList)
  // )
  constructor(private api: ApiService,  private store: Store) {

    // Create 100 users
    const users = Array.from({length: 23}, (_, k) => this.createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }
  ngOnInit(): void {
    // this.load();
    // this.subscriptions.push(
    //   this.assets$.subscribe(assets => {
    //     console.log(assets);
    //
    //
    //   })
    // );

  }

  // public load(): void {
  //   this.store.dispatch(new LoadListUsers());
  // }

  ngAfterViewInit() {
    // this.api.getAssets()
    // console.warn('getAssets',  this.api.getAssets())
    // this.api.getSearchAssets()
    // console.warn('getSearchAssets', this.api.getSearchAssets)
    // this.dataSource = new MatTableDataSource(users);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  createNewUser(id: number): UserData {

    const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

    return {
      id: id,
      assets: name,
    };
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: UserData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());

  }

}



