

// reports.component.ts
import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as XLSX from 'xlsx'; // Імпорт бібліотеки XLSX

interface ProductReport {
  id: number;
  name: string;
  arrived: number;
  lost: number;
  sold: number;
  address?: string; // Додано для звіту за адресою
}

interface UserReport {
  id: number;
  name: string;
  purchased: number;
  returned: number;
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent {
  fromDate: Date | null = null;
  toDate: Date | null = null;
  selectedReportType: string = '';
  selectedAddress: string = '';
  selectedProduct: string = '';
  selectedUser: string = '';

  addresses: string[] = ['Address 1', 'Address 2', 'Address 3'];
  products: ProductReport[] = [
    { id: 1, name: 'Advent', arrived: 100, lost: 2, sold: 98 },
    { id: 2, name: 'Loss', arrived: 150, lost: 3, sold: 147 },
    { id: 3, name: 'Sales', arrived: 150, lost: 3, sold: 147 },
    // Додаткові звіти про продукти
  ];

  productReportsByAddress: ProductReport[] = [
    { id: 1, name: 'Product 1', arrived: 100, lost: 2, sold: 98, address: 'Address 1' },
    { id: 2, name: 'Product 2', arrived: 150, lost: 3, sold: 147, address: 'Address 2' },
    // Додаткові звіти про продукти за адресою
  ];

  users: UserReport[] = [
    { id: 1, name: 'Acquired', purchased: 10, returned: 1 },
    { id: 2, name: 'Return', purchased: 5, returned: 0 },
    // Додаткові звіти про користувачів
  ];

  generateReport(): void {
    if (!this.fromDate || !this.toDate || !this.selectedReportType) {
      alert('Please select the date range and report type.');
      return;
    }

    let dataToExport: any[] = [];

    switch (this.selectedReportType) {
      case 'product':
        dataToExport = this.products;
        break;
      case 'productByAddress':
        if (this.selectedAddress) {
          dataToExport = this.productReportsByAddress.filter(report => report.address === this.selectedAddress);
        }
        break;
      case 'user':
        dataToExport = this.users;
        break;
      default:
        break;
    }

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const wb: XLSX.WorkBook = { Sheets: { 'report': ws }, SheetNames: ['report'] };
    XLSX.writeFile(wb, `report_${new DatePipe('en-US').transform(new Date(), 'yyyyMMddHHmmss')}.csv`);
  }
}

