import { Client, Account, ID } from "appwrite";
import config from "../../config/config"


// create a class which holds the client and account from appwrite 
class AuthService {
  client= new Client();
  account;

  constructor({email, passowrd, name}){
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.account = new Account.create(this.client);  
  }
}

const authService = new AuthService;
export default authService;