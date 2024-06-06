import React from "react";
import { useForm } from "react-hook-form";
import { Button, Container, FooterLinks, FormInput } from "../../Index";



function LandLordRegistration() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      phone_number: "",
      street_address: "",
      city: "",
      state: "",
      zip_code: "",
      country: "",
    },
  });
  const onSubmit = (data) => {
    console.log(data);
  };
  const Inputs = [
    {
      label: "Full Name",
      type: "text",
      name: "full_name",
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
      name: "phone_number",
      placeholder: "Enter your phone number",
      required: true,
    },
    {
      label: "Street Address",
      type: "text",
      name: "street_address",
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
      name: "zip_code",
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
          className={"grid grid-cols-2 gap-2"}
          Heading={"Landlord Registration"}
          Subheading={"Register as landlord"}
        />
        <Button onClick={handleSubmit(onSubmit)}>Sign Up</Button>
        <FooterLinks Links={FooterLink} />
      </form>
    </Container>
  );
}

export default LandLordRegistration;
