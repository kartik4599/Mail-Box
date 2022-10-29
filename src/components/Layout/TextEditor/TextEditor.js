import JoditEditor from "jodit-react";
import { useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import classes from "./TextEditor.module.css";

const TextEditor = () => {
  const draftemail = useSelector((state) => state.auth.email);
  const email = draftemail.split("@");
  const editorRef = useRef();
  const toRef = useRef();
  const subjectRef = useRef();
  const [loading, setLoading] = useState(false);

  const editorHandler = async () => {
    setLoading(true);
    const sendEmail = toRef.current.value.split("@");
    const res = await fetch(
      `https://expense-tracker-3cb01-default-rtdb.asia-southeast1.firebasedatabase.app/mail/${email[0]}/send.json`,
      {
        method: "Post",
        body: JSON.stringify({
          to: toRef.current.value,
          subject: subjectRef.current.value,
          edit: editorRef.current.value,
          date: new Date(),
        }),
      }
    );

    const ret = await fetch(
      `https://expense-tracker-3cb01-default-rtdb.asia-southeast1.firebasedatabase.app/mail/${sendEmail[0]}/recive.json`,
      {
        method: "Post",
        body: JSON.stringify({
          from: draftemail,
          subject: subjectRef.current.value,
          edit: editorRef.current.value,
          data: new Date(),
          isRead:true
        }),
      }
    );

    if (res.ok && ret.ok) {
      alert("Email has been send");
    }
    setLoading(false);
  };

  return (
    <div className={classes.Text}>
      {loading && <h3>Sending...</h3>}
      <input ref={toRef} placeholder="To -" />
      <br />
      <input ref={subjectRef} placeholder="Subject -" />
      <JoditEditor ref={editorRef} />
      <br />
      <div className={classes.send}>
        <button onClick={editorHandler}>Send</button>
      </div>
    </div>
  );
};

export default TextEditor;
