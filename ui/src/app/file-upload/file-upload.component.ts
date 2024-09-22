import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FileUploadService} from '../services/file-upload.service';
import * as XLSX from 'xlsx';
import {Import1CTable} from "../../../../@libs/models/common.model";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  @ViewChild('fileInput') fi: ElementRef

  data: Import1CTable[] = []
  canImport = false;
  batchSize = 100
  currIndex = 0

  load = 0
  loading = false
  mode: 'determinate' | 'indeterminate'
  step = 0

  newCats: number
  newItems: number
  showNew = false

  constructor(private uploadService: FileUploadService) {}

  ngOnInit(): void {
    this.emptyNew()
  }

  emptyNew() {
    this.newCats = 0
    this.newItems = 0
    this.showNew = false
  }

  selectFile(event) {
    if (!event.target.files[0]) {
      this.canImport = false;
    }

    this.mode = 'indeterminate'
    this.loading = true
    this.emptyNew()

    let fileReader = new FileReader();

    fileReader.onload = (e) => {
      const data = new Uint8Array(fileReader.result as ArrayBufferLike);
      const arr = [];
      for(let i = 0; i != data.length; ++i) {
        arr[i] = String.fromCharCode(data[i]);
      }
      const bstr = arr.join("");
      const workbook = XLSX.read(bstr, {type:"binary"});

      workbook.SheetNames.forEach(sn => {
        const worksheet = workbook.Sheets[sn]

        const res = XLSX.utils.sheet_to_json(worksheet,{raw:true, defval:""})

        res.forEach((val, i) => {
          val['level'] = worksheet["!rows"][i+1]?.level || 0
          val['isCategory'] = !val["Полное наименование"]?.toString().length
          val['parentCategory'] = null
          val['Наименование'] = val['Наименование']?.toString()?.trim()
          if (val['level'] > 0) {
            for (let currI = i; currI >= 0; currI--) {
              if (res[currI]['level'] == val['level'] - 1) {
                val['parentCategory'] = res[currI]["Наименование"]
                break;
              }
            }
          }
        })
        this.data = [...this.data, ...res]
      })
    }

    fileReader.readAsArrayBuffer(event.target.files[0]);

    fileReader.onloadend = (e) => {
      this.canImport = true;
      this.loading = false
      this.step = 100 / (this.data.length / this.batchSize)
    };
  }

  runImport() {
    this.loading = true
    this.canImport = false
    this.mode = 'determinate'
    this.showNew = true

    const batch = this.data.slice(this.currIndex, this.currIndex + this.batchSize)

    this.uploadService.import1C(batch).subscribe({
      next: resp => {
        this.newCats += resp['createdCats']
        this.newItems += resp['createdItems']

        this.currIndex += this.batchSize
        this.load += this.step
        if (this.currIndex <= this.data.length) {
          this.runImport()
        } else {
          this.data = []
          this.canImport = false
          this.currIndex = 0
          this.loading = false
          this.load = 0
          this.fi.nativeElement.value = null
        }
      }, error: () => {
        this.loading = false
        this.canImport = true
        this.currIndex = 0
        this.load = 0
      }
    })
  }

}
