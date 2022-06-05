export interface CarsInterface{
    $carKey: string;
    carName: string;
    carColor: string;
    carRentPrice: number;
    carMileage: number;
    carStatus: string;
    carImage: string;
    carLocation: {
        city: string;
        barangay: string;
    }
    //need to add more
}