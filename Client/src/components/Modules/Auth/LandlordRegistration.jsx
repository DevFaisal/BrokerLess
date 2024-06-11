import React from "react";
import { useForm } from "react-hook-form";
import { Button, Container, FooterLinks, FormInput } from "../../Index";
import Validation from "../../../utils/Validation";
import toast from "react-hot-toast";
import axios from "axios";
import { LoaderCircle } from "lucide-react";

function LandLordRegistration() {
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
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
  });
  const onSubmit = async (data) => {
    const { error } = Validation.landlordRegistration(data);
    if (error) {
      return toast.error(error.errors[0].message);
    }
    setLoading(true);
    const response = await axios
      .post(`${import.meta.env.VITE_LOCALHOST}/auth/Landlord/register`, data)
      .then((res) => {
        toast.success(res.data.message);
        return res;
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data.message);
        return error;
      })
      .finally(() => {
        setLoading(false);
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
      label: "Password",
      type: "password",
      name: "password",
      placeholder: "Enter your password",
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
      label: "Street Address",
      type: "text",
      name: "street",
      placeholder: "Enter your street address",
      required: true,
    },
    {
      label: "City",
      type: "text",
      name: "city",
      placeholder: "Enter your city",
      required: true,
    },
    {
      label: "State",
      type: "text",
      name: "state",
      placeholder: "Enter your state",
      required: true,
    },
    {
      label: "Zip Code",
      type: "text",
      name: "zip",
      placeholder: "Enter your zip code",
      required: true,
    },
    {
      label: "Country",
      type: "text",
      name: "country",
      placeholder: "Enter your country",
      required: true,
    },
  ];

  const FooterLink = [
    {
      text: "Already have an account?",
      link: "/auth/login-landlord",
      linkText: "Login",
    },
  ];
  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          Inputs={Inputs}
          register={register}
          errors={errors}
          className={"grid grid-cols-2 gap-2  "}
          Heading={"Landlord Registration"}
          Subheading={"Register as landlord"}
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
      </form>
    </Container>
  );
}

export default LandLordRegistration;
