import Button from "@/components/Button";
import Input from "@/components/Input";
import { AuthContext } from "@/providers/AuthProvider";
import { formatInputValidator } from "@/utils/validators";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useContext,
  useState,
} from "react";

const formInitialState = {
  email: {
    value: "",
    isValid: null,
  },
  password: {
    value: "",
    isValid: null,
  },
};

export default function Login() {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState(formInitialState);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const handleFormValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;
    setFormData({
      ...formData,
      [name]: {
        value,
        isValid: formatInputValidator(value, type),
      },
    });
  };
  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login({
      email: formData.email.value,
      password: formData.password.value,
    });
  };

  const changePasswordVisibility = useCallback(() => {
    setPasswordVisible(!passwordVisible);
  }, [passwordVisible]);

  return (
    <div className="flex justify-around items-center p-24 h-svh">
      <div className="h-full flex flex-col">
        <h1 className="text-[40px] font-medium mb-40">Iniciar sesión</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-8">
          <div>
            <label>Correo electrónico</label>
            <Input
              id="email-input"
              value={formData.email.value}
              name="email"
              type="email"
              placeholder="Ej. jemezor@hotmail.com"
              onChange={handleFormValue}
              endicon={formData.email.isValid ? "/images/check.svg" : ""}
            />
          </div>
          <div>
            <label>Password</label>
            <Input
              id="password-input"
              value={formData.password.value}
              name="password"
              type={passwordVisible ? "text" : "password"}
              placeholder="Escribe tu password"
              onChange={handleFormValue}
              endicon={
                passwordVisible ? "/images/eye.svg" : "/images/eye-off.svg"
              }
              changeinputtype={changePasswordVisibility}
            />
            <div className="flex justify-end">
              <span>¿Olvidaste tu contraseña?</span>
            </div>
          </div>
          <Button
            id="login-button"
            type="submit"
            disabled={!(formData.email.isValid && formData.password.isValid)}
            size="large"
          >
            Iniciar sesión
          </Button>
        </form>
      </div>
      <div>
        <img src="/images/money_income.png" alt="income" />
      </div>
    </div>
  );
}
