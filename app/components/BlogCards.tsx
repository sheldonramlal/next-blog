import { User } from "better-auth";
import Link from "next/link";
import Image from "next/image";

interface BlogCardProps {
    title: string;
    slug: string;
    name: string;
    imageUrl: string | null;
}

export default function BlogCard({ title, slug, name, imageUrl }: BlogCardProps) {

    const newtitle = title.length > 20 ? title.substring(0, 20) + "..." : title;
    return (
         <Link 
            href={`/blogs/${slug}`}
            key={slug}
            className="bg-gray-500 rounded-xl h-96 w-full  md:w-70 outline-1 outline-gray-300">
              
              <div className="flex flex-col justify-end w-full h-full ">
                    {/* image */}
                    
                        {imageUrl && (
                        <Image
                        src={imageUrl}
                        alt={title}
                        
                        width={400}
                        height={300}
                        className="cover rounded-t-xl overflow-hidden w-full object-cover"
                        />
                    )}

                    
                    <div className="flex flex-col bg-white space-y-2 w-full p-4 rounded-b-xl">
                        <h3 className="text-2xl  font-medium">{newtitle}</h3>
                        <p className="text-gray-600 text-sm">{name}</p>
                    </div>
                </div>
             
          </Link>
    )
}