export class InvoiceInterface {
    $invoiceKey: string;
    $rentalKey: string;
    rentalName: string;
    $car_key: string;
    service_tax: number;
    VAT: number;
    totalAmount: number;
    discountAmount: number;
    netAmount: number;

    constructor(
        invoiceKey: string,
        rentalKey: string,
        rentalName: string,
        $car_key: string,
        service_tax: number,
        VAT: number,
        totalAmount: number,
        discountAmount: number,
        netAmount: number
    ) {
        this.$invoiceKey = invoiceKey;
        this.$rentalKey = rentalKey;
        this.rentalName = rentalName;
        this.$car_key = $car_key;
        this.service_tax = service_tax;
        this.VAT = VAT;
        this.totalAmount = totalAmount;
        this.discountAmount = discountAmount;
        this.netAmount = netAmount;
    }

    // getters and setters
    get invoice_key(): string { 
        return this.$invoiceKey;
    }
    set invoice_key(value: string){
        this.$invoiceKey = value;
    }
    get rental_key(): string {
        return this.$rentalKey;
    }
    set rentalKey(value: string){
        this.$rentalKey = value;
    }
    get car_key(): string {
        return this.$car_key;
    }
    set car_key(value: string){
        this.$car_key = value;
    }
    get service_taxs(): number {
        return this.service_tax;
    }
    set service_taxs(value: number){
        this.service_tax = value;
    }
    get Validators(): number {
        return this.VAT;
    }
    set VATs(value: number){
        this.VAT = value;
    }
    get total_amount(): number {
        return this.totalAmount;
    }
    set total_amount(value: number){
        this.totalAmount = value;
    }
    get discount_amount(): number {
        return this.discountAmount;
    }
    set discount_amount(value: number){
        this.discountAmount = value;
    }
    get net_amount(): number {
        return this.netAmount;
    }
    set net_amount(value: number){
        this.netAmount = value;
    }
}