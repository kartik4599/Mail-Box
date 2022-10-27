import TextEditor from "../TextEditor/TextEditor";
import classes from "./Home.module.css";
const Home = () => {
  return (
    <div className={classes.home}>
      <h1>Home Page</h1>
      <TextEditor/>
    </div>
  );
};

export default Home;
