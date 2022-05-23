export class RentalInterface {
    $rentalKey: string;
    rentalName: string;
    pickupDate: string;
    returnDate: string;
    rentalStatus: boolean;
    rentalImage: string;
    location: {
        city: string;
        street: string;
        zipcode: string;
        country: string;
    }
    fuel_options: string;
    $user_key: string;
    $car_key: string;

    constructor(
        rentalKey: string,
        rentalName: string, 
        $user_key: string, 
        $car_key: string, 
        pickupDate: string, 
        returnDate: string, 
        rentalStatus: boolean, 
        rentalImage: string, 
        location:  any, 
        fuel_options: string
    ) {
        this.$rentalKey = rentalKey;
        this.rentalName = rentalName;
        this.$user_key = $user_key;
        this.$car_key = $car_key;
        this.pickupDate = pickupDate;
        this.returnDate = returnDate;
        this.rentalStatus = rentalStatus;
        this.rentalImage = rentalImage;
        this.location = {
            city: location.city,
            street: location.street,
            zipcode: location.zipcode,
            country: location.country
        }
        this.fuel_options = fuel_options;
    }

    // getters and setters
    get rentalKey(): string {
        return this.$rentalKey;
    }
    set rentalKey(value: string) {
        this.$rentalKey = value;
    }
    get user_key(): string {
        return this.$user_key;
    }
    set user_key(value: string) {
        this.$user_key = value;
    }
    get car_key(): string {
        return this.$car_key;
    }
    set car_key(value: string) {
        this.$car_key = value;
    }
    get rentalNames(): string {
        return this.rentalName;
    }
    set rentalNames(value: string) {
        this.rentalName = value;
    }
    get rentalPickupDate(): string {
        return this.pickupDate;
    }
    set rentalPickupDate(value: string) {
        this.pickupDate = value;
    }
    get rentalReturnDate(): string {
        return this.returnDate;
    }
    set rentalReturnDate(value: string) {
        this.returnDate = value;
    }
    get rentalStat(): boolean {
        return this.rentalStatus;
    }
    set rentalStat(value: boolean) {
        this.rentalStatus = value;
    }
    get rentalImages(): string {
        return this.rentalImage;
    }
    set rentalImages(value: string) {
        this.rentalImage = value;
    }
    get rentalLocation(): any {
        return this.location;
    }
    set rentalLocation(value: any) {
        this.location = value;
    }
    get rentalFuelOptions(): string {
        return this.fuel_options;
    }
}