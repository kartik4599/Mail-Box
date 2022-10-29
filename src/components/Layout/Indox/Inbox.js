import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import InboxPage from "../Indox/InboxPage";

const Inbox = () => {
  const draftemail = useSelector((state) => state.auth.email);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [unRead, setUnRead] = useState(0);

  useEffect(() => {
    const email = draftemail.split("@");
    const getHandller = async () => {
      setLoading(true);
      const res = await fetch(
        `https://expense-tracker-3cb01-default-rtdb.asia-southeast1.firebasedatabase.app/mail/${email[0]}/recive.json`
      );
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        let newlist = [];
        let unRead = 0;
        for (const key in data) {
          if (data[key].isRead) unRead++;
          const obj = {
            to: data[key].from,
            id: key,
            edit: data[key].edit,
            subject: data[key].subject,
            isRead: data[key].isRead,
            date: new Date(data[key].data),
          };
          newlist = [obj, ...newlist];
          console.log(newlist);
        }
        setUnRead(unRead);
        setList(newlist);
      }
      setLoading(false);
    };
    getHandller();
  }, [draftemail]);


  return (
    <div>
      <h1>{`Inbox (${unRead})`} </h1>
      {loading && <h3>Loading...</h3>}
      {list.length > 0 &&
        list.map((element, index) => {
          console.log(element);
          return (
            <InboxPage
              key={index}
              to={`From-${element.to}`}
              date={element.date}
              id={element.id}
              edit={element.edit}
              isRead={element.isRead}
              subject={element.subject}
            />
          );
        })}
      {list.length === 0 && <h3>No Mail Available</h3>}
    </div>
  );
};

export default Inbox;
