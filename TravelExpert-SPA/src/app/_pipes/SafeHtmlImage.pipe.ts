
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({name: 'SafeHtmlImage'})
export class SafeHtmlImagePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(html) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(html);
  }
}
