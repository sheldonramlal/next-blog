"use client";

import { updatePost } from "@/src/lib/actions";
import { useState } from "react";

interface EditPostFormProps {
  post: {
    id: string;
    title: string;
    content: string;
    imageUrl: string | null;
  };
}



export default function EditPostForm({ post }: EditPostFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  async function handleSubmit(formData: FormData){
    formData.append("postId", post.id);
    await updatePost(formData);
  }

  return (
    <div className="mt-20 px-5">
      <form action={handleSubmit}>
        
        {/* <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"> */}
            <div className="sm:col-span-4">
              <label htmlFor="title" className="block text-sm/6 font-medium text-gray-900">
                Title
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Blog Title"
                    defaultValue={post.title}
                    required
                    className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4 mt-10">
              <label htmlFor="title" className="block text-sm/6 font-medium text-gray-900">
                Blog Content
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <textarea
                    id="content"
                    name="content"
                    placeholder="Blog Content"
                    required
                    defaultValue={post.content}
                    rows={15}
                    className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full mt-10">
              <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900">
                Cover photo
              </label>

              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  {/* <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" /> */}
                  <div className="mt-4 flex text-sm/6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-600 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-600 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                        {post.imageUrl && (
                            <img
                            src={post.imageUrl}
                            alt="Current image"
                            className="w-full max-h-64 object-cover rounded"
                            />
                        )}
                      <input id="file-upload" name="image" type="file" accept="image/*" className="sr-only" 
                       onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          setSelectedFile(file);
                        }}/>
                        
                        {selectedFile && (
                        <p className="text-sm text-gray-600">
                          Selected image: <strong>{selectedFile.name}</strong>
                        </p>
                      )}
                    </label>
                    
                  </div>
                  <p className="text-xs/5 text-gray-600">PNG, JPG, up to 5MB</p>
                </div>
              </div>
            </div>

        

        <button type="submit" className="bg-[#2E60FA] px-5 py-2 text-white font-medium mt-10 mb-10 rounded-md cursor-pointer w-full md:w-auto">
          Update
        </button>
      </form>
    </div>
  );
}
