import React, {useCallback, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {Button, Input, RTE, Select} from "..";
import confService from '../../appwrite/conf/conf'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PostForm({posts}) {
  const {register, handleSubmit, watch, setValue, control, getValue} = useForm({
    defaultValues: {
      title: posts?.title || '',
      slug: posts ?.slug || '',
      content: posts?.content || '',
      status: posts?.status || 'active',
    },
  });

  const navigate = useNavigate();
  const userData = useSelector(state => state.auth.data);
  const submit = async(data) =>{
    if(posts){
      const file = data.image[0] ? await confService.uploadFile(data.image[0]) : null;
      if(file){
        confService.deleteFile(posts.featuredImage);
      }
      const dbPost = await confService.updatePost(posts.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if(dbPost){
        navigate(`{/posts/dbPost.$id}`);
      }
      else{
        const file = await confService.uploadFile(file.image[0]);

        if(file){
          const fileId = file.$id;
          data.featuredImage = fileId;
          const dbPost = confService.createPost({...data, userId: userData.$id});

          if(dbPost){
            navigate(`{/post/${dbPost.$id}`);
          }
        }
      }
    }
  }
  
  const slugTransform = useCallback((value) => {
      if(value && typeof value === 'string'){
        return value.trim().toLowerCase().replace(/[^a-zA-Z\d]+/g, '-');

      }
      return "";
    }, []);

  useEffect(() => {
      const subscription = watch((value, {name})=>{
        if(name === 'title'){
          setValue("slug", slugTransform(value.title), {shouldValidate: true});
        }
      });

      return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

  return (
    <form>
      <div>
        <Input
          label="Title"
          placeholder="Title"
          className="mb-4"
          {...register("title", {required:true})}

          />
           <Input
          label="Slug"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", {required:true})}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {shouldValidate:true});
          }}
          />
          <RTE label="Content: " name="content" content={control} defaultValue={getValue("content")}/>
      </div>
       <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !posts })}
                />
                {posts && (
                    <div className="w-full mb-4">
                        <img
                            src={confService.getFilePreview(posts.featuredImage)}
                            alt={posts.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={posts ? "bg-green-500" : undefined} className="w-full">
                    {posts ? "Update" : "Submit"}
                </Button>
            </div>
    </form>
  )
}
