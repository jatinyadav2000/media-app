import { 
    addDoc, 
    collection, 
    query, 
    where, 
    getDocs,
    deleteDoc,
    doc,
    getDoc, 
} from "firebase/firestore";
import { database, auth } from "../../configuration/firebase";
import { Post as Mypost} from "./home"
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface Props {
    post: Mypost;
}

interface Like {
    likeId: string;
    userId: string;
}

export const Post = (props: Props) => {
    const { post } = props;
    const [user] = useAuthState(auth);

    const [likes, setLikes] = useState<Like[] | null>(null);

    const likesReference = collection( database, "likes");

    const likesDoc = query(likesReference, where("postId", "==", post.id))

    const getLikes = async () =>{
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map((doc) => ({userId: doc.data().userId, likeId:doc.id})));
    }

    const addLike = async () =>{
        try{
            const newDoc = await addDoc(likesReference, {
                
                postId: post.id,
                userId: user?.uid,
            });

            if (user){
                setLikes((prev) => 
                    prev 
                        ? [...prev, {userId: user?.uid, likeId: newDoc.id }]
                        : [{ userId: user?.uid, likeId: newDoc.id}]);
            }
        } catch(err){
            console.log(err);
        }
    };

    const removeLike = async () =>{
        try{
            const dislikequery = query(
                likesReference, 
                where("postId", "==", post.id,),
                where("userId", "==", user?.uid,)
            );

            const dislikedata = await getDocs(dislikequery);
            const likeId = dislikedata.docs[0].id;
            const dislike = doc(database, "likes", likeId);

            await deleteDoc(dislike);

            if (user){
                setLikes((prev) => prev && prev.filter((like) => like.likeId !== likeId));
            }
        } catch(err){
            console.log(err);
        }
    };

    const hasUserLiked = likes?.find((like) => like.userId === user?.uid)

    useEffect(() => {
        getLikes();
    }, []);

    return (
        <div className="post">
            <div className="title">
                <h1> {post.title}</h1>
            </div>

            <div className="body">
                <p> {post.description} </p>
            </div>

            <div className="footer">
                <p> @{post.username} </p>
                <button onClick={hasUserLiked ? removeLike : addLike}> 
                    {hasUserLiked ? <>&#128078;</> : <>&#128077;</>} 
                </button>
                { likes && <p>Likes : {likes?.length}</p> }
            </div>
        </div>
    );
}