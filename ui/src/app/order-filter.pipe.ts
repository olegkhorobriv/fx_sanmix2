// order-filter.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderFilter'
})
export class OrderFilterPipe implements PipeTransform {
  transform(orders: any[], filters: { date: any, status: string, city: string }): any[] {
    if (!orders || !filters) {
      return orders;
    }

    return orders.filter(order => {
      const matchDate = filters.date ? new Date(order.date).toDateString() === new Date(filters.date).toDateString() : true;
      const matchStatus = filters.status ? order.status === filters.status : true;
      const matchCity = filters.city ? order.city.toLowerCase().includes(filters.city.toLowerCase()) : true;

      return matchDate && matchStatus && matchCity;
    });
  }
}
