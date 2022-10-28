import { useState } from "react";
import ReadEditor from "../Read/Read";
import classes from "./Inbox.module.css";

const InboxPage = (props) => {
  const [edit, setEdit] = useState(false);

  const ClickHandler = () => {
    console.log("hi");
    setEdit(!edit);
  };

  return (
    <div>
      <div className={classes.Indox} onClick={ClickHandler}>
        <h3>{props.subject}</h3>
        <p>{props.to}</p>
        <span>
          {`${props.date.getDay()} / ${
            props.date.getMonth() + 1
          } / ${props.date.getFullYear()} `}
          {`(${props.date.getHours()}:${props.date.getMinutes()})`}
        </span>
      </div>
      {edit && (
        <ReadEditor to={props.to} subject={props.subject} edit={props.edit} />
      )}
    </div>
  );
};

export default InboxPage;
