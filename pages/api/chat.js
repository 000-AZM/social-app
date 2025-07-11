import { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { addDoc, collection, onSnapshot, serverTimestamp } from 'firebase/firestore';

export default function Chat() {
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = collection(db, "messages");
    const unsub = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map(doc => doc.data()));
    });
    return unsub;
  }, []);

  const send = async () => {
    await addDoc(collection(db, "messages"), {
      msg,
      sender: auth.currentUser.email,
      time: serverTimestamp()
    });
    setMsg('');
  };

  return (
    <div>
      <h2>Chat</h2>
      {messages.map((m, i) => (
        <p key={i}><b>{m.sender}</b>: {m.msg}</p>
      ))}
      <input value={msg} onChange={e => setMsg(e.target.value)} />
      <button onClick={send}>Send</button>
    </div>
  );
}
