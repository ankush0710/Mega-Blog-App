import { Client, Account, ID } from "appwrite";
import config from "../../config/config"


// create a class which holds the client and account from appwrite 
class AuthService {
  client= new Client();
  account;

  constructor(){
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.account = new Account.create(this.client);  
  }

  // async method to send the email, password and name to the appwrite
  async createAccount({email, password, name}){
    try{
      const users = await this.account.create(ID.unique(), email, password, name);

      if(users){
        // if user account exists then redirect to login page by calling login method
        return this.login({email, password});
      }
      else{
        return users
      }
    } catch(err){
      console.log("Appwrite service :: createAccount :: error", err);
      throw err;
    }
  }
 
  // async method to call login if user is not exists
  async login({email, password}){
    try{
      return await this.account.createEmailPasswordSession(email, password);

    } catch(err){
      console.log("Appwrite service :: login :: error", err);
      throw err;
    }
  }

  // async func to check whether user is logged-in or not
  async getCurrentUser(){
  try {
    return await this.account.get();
    
  } catch(err){
    console.log("Appwrite service :: getCurrentUser :: error", err);
  }
  return null     // if there is problem in try catch or no user is present -> null

  }
}

// async func for logout

const authService = new AuthService;
export default authService;