import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newlineJson',
  standalone: true,
})
export class NewlineJsonPipe implements PipeTransform {
  transform(value: any): string {
    if (!value) {
      return '';
    }

    let jsonString: string;
    try {
      jsonString = JSON.stringify(value, null, 2);
    } catch (error) {
      console.error('Invalid JSON object provided to newlineJson pipe:', error);
      return '';
    }

    // Replace \n with actual new lines
    return jsonString.replace(/\\n/g, '\n');
  }
}
