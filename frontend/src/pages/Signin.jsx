import BottomWarning from "../component/Bottomwarning";
import Button from "../component/Button";
import Heading from "../component/Heading";
import InputBox from "../component/InputBox";
import SubHeading from "../component/SubHeading";

function Signin() {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label="Sign In" />
          <SubHeading label="Enter your credentials to access your account" />
          <InputBox label="Email" placeholder="abc@gmail.com" />
          <InputBox label="password" placeholder="123456" />
          <div className="pt-4">
            <Button label={"Sign In"} />
          </div>
          <BottomWarning
            label="Already have an account?"
            linkText="Sign Up"
            to="/signUp"
          />
        </div>
      </div>
    </div>
  );
}

export default Signin;
