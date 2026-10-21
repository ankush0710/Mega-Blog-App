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
      throw new err;
    }
  }

  // async method to call login if user is not exists
  async login({email, password}){
    try{
      return await this.account.creatEmailSession(email, password);

    } catch(err){
      throw new err
    }
  }
}

const authService = new AuthService;
export default authService;