
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

// Sanitizes information in angular tag to ensure that base 64 image string is displayed
@Pipe({name: 'SafeHtmlImage'})
export class SafeHtmlImagePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  // Required method that says to trust the supplied image
  transform(html) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(html);
  }
}
