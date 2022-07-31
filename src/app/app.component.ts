import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogComponent} from "./dialog/dialog.component";
import {ApiService} from "./services/api.service";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['productName', 'category', 'freshness', 'price', 'date', 'comment', 'action'];
  dataSource !: MatTableDataSource<any>;

@ViewChild(MatPaginator) paginator !: MatPaginator;
@ViewChild(MatSort) sort !: MatSort;
  title = 'angular13Crud';
  constructor(public dialog: MatDialog,
              private api: ApiService) {}

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    });
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllProducts(){
    this.api.getProduct().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource<any>(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert("Error while fetching the products");
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
