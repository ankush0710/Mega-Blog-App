import {Client, Databases, Query, Storage, ID} from "appwrite"
import config from "../../config/config"

class ConfService{
  client = new Client();
  databases;
  bucket;

  constructor(){
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // asyncronous method for creating new post and store it in appwrite storage 
  async createPost({title, slug, content, featuredImage, status, userId}){
    try{
      return await this.databases.createRow(
        config.appwriteDatabaseId,      //database id
        config.appwriteCollectionId,    // collection id
        slug,                           // unique slug -> makes URL cleaner
        {
          title,
          content,
          featuredImage,
          status,
          userId
        }                             // object consist all fields which we required
      )
    }catch(err){
      console.log("Appwrite conf :: createPost :: error", err);
      throw err;
    }
  }

  // async function for update the created post
  async updatePost(slug, {title, content, featuredImage, status}){
    try{
      return await this.databases.updateRow(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );

    }catch(err){
      console.log("Appwrite conf :: updatePost :: error", err);
      throw err;
    }
  }

  //async function to delete the post
  async deletePost(slug){
    try{
      return await this.databases.deleteRow(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
      );

    }catch(err){
      console.log("Appwrite conf :: deletePost :: error", err);
      return false
    }
  }

  //async function to get the one post
  async getPost(slug){
    try{
      return await this.databases.getRow(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
      )
      

    }catch(err){
      console.log("Appwrite conf :: getPost :: error", err);
      throw err
    }
  }

  //async function to get only active posts
  async getActivePosts(queries = [Query.equal("status", "active")]){
    try{
      return await this.databases.listRow(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries,
      )
    }catch(err){
      console.log("Appwrite conf :: getPost :: error", err);
      throw err
    }
  }

  // service for uploading, deleting files 
  // async function for file upload 
  async uploadFile(file){
    try{
        return await this.bucket.createFile(
          config.appwriteBucketId,
          ID.unique(),
          file,
        )

    }catch(err){
      console.log("Appwrite conf :: uploadFile :: error", err);
      throw err
    }
  }

   // async function for file upload 
   async deleteFile(fileId){
    try{
        await this.bucket.deleteFile(
        config.appwriteBucketId,
        fileId
      )
      return true

    }catch(err){
      console.log("Appwrite conf :: deleteFile :: error", err);
      return false
    }
   }

   // function for getting the preview of file
   getFilePreview(fileId){
    return this.bucket.getFilePreview(
      config.appwriteBucketId,
      fileId,
    )
   }


}

const confService = new ConfService;

export default confService