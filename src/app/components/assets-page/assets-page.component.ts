import {Component, OnInit, ViewChild, AfterViewInit, OnDestroy} from '@angular/core';
import {IUserData} from "../../shared/models/user.data";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {SelectionModel} from "@angular/cdk/collections";
import {ApiService} from "../../shared/services/api.service";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {LoadListUsers} from "../../store/actions/user.actions";
import {
    SelectionDeleteRequest,
    SelectionListRequest,
    SelectionUpdateRequest
} from "../../store/actions/selection.actions";
import {State} from "../../store";
import {ISelectionData} from "../../shared/models/selection.data";



@Component({
    selector: 'app-assets-page',
    templateUrl: './assets-page.component.html',
    styleUrls: ['./assets-page.component.css']
})


export class AssetsPageComponent implements OnInit, AfterViewInit, OnDestroy {

    displayedColumns: string[] = ['select', 'img', 'id', 'assets'];
    dataSource = new MatTableDataSource<IUserData>([]);
    selection = new SelectionModel<IUserData>(true, []);

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public subscriptions: Array<Subscription> = [];
    public users: IUserData[];
    public select: ISelectionData[];
    public mountOfRows: any;
    public pageIndex: any;
    public pageSize: any;
    private state: any;

    constructor(
        private api: ApiService,
        private store: Store<State>
    ) {}
    ngOnInit(): void {
        this.load();
        this.loadSelect();


        this.subscriptions.push(
            this.store
                .subscribe(
                    ({users, select}) => {

                        this.users = users.allUsers;
                        this.mountOfRows = users.mountOfRows
                        this.select = select.select;
                        console.warn(55555555555555,  this.users )
                        console.warn('!!!!!!!!!!!!!!!!selectedData!!!!!!!!!!!!!!!!!!!!!!!',  this.select)

                        if (this.select) {
                            this.newArray()
                        }
                    }
                ));

        // setTimeout(() => this.newArray(), 1000)

    }

    public load(pageIndex=0, search = '', pageSize=10): void {
        this.store.dispatch(new LoadListUsers({pageIndex, search, pageSize}));
    }

    public loadSelect(): void {
        this.store.dispatch(new SelectionListRequest());
    }

    public toggleChange(event, row) {
        if (event.checked === true) {
            console.warn(row)
            this.store.dispatch(new SelectionUpdateRequest([row._id]));
        } else {
            this.store.dispatch(new SelectionDeleteRequest([row._id]));
        }
    }

    newArray() {
        let usersWithKey = [...this.users];
        console.log('this.state.select.select', this.select);
        let newArray = usersWithKey.filter(user => {
            const selected = this.select.find(item => item.id === user._id)
            console.warn('selected', selected);
            return selected !== undefined
        })
        console.warn('usersWithKey', newArray)

        this.dataSource = new MatTableDataSource(this.users);
        this.selection = new SelectionModel<IUserData>(true, newArray);
    }


    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.dataSource.paginator.page.subscribe(({pageSize, pageIndex}) => {
           // this.store.dispatch(new LoadListUsers({}))
            this.load(pageIndex, '', pageSize);
        })
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        console.warn(5555555555555555, filterValue)
        this.dataSource.filter = filterValue.trim().toLowerCase();
        console.warn('this.dataSource', this.dataSource.filter);

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    public getServerData(event?: PageEvent) {
        console.log('getServerData');
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
        console.warn('%%%%%%%%%%%%%%%%%%5this.selection', )
    }

    checkboxLabel(row?: IUserData): string {
        if (!row) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row._id + 1}`;
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

}



