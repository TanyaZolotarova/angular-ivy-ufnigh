import {Component, OnInit, ViewChild, AfterViewInit, OnDestroy} from '@angular/core';
import {IUserData} from "../../shared/models/user.data";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
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

    displayedColumns: string[] = ['select', 'img', 'id', 'name'];
    dataSource = new MatTableDataSource<IUserData>([]);
    selection = new SelectionModel<IUserData>(true, []);

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public subscriptions: Array<Subscription> = [];
    public users: IUserData[];
    public select: ISelectionData[];
    public amountOfRows: number;
    private search: string;

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
                        this.amountOfRows = users.amountOfRows
                        this.select = select.select;
                        if (this.select) {
                            this.findSelect()
                        }
                    }
                ));
    }

    public load(pageIndex = 0, search = '', pageSize = 10): void {
        this.store.dispatch(new LoadListUsers({pageIndex, search, pageSize}));
    }

    public loadSelect(): void {
        this.store.dispatch(new SelectionListRequest());
    }

    public toggleChange(event, row) {
        if (event.checked === true) {
            this.store.dispatch(new SelectionUpdateRequest([row._id]));
        } else {
            this.store.dispatch(new SelectionDeleteRequest([row._id]));
        }
    }

    public findSelect() {
        let usersWithKey = [...this.users];
        let findSelect = usersWithKey.filter(user => {
            const selected = this.select.find(item => item.id === user._id)
            return selected !== undefined
        })
        this.dataSource = new MatTableDataSource(this.users);
        this.selection = new SelectionModel<IUserData>(true, findSelect);
    }

    ngAfterViewInit() {
        this.paginator.page.subscribe(({pageSize, pageIndex}) => {
            this.load(pageIndex, this.search, pageSize);
        })
        this.dataSource.sort = this.sort;
    }

    public applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.search = filterValue;
        this.load(0, filterValue, 10)


    }

    public isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    public masterToggle() {
        if (this.isAllSelected()) {
            this.selection.clear();
            return;
        }
        this.selection.select(...this.dataSource.data);
    }

    public checkboxLabel(row?: IUserData): string {
        if (!row) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row._id + 1}`;
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

}



