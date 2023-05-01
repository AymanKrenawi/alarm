import {Component, OnInit} from '@angular/core';
import * as XLSX from 'xlsx';
import {TableModel} from "../models/table-model";

@Component({
  selector: 'tableComponent',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {


  element?: string;
  public editMode = false;
  displayedColumns: string[] = ["carId", "licenseDate", "testDate", "riskMatDate", "weight", "category", "status", "note", "action"];
  today = new Date();
  tableWithStatus?: any[][];
  element_data?: Array<TableModel>;
  data?: Array<TableModel>;
  public editRow = false;
  isDisable = true;

  constructor() {
  }

  ngOnInit(): void {
    const dataLocalStorage = localStorage.getItem('tableNew');
    if (dataLocalStorage) {
      this.data = JSON.parse(dataLocalStorage);
    }

  }

  onEdit(item: any, field: string) {
    item.editFieldName = field;
    this.isDisable = false;
  }

  close(item: any) {
    item.editFieldName = '';
  }


  handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    console.log(input)

    if (input && input.files) {
      const files = input.files;
      const reader = new FileReader();
      reader.onload = () => {
        const data = new Uint8Array(reader.result as ArrayBuffer);
        const workbook = XLSX.read(data, {type: "array", cellDates: true});
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const date_format = 'dd.mm.yyyy';

        this.element_data = XLSX.utils.sheet_to_json(worksheet, {
          raw: false,
          header: 1,
          dateNF: date_format
        })
        this.data = this.element_data.map((row: any) => {
          const data = new TableModel();
          data.carId = row[0]
          data.licenseDate = row[1]
          data.testDate = row[2]
          data.riskMatDate = row[3]
          data.weight = row[4]
          data.category = row[5]
          data.status = row[6]
          data.note = row[7]
          return data;
        });
        console.log(this.data)

        localStorage.setItem("tableNew", JSON.stringify(this.data));
      };
      reader.readAsArrayBuffer(files[0]);
    }
  }


  updateLocalStorage(item: any) {
    //TODO: need to check the index
    this.data?.forEach(res =>{
      if(res.carId === item.carId){
        res = item;
        res.editFieldName = '';

      }
    })
    console.log(this.data![0])
    localStorage.setItem("tableNew", JSON.stringify(this.data));
    this.isDisable = true;


  }
}
