import { Component, Input, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'icon',
  standalone: true,
  imports: [],
  template: '',
})
export class IconComponent implements OnInit {
  @Input() iconName!: string;
  @Input() width: string = '24';   // Default width
  @Input() height: string = '24';  // Default height

  constructor(
    private http: HttpClient,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.loadSvgIcon();
  }

  private loadSvgIcon(): void {
    const url = `/assets/icons/${this.iconName}.svg`; // Assuming SVGs are stored in assets/icons

    this.http.get(url, { responseType: 'text' }).subscribe(
      (svgContent) => {
        const div = this.renderer.createElement('div');
        div.innerHTML = svgContent;

        const svgElement = div.querySelector('svg');

        if (svgElement) {
          this.renderer.setAttribute(svgElement, 'width', this.width);
          this.renderer.setAttribute(svgElement, 'height', this.height);
          this.renderer.appendChild(this.el.nativeElement, svgElement);
        }
      },
      (error) => {
        console.error(`Could not load SVG icon: ${this.iconName}`, error);
      }
    );
  }
}
