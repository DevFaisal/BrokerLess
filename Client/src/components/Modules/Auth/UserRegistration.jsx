import React from "react";
import { useForm } from "react-hook-form";
import { LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { Button, Container, FooterLinks, FormInput } from "../../Index";

function UserRegistration() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
    },
  });
  const onSubmit = async (data) => {
    setLoading(true);
    const response = await axios
      .post(`${import.meta.env.VITE_LOCALHOST}/auth/user/register`, data)
      .then((res) => {
        setLoading(false);
        toast.success(res.data.message);
        navigate("/auth/login-user");
        return res;
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data.message);
        return error;
      });
  };
  const Inputs = [
    {
      label: "Full Name",
      type: "text",
      name: "name",
      placeholder: "Enter your full name",
      required: true,
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      placeholder: "Enter your email address",
      required: true,
    },
    {
      label: "Phone Number",
      type: "tel",
      name: "phone",
      placeholder: "Enter your phone number",
      required: true,
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      placeholder: "Enter your password",
      required: true,
    },
  ];
  const FooterLink = [
    {
      text: "Already have an account?",
      link: "/auth/login-user",
      linkText: "Login",
    },
    {
      text: "Are you a landlord?",
      link: "/auth/register-landlord",
      linkText: "Register as a landlord",
    },
  ];
  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col  w-auto  gap-3">
          <FormInput
            Inputs={Inputs}
            register={register}
            errors={errors}
            Heading={"User Registration"}
            Subheading={"Sign up to get started with us"}
          />
          <Button
            className={"flex justify-center w-full mt-5 "}
            onClick={handleSubmit(onSubmit)}
            disabled={loading}
          >
            {loading ? (
              <LoaderCircle size={20} className="text-white animate-spin" />
            ) : (
              "Register"
            )}
          </Button>
          <FooterLinks Links={FooterLink} />
        </div>
      </form>
    </Container>
  );
}

export default UserRegistration;
