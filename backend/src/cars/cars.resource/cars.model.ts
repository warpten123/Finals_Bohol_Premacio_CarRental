import * as admin from "firebase-admin";

import { CRUDReturn } from "./crud_return.interface";
import { Helper } from "./helper";

export class Cars {
  public id: string;
  private name: string;
  private age: number;
  public email: string;

  constructor(
    name: string,
    age: number,
    email: string,
    id?: string
  ) {
    if (id != undefined) {
      this.id = id;
    } else {
      this.id = Helper.generateUID();
    }
    this.name = name;
    this.age = age;
    this.email = email;
  }

  async commit(hidePassword: boolean = true): Promise<CRUDReturn> {
    try {
      var DB = admin.firestore();
      var result = await DB.collection("cars").doc(this.id).set(this.toJson());
      return {
        success: true,
        data: this.toJson(),
      };
    } catch (error) {
      console.log("Car.committ error message");
      console.log(error.message);
      return { success: false, data: error.message, };
    }
  }

  static async retrieve(id: string): Promise<Cars> {
    try {
      var DB = admin.firestore();
      var result = await DB.collection("users").doc(id).get();
      if (result.exists) {
        var data = result.data();
        return new Cars(
          data["name"],
          data["age"],
          data["email"],
          result.id
        );
      } else {
        return null;
      }
    } catch (error) {
      console.log("User.retrieve error");
      console.log(error.message);
      return null;
    }
  }

  async delete(): Promise<boolean> {
    try {
      var DB = admin.firestore();
      await DB.collection("cars").doc(this.id).delete();
      return true;
    } catch (error) {
      console.log("Cars.delete error");
      console.log(error.message);
      return false;
    }
  }
 
  // toJson(): {
  //   id?: string;
  //   name: string;
  //   age: number;
  //   email: string;
  //   password?: string;
  // }


  matches(term: string): boolean {
    var keys: Array<string> = Helper.describeClass(Cars);
    for (const key of keys) {
      if (`${this[key]}` === term) return true;
    }
    return false;
  }

  replaceValues(body: any): boolean {
    try {
      var keys: Array<string> = Helper.describeClass(Cars);
      keys = Helper.removeItemOnce(keys, "id");
      for (const key of Object.keys(body)) {
        this[key] = body[key];
      }
      return true;
    } catch (error) {
      console.log("Cars.replaceValues error");
      console.log(error.message);
      return false;
    }
  }

  log() {
    console.log(this.toJson());
  }
  toJson(): any {
    var keys: Array<string> = Helper.describeClass(Cars);
    var result: any = {};
    for (const key of keys) {
      result[key] = this[key];
    }
    return result;
  }


}