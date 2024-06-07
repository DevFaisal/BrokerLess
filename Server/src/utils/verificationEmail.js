import { Resend } from "resend";
import { RESEND_API_KEY } from "../constants.js";
import ejs from "ejs";

const resend = new Resend(RESEND_API_KEY);

const VerificationEmail = async (email, token, name) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "BrokerLess <onboarding@resend.dev>",
      to: "dar36235@gmail.com", //TODO: Change this to email
      subject: "Verify Your Email - BrokerLess",
      html: await ejs.renderFile("public/VerificationEmail.ejs", {
        name,
        token,
      }),
    });

    return { data, error };
  } catch (error) {
    return { error };
  }
};

export default VerificationEmail;
