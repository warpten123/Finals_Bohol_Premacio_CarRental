import * as admin from "firebase-admin";

import { CRUDReturn } from "./admin.resource/crud_return.interface";
import { Helper } from "./admin.resource/helper";
import { Injectable } from "@nestjs/common";
import { Admin } from "./admin.resource/admin.model";
import { auth } from "firebase-admin";

const DEBUG: boolean = true;
@Injectable()
export class AdminService {
  private DB = admin.firestore();
  private AUTH: auth.Auth = admin.auth();
  constructor() {}

  // advanced version
  async resetDatabase(): Promise<boolean> {
    try {
      var currentDbState = await this.DB.collection("admins").get();
      if (currentDbState.empty) return true;
      else {
        var batchOps: Array<Promise<any>> = [];
        for (const doc of currentDbState.docs) {
          batchOps.push(doc.ref.delete());
        }
        //running all delete in one go;
        await Promise.all(batchOps);
        for (const admin of Helper.populate().values()) {
          batchOps.push(this.saveToDB(admin));
        }
        //runs all the create in one go;
        await Promise.all(batchOps);
        return true;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  //the slowed down version
  //running the await in a for loop allows it to behave properly in await mode
  //running it in a forEach does not operate as expected to wait for each await before moving on
  async resetDatabaseBasic(): Promise<boolean> {
    try {
      var currentDbState = await this.DB.collection("admins").get();
      if (currentDbState.empty) return true;
      else {
        for (const doc of currentDbState.docs) {
          await doc.ref.delete();
        }
        for (const admin of Helper.populate().values()) {
          await this.saveToDB(admin);
        }
        return true;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async register(body: any): Promise<CRUDReturn> {
    try {
      var validBody: { valid: boolean; data: string } =
        Helper.validBodyPut(body);
      if (validBody.valid) {
        var exists = await this.emailExists(body.email);
        console.log(`Does ${body.email} exist in db? ${exists}`);
        if (!exists) {
          //create the Firebase Auth admin
          var authCreationResult: auth.UserRecord;
          try {
            authCreationResult = await this.AUTH.createUser({
              email: body.email,
              password: body.password,
            });
          } catch (error) {
            throw error;
          }
          //create the Firestore Database entry for the admin if it is successful
          var newAdmin: Admin = new Admin(
            body.name,
            body.age,
            authCreationResult.email,
            authCreationResult.uid
          );
          if (await this.saveToDB(newAdmin)) {
            return {
              success: true,
              data: newAdmin.toJson(),
            };
          } else {
            throw new Error("generic database error");
          }
        } else
          throw new Error(`${body.email} is already in use by another admin!`);
      } else {
        throw new Error(validBody.data);
      }
    } catch (error) {
      console.log("RegisterError");
      console.log(error.message);
      return { success: false, data: `Error adding account, ${error}` };
    }
  }

  async getOne(id: string): Promise<CRUDReturn> {
    try {
      var result = await this.DB.collection("admins").doc(id).get();
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
          data: `Admin ${id} does not exist in database!`,
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
      var allAdmins = await this.getAllAdminObjects();
      allAdmins.forEach((admin) => {
        results.push(admin.toJson(true));
      });
      return { success: true, data: results };
    } catch (e) {
      return { success: false, data: e };
    }
  }

  async getAllAdminObjects(): Promise<Array<Admin>> {
    var results: Array<Admin> = [];
    try {
      var dbData: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData> =
        await this.DB.collection("admins").get();
      dbData.forEach((doc) => {
        if (doc.exists) {
          var data = doc.data();
          results.push(
            new Admin(data["name"], data["age"], data["email"], doc.id)
          );
        }
      });
      return results;
    } catch (e) {
      return null;
    }
  }

  async searchAdmin(term: string): Promise<CRUDReturn> {
    try {
      var results: Array<any> = [];
      var admins: Array<Admin> = await this.getAllAdminObjects();
      for (const admin of admins.values()) {
        if (admin.matches(term)) results.push(admin.toJson());
      }
      return { success: results.length > 0, data: results };
    } catch (error) {
      console.log(error.message);
      return { success: false, data: error.message };
    }
  }

  async replaceValuePut(id: string, body: any): Promise<CRUDReturn> {
    try {
      var admin: Admin = await Admin.retrieve(id);
      if (admin != null) {
        var validBodyPut: { valid: boolean; data: string } =
          Helper.validBodyPut(body);
        if (validBodyPut.valid) {
          var exists = await this.emailExists(body.email, { exceptionId: id });
          if (!exists) {
            var success = admin.replaceValues(body);
            await admin.commit(false);
            if (success)
              return {
                success: success,
                data: admin.toJson(),
              };
            else {
              throw new Error("Failed to update admin in db");
            }
          } else {
            throw new Error(`${body.email} is already in use by another admin!`);
          }
        } else {
          throw new Error(validBodyPut.data);
        }
      } else {
        throw new Error(`Admin ${id} is not in database`);
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
      var admin: Admin = await Admin.retrieve(id);
      if (admin != null) {
        var validBodyPatch: { valid: boolean; data: string } =
          Helper.validBody(body);
        if (validBodyPatch.valid) {
          if (body.email != undefined) {
            var exists = await this.emailExists(body.email, {
              exceptionId: id,
            });
            if (exists) {
              throw new Error(
                `${body.email} is already in use by another admin!`
              );
            }
          }
          var success = admin.replaceValues(body);
          console.log(admin.toJson(false));
          await admin.commit(false);
          if (success) {
            return {
              success: success,
              data: admin.toJson(),
            };
          } else {
            throw new Error("Failed to update admin");
          }
        } else {
          throw new Error(validBodyPatch.data);
        }
      } else {
        throw new Error(`Admin ${id} is not in database`);
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

  async deleteAdmin(id: string): Promise<CRUDReturn> {
    try {
      var admin: Admin = await Admin.retrieve(id);
      if (admin != null) {
        var success: boolean = await admin.delete();
        return {
          success: success,
          data: `Admin ${id} has been successfully removed`,
        };
      } else
        return {
          success: false,
          data: `Admin ${id} is not in database`,
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

  //secondary functions
  async emailExists(
    email: string,
    options?: { exceptionId: string }
  ): Promise<boolean> {
    try {
      var adminResults = await this.DB.collection("admins")
        .where("email", "==", email)
        .get();
      console.log("Are the admin results empty?");
      console.log(adminResults.empty);
      if (adminResults.empty) return false;
      for (const doc of adminResults.docs) {
        console.log(doc.data());
        console.log("Are the options defined?");
        console.log(options != undefined);
        if (options != undefined) {
          if (doc.id == options?.exceptionId) continue;
        }
        if (doc.data()["email"] === email) {
          return true;
        } else {
          return false;
        }
      }
      return false;
    } catch (error) {
      console.log("Email exists subfunction error");
      console.log(error.message);
      return false;
    }
  }

  async saveToDB(admin: Admin): Promise<boolean> {
    console.log(`Attempting to save admin ${admin.id} ${admin.email}`);
    try {
      var result = await admin.commit(false);
      return result.success;
    } catch (error) {
      console.log("Save to db error");
      console.log(error.message);
      return false;
    }
  }

  async logAllAdmins() {
    console.log(await this.getAll());
  }
}