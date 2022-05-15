import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class carController {
    constructor(private readonly carService: CarsService) { }

    /* 
    > Method: @Get
    > Endpoint: http://localhost:3000/cars/all
    > Input Method: none
    > Purpose:
        > Returns data about all cars. 
        > This function must be placed above cars/:id in the service definitions in order for it to work
    */
    @Get('/all')
    getAllUser() {
        return this.carService.getAll();
    }

    /* 
    > Method: @Get
    > Endpoint: http://localhost:3000/cars/:id
    > Input Method: none
    > Purpose:
        > Returns data about a car
    */
    @Get('/:id')
    getUserID(@Param('id') id: string) {
        return this.carService.getOne(id);
    }

    // add new cars in the db
    @Post('/add')
    addUser(@Body() body: any) {
        return this.carService.addCars(body);
    }

    /* 
    > Method: @Put
    > Endpoint: http://localhost:3000/cars/:id
    > Input Method: JSON body with no id, Param("id")
    > Purpose:
        > Using the id from the param, replaces all the values of the Car object with the data from body. 
        > Returns true if all data was changed. 
        > If the body is missing data, return false or an error message. (Your discretion)
    */
    @Put('/:id')
    replaceValuePut(@Param('id') id: string, @Body() body: any) {
        return this.carService.replaceValuePut(id, body);
    }

    /* 
    > Method: @Patch
    > Endpoint: http://localhost:3000/car/:id
    > Input Method: JSON body with no id, Param("id")
    > Purpose:
        > Using the id from the param, replaces values of the Car object with the data that exists in the JSON body. 
        > Returns true if data was changed. 
        > If the body has an invalid value return false or an error message.
        
        */
    @Patch('/:id')
    replaceValuePatch(@Param('id') id: string, @Body() body: any) {
        return this.carService.replaceValuePatch(id, body);
    }

    /* 
    > Method: @Delete
    > Endpoint: http://localhost:3000/cars/:id
    > Input Method: Param("id")
    > Purpose:
        > Deletes the car. 
        >If the user does not exist return an error message. 
        >If the cars is successfully deleted, return a success message.
    */
    @Delete('/:id')
    deleteUser(@Param('id') id: string) {
        return this.carService.deleteCars(id);
    }

    /* 
    > Method: @Get
    > Endpoint: http://localhost:3000/cars/search/:term
    > Input Method: Param("term")
    > Purpose:
        > searches for a cars that matches any term. 
        > Do not consider partial matches. 
        > You may take advantage of the String.toUpper() function to make sure the term and data is the same case when comparing
    */

    @Get('/search/:term')
    searchUser(@Param('term') term: string) {
        return this.carService.searchCar(term);
    }

}


