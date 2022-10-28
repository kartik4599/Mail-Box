import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import InboxPage from "../Indox/InboxPage";

const Inbox = () => {
  const draftemail = useSelector((state) => state.auth.email);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

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
        for (const key in data) {
          const obj = {
            to: data[key].from,
            edit: data[key].edit,
            subject: data[key].subject,
            date: new Date(data[key].data),
          };
          newlist = [obj, ...newlist];
          console.log(newlist);
        }
        setList(newlist);
      }
      setLoading(false);
    };
    getHandller();
  }, [draftemail]);

  return (
    <div>
      <h1>Inbox</h1>
      {loading && <h3>Loading...</h3>}
      {list.length > 0 &&
        list.map((element, index) => {
          return (
            <InboxPage
              key={index}
              to={`From-${element.to}`}
              date={element.date}
              edit={element.edit}
              subject={element.subject}
            />
          );
        })}
      {list.length === 0 && <h3>No Mail Available</h3>}
    </div>
  );
};

export default Inbox;
