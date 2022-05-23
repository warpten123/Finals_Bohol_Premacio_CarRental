export interface CarsInterface{
    $carKey: string;
    carName: string;
    carColor: string;
    carRentPrice: number;
    carMileage: number;
    carStatus: boolean;
    carImage: string;
    carLocation?: {
        city: string;
        street: string;
    }
    //need to add more
}