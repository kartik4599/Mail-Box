import { useState } from "react";
import { useSelector } from "react-redux";
import ReadEditor from "../Read/Read";
import classes from "./Inbox.module.css";

const InboxPage = (props) => {
  const [edit, setEdit] = useState(false);
  const [isRead, setRead] = useState(props.isRead);
  console.log(props);
  const Auth = useSelector((state) => state.auth);
  const email = Auth.email.split("@");

  const ClickHandler = async () => {
    setEdit(!edit);
    setRead(false);
    const res = await fetch(
      `https://expense-tracker-3cb01-default-rtdb.asia-southeast1.firebasedatabase.app/mail/${email[0]}/recive/${props.id}.json`,
      {
        method: "PUT",
        body: JSON.stringify({
          data: props.date,
          edit: props.edit,
          from: props.to,
          isRead: false,
          subject: props.subject,
        }),
      }
    );
    if (res.ok) {
      console.log("DOne");
      console.log(
        `https://expense-tracker-3cb01-default-rtdb.asia-southeast1.firebasedatabase.app/mail/${email[0]}/recive/${props.id}.json`
      );
    }

    console.log(props.id);
  };

  return (
    <div>
      <div className={classes.Indox} onClick={ClickHandler}>
        {isRead && <div className={classes.dot}>.</div>}
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
        <div>
          <ReadEditor to={props.to} subject={props.subject} edit={props.edit} />
          <p id="para"></p>
        </div>
      )}
    </div>
  );
};

export default InboxPage;
