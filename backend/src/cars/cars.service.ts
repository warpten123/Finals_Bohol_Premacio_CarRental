import * as admin from "firebase-admin";

import { CRUDReturn } from "../cars/cars.resource/crud_return.interface";
import { Helper } from "../cars/cars.resource/helper";
import { Injectable } from "@nestjs/common";
import { Cars } from "../cars/cars.resource/cars.model";
import { auth } from "firebase-admin";

@Injectable()
export class CarsService {

    private DB = admin.firestore();
    private AUTH: auth.Auth = admin.auth();
    constructor() {}

    async addCars(body: any): Promise<CRUDReturn> {
      try {
        var validBody: { valid: boolean; data: string } =
          Helper.validBodyPut(body);
        if (validBody.valid) {
            //create the Firestore Database entry for the car
            var newCar: Cars = new Cars(
              body.name,
              body.age,
              body.email,
              // random id from helper.ts
              Helper.generateUID()
            );
            if (await this.saveToDB(newCar)) {
              return {
                success: true,
                data: newCar.toJson(),
              };
            } else {
              throw new Error("generic database error");
            }
            // print newCar
            console.log(newCar.toJson());
        } else {
          throw new Error(validBody.data);
        }
      } catch (error) {
        console.log("AddError");
        console.log(error.message);
        return { success: false, data: `Error adding car, ${error}` };
      }
    }

    async saveToDB(car: Cars): Promise<boolean> {
      console.log(`Attempting to save user ${car.id} ${car.email}`);
      try {
        var result = await car.commit(false);
        return result.success;
      } catch (error) {
        console.log("Save to db error");
        console.log(error.message);
        return false;
      }
    }

   async getOne(id: string): Promise<CRUDReturn> {
      try {
        var result = await this.DB.collection("carss").doc(id).get();
        if (result.exists) {
          var temp: {} = result.data();
          temp['id'] = result.id;
          return {
            success: true,
            data: temp,
          };
        } else {
          return {
            success: false,
            data: `Car ${id} does not exist in database!`,
          };
        }
      } catch (error) {
        console.log("Get one error");
        console.log(error.message);
        return {
          success: false,
          data: error.message,
        };
      }
    }
  
    async getAll(): Promise<CRUDReturn> {
      var results: Array<any> = [];
      try {
        var allCars = await this.getAllCarObjects();
        allCars.forEach((cars) => {
          results.push(cars.toJson());
        });
        return { success: true, data: results };
      } catch (e) {
        return { success: false, data: e };
      }
    }
  
    async getAllCarObjects(): Promise<Array<Cars>> {
      var results: Array<Cars> = [];
      try {
        var dbData: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData> =
          await this.DB.collection("users").get();
        dbData.forEach((doc) => {
          if (doc.exists) {
            var data = doc.data();
            results.push(
              new Cars(data["name"], data["age"], data["email"], doc.id)
            );
          }
        });
        return results;
      } catch (e) {
        return null;
      }
    }
  
    async searchCar(term: string): Promise<CRUDReturn> {
      try {
        var results: Array<any> = [];
        var cars: Array<Cars> = await this.getAllCarObjects();
        for (const car of cars.values()) {
          if (car.matches(term)) results.push(car.toJson());
        }
        return { success: results.length > 0, data: results };
      } catch (error) {
        console.log(error.message);
        return { success: false, data: error.message };
      }
    }
  
    async replaceValuePut(id: string, body: any): Promise<CRUDReturn> {
      try {
        var car: Cars = await Cars.retrieve(id);
        if (car != null) {
          var validBodyPut: { valid: boolean; data: string } =
            Helper.validBodyPut(body);
          if (validBodyPut.valid) {
              var success = car.replaceValues(body);
              if (success)
                return {
                  success: success,
                  data: car.toJson(),
                };
              else {
                throw new Error("Failed to update car in db");
              }
          } else {
            throw new Error(validBodyPut.data);
          }
        } else {
          throw new Error(`car ${id} is not in database`);
        }
      } catch (error) {
        console.log("PutError");
        console.log(error.message);
        return {
          success: false,
          data: error.message,
        };
      }
    }
  
    async replaceValuePatch(id: string, body: any): Promise<CRUDReturn> {
      try {
        var car: Cars = await Cars.retrieve(id);
        if (car != null) {
          var validBodyPatch: { valid: boolean; data: string } =
            Helper.validBody(body);
          if (validBodyPatch.valid) {
            var success = car.replaceValues(body);
            console.log(car.toJson());
            if (success) {
              return {
                success: success,
                data: car.toJson(),
              };
            } else {
              throw new Error("Failed to update car");
            }
          } else {
            throw new Error(validBodyPatch.data);
          }
        } else {
          throw new Error(`car ${id} is not in database`);
        }
      } catch (error) {
        console.log("PatchError");
        console.log(error.message);
        return {
          success: false,
          data: error.message,
        };
      }
    }
  
    async deleteCars(id: string): Promise<CRUDReturn> {
      try {
        var car: Cars = await Cars.retrieve(id);
        if (car != null) {
          var success: boolean = await car.delete();
          return {
            success: success,
            data: `Cars ${id} has been successfully removed`,
          };
        } else
          return {
            success: false,
            data: `Car ${id} is not in database`,
          };
      } catch (error) {
        console.log("DeleteError");
        console.log(error.message);
        return {
          success: false,
          data: error.message,
        };
      }
    }
  
    async logAllCars() {
      console.log(await this.getAll());
    }
}
