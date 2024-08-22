import Appbar from "../component/Appbar";
import Balance from "../component/Balance";
import { Users } from "../component/User";

function Dashboard() {
  return (
    <div>
      <Appbar />
      <div className="m-8">
        <Balance />
        <Users />
      </div>
    </div>
  );
}

export default Dashboard;
