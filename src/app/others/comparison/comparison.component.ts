import { Component } from '@angular/core';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.scss']
})
export class ComparisonComponent {
  soapValues: any = {};
  allValuesMatch: boolean = false;
  soapValuesArray: any[] = [];
  propertiesNotInBothLists: any[] = [];
  countSoap: number = 0;
  countCod: number = 0;

  codeValues: Record<string, any> = {
    token: 'string',
    firma: 'string',
    urlafip: 'string',
    accion: 'string',
    nroRequerimiento: 'string',
    cuitusuario: 'string',
    cuitempresa: 'string',
    canal: 'string',
    banco: 'string',
    producto: 'string',
    fecha: 'string',
    hora: 'string',
    tarjeta: 'string',
    pin: 'string',
    pinEncriptado: 'string',
    codigoRespuesta: 'string',
    errorCodigo: 'string',
    errorDescripcion: 'string',
  };

  soap = `
  <NroRequerimiento><!-- mandatory -->string</NroRequerimiento>
  <Cuitusuario><!-- mandatory -->string</Cuitusuario>
  <Cuitempresa><!-- mandatory -->string</Cuitempresa>
  <Canal><!-- mandatory -->string</Canal>
  <Banco><!-- mandatory -->string</Banco>
  <Producto><!-- mandatory -->string</Producto>
  <Fecha><!-- mandatory -->string</Fecha>
  <Hora><!-- mandatory -->string</Hora>
  <Tarjeta><!-- mandatory -->string</Tarjeta>
  <Pin><!-- mandatory -->string</Pin>
  <PinEncriptado>string</PinEncriptado>
  <CodigoRespuesta>string</CodigoRespuesta>
  <ErrorCodigo>string</ErrorCodigo>
  <ErrorDescripcion>string</ErrorDescripcion>
  <Token><!-- mandatory -->string</Token>
  <Firma><!-- mandatory -->string</Firma>
  <URL_AFIP><!-- mandatory -->string</URL_AFIP>
  <Accion><!-- mandatory -->string</Accion>
  `;

  propertyTypeMatches: { property: string; typeMatch: boolean; dataType1: string; dataType2: string }[] = [];

  constructor() { }

  ngOnInit(): void {
    this.extractValuesFromSOAP();
    this.compare();
    this.count();
    console.log('Soap Values:', this.soapValues);
    console.log('Code Values:', this.codeValues);
  }

  extractValuesFromSOAP() {
    const tagValueRegex = /<([^>]+)>(.*?)<\/\1>/g;
    const matches = this.soap.match(tagValueRegex);

    if (matches) {
      for (const match of matches) {
        const propertyNameMatch = /<([^>]+)>/.exec(match);
        if (propertyNameMatch) {
          const propertyName = propertyNameMatch[1];
          const tagContentMatch = /<[^>]+>(.*?)<\/[^>]+>/.exec(match);
          if (tagContentMatch) {
            const tagContent = tagContentMatch[1];

            if (tagContent.includes('<!-- mandatory -->string') || tagContent.includes('string')) {
              this.soapValues[propertyName] = 'string';
            } else if (/<!-- mandatory -->\d/.test(tagContent)) {
              this.soapValues[propertyName] = 'int';
            } else {
              this.soapValues[propertyName] = '';
            }
          }
        }
      }
    }

    // Populate extractedValuesArray with key-value pairs
    this.soapValuesArray = Object.entries(this.soapValues);
  }

  compare() {
    this.allValuesMatch = true;
    for (const key in this.codeValues) {
      if (this.codeValues[key] !== this.soapValues[key]) {
        this.allValuesMatch = false;
        break;
      }
    }

    const allProperties = new Set([...Object.keys(this.codeValues), ...Object.keys(this.soapValues)]);
    this.propertiesNotInBothLists = [];
    for (const property of allProperties) {
      if (!(property in this.codeValues) || !(property in this.soapValues)) {
        this.propertiesNotInBothLists.push(property);
      }
    }
  }

  getPropertySource(property: string): string {
    if (property in this.codeValues && !(property in this.soapValues)) {
      return 'código';
    } else if (!(property in this.codeValues) && property in this.soapValues) {
      return 'soap';
    } else {
      return 'unknown';
    }
  }

  count() {
    this.countSoap = 0;
    this.countCod = 0;

    for (const element of this.propertiesNotInBothLists) {
      if (this.getPropertySource(element) === 'soap') {
        this.countSoap++;
      } else if (this.getPropertySource(element) === 'código') {
        this.countCod++;
      }
    }
  }
}
