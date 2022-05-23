export interface RentalInterface {
    $rentalKey: string;
    rentalName: string;
    pickupDate: string;
    returnDate: string;
    rentalStatus: boolean;
    rentalImage: string;
    location: {
        city: string;
        street: string;
    }
    fuel_options: string;
    $user_key: string;
    $car_key: string;
    
  
}