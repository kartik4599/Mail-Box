import JoditEditor from "jodit-react";
import { useRef } from "react";
import classes from "./ReadEditor.module.css";

const ReadEditor = (props) => {
  const editRef = useRef();
  const toRef = useRef();
  const subjectRef = useRef();
  console.log(props);

  return (
    <div className={classes.Text}>
      <input ref={toRef} placeholder="To -" value={props.to} />
      <br />
      <input ref={subjectRef} placeholder="Subject -" value={props.subject} />
      <JoditEditor ref={editRef} value={props.edit} />
      <br />
    </div>
  );
};

export default ReadEditor;
