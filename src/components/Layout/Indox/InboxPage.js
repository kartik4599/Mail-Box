import { useState } from "react";
import ReadEditor from "../Read/Read";
import classes from "./Inbox.module.css";

const InboxPage = (props) => {
  const [edit, setEdit] = useState(false);
  const [isRead, setRead] = useState(props.isRead);

  const ClickHandler = async () => {
    setEdit(!edit);
    if (isRead) {
      props.decrement();
    }
    setRead(false);
    props.change();
  };

  return (
    <div id={props.id}>
      <div className={classes.Indox}>
        {isRead && (
          <div className={classes.dot} onClick={ClickHandler}>
            .
          </div>
        )}
        <h3 onClick={ClickHandler}>{props.subject}</h3>
        <p onClick={ClickHandler}>{props.to}</p>
        <span onClick={ClickHandler}>
          {`${props.date.getDay()} / ${
            props.date.getMonth() + 1
          } / ${props.date.getFullYear()} `}
          {`(${props.date.getHours()}:${props.date.getMinutes()})`}
        </span>
        <button onClick={props.delete}>Delete</button>
      </div>
      {edit && (
        <div>
          <ReadEditor to={props.to} subject={props.subject} edit={props.edit} />
          <p id="para"></p>
        </div>
      )}
    </div>
  );
};

export default InboxPage;
