import axios from "axios";
import { useState } from "react";
import BottomWarning from "../component/Bottomwarning";
import Button from "../component/Button";
import Heading from "../component/Heading";
import InputBox from "../component/InputBox";
import SubHeading from "../component/SubHeading";

export function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label="Sign up" />
          <SubHeading label="Enter your information to create an account" />
          <InputBox
            onChange={(e) => setFirstName(e.target.value)}
            label="First Name"
            placeholder="Awais"
          />
          <InputBox
            onChange={(e) => setLastName(e.target.value)}
            label="Last Name"
            placeholder="Khan"
          />
          <InputBox
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            placeholder="abc@gmail.com"
          />
          <InputBox
            onChange={(e) => setPassword(e.target.value)}
            label="password"
            placeholder="123456"
          />
          <div className="pt-4">
            <Button
              onClick={async () => {
                const res = await axios.post(
                  "http://localhost:3000/api/v1/user/signup",
                  {
                    username: email,
                    firstName,
                    lastName,
                    password,
                  }
                );
                localStorage.setItem("token", res.data.token);
              }}
              label={"Sign up"}
            />
          </div>
          <BottomWarning
            label="Already have an account?"
            linkText="Sign in"
            to="/signin"
          />
        </div>
      </div>
    </div>
  );
}

export default Signup;
