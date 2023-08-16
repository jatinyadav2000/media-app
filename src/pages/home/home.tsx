import {  getDocs, collection } from "firebase/firestore"
import { database } from "../../configuration/firebase";
import { useEffect, useState } from "react";
import { Post } from "./post";

export interface Post{
    id: string;
    userId: string;
    username: string;
    description: string;
    title: string;
}

export const Home = () =>{

    const [postsList, setPostsList] = useState<Post[] | null>(null);
    const postsreference = collection(database, "posts");

    const getPosts = async () =>{
        const data = await getDocs(postsreference);
        setPostsList (
            data.docs.map((doc) => ({...doc.data(), id: doc.id })) as Post[]
        );
    };

    useEffect( () => {
        getPosts();
    }, []);

    return <div className="displaypost">{postsList?.map((post) => (
        <Post post={post}/>
    ))}</div>
};