import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import InboxPage from "../Indox/InboxPage";

const Sent = () => {
  const draftemail = useSelector((state) => state.auth.email);

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const email = draftemail.split("@");

    const getHandller = async () => {
      setLoading(true);
      const res = await fetch(
        `https://expense-tracker-3cb01-default-rtdb.asia-southeast1.firebasedatabase.app/mail/${email[0]}/send.json`
      );
      if (res.ok) {
        const data = await res.json();
        let newlist = [];
        for (const key in data) {
          const obj = {
            to: data[key].to,
            edit: data[key].edit,
            id: key,
            subject: data[key].subject,
            date: new Date(data[key].date),
          };
          newlist = [obj, ...newlist];
        }
        setList(newlist);
      }
      setLoading(false);
    };
    getHandller();
  }, [draftemail]);

  const deleteHandler = async (id) => {
    const email = draftemail.split("@");
    const res = await fetch(
      `https://expense-tracker-3cb01-default-rtdb.asia-southeast1.firebasedatabase.app/mail/${email[0]}/send/${id}.json`,
      {
        method: "DELETE",
      }
    );
    console.log(await res.json());
  };

  return (
    <div>
      <h1>Sent</h1>
      {loading && <h3>Loading...</h3>}
      {list.length > 0 &&
        list.map((element, index) => {
          return (
            <InboxPage
              key={index}
              to={`To-${element.to}`}
              date={element.date}
              isRead={false}
              delete={deleteHandler.bind(null, element.id)}
              edit={element.edit}
              subject={element.subject}
            />
          );
        })}
      {list.length === 0 && <h3>No Mail Available</h3>}
    </div>
  );
};

export default Sent;
