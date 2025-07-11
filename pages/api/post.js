import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';

export default function Post() {
  const [text, setText] = useState('');
  const createPost = async () => {
    await addDoc(collection(db, "posts"), {
      text,
      author: auth.currentUser.email,
      timestamp: serverTimestamp()
    });
    setText('');
  };
  return (
    <div>
      <textarea value={text} onChange={e => setText(e.target.value)} />
      <button onClick={createPost}>Post</button>
    </div>
  );
}
