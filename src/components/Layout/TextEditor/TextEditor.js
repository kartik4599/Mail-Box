import JoditEditor from "jodit-react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import classes from "./TextEditor.module.css";

const TextEditor = () => {
  const draftemail = useSelector((state) => state.auth.email);
  const email=draftemail.split('@');
  console.log(email);
  const editorRef = useRef();
  const toRef = useRef();
  const subjectRef = useRef();
  const editorHandler = async () => {
    const obj = {
      to: toRef.current.value,
      subject: subjectRef.current.value,
      edit: editorRef.current.value,
    };
    const res = await fetch(
      `https://expense-tracker-3cb01-default-rtdb.asia-southeast1.firebasedatabase.app/mail/${email[0]}/send.json`,
      {
        method: "Post",
        body: JSON.stringify(obj),
      }
    );
    if (res.ok) {
      alert("Email has been send");
    }
  };

  return (
    <div className={classes.Text}>
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
