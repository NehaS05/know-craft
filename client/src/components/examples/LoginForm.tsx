import LoginForm from "../LoginForm";

export default function LoginFormExample() {
  return (
    <LoginForm
      onLogin={(username, password, userType) =>
        console.log("Login:", { username, password, userType })
      }
    />
  );
}
