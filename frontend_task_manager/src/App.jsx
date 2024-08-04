import { useSelector } from "react-redux";
import Header from "./components/Header";
import ListTasks from "./components/ListTasks";
import Form from "./components/Form";
import Loader from "./components/Loader";
import Notification from "./components/Notification";

function App() {
  const { form, loader } = useSelector((state) => state.task);
  return (
    <>
      <Header />
      <ListTasks />
      {form?.active && <Form />}
      {loader && <Loader />}
      <Notification />
    </>
  );
}

export default App;
