import { Resend } from "resend";
import { RESEND_API_KEY } from "../constants.js";
import ejs from "ejs";

const resend = new Resend(RESEND_API_KEY);

const resetPasswordEmail = async (email, token, name) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "BrokerLess <onboarding@resend.dev>",
      to: "dar36235@gmail.com", //TODO: Change this to email
      subject: "Forgot Password - BrokerLess",
      html: await ejs.renderFile("public/resetPasswordEmail.ejs", {
        name,
        token,
      }),
    });
    // const res = await resend.emails.get(data.id);
    // if (res.error) {
    //   return { error: res.error };
    // }

    return { data, error };
  } catch (error) {
    return { error };
  }
};

export default resetPasswordEmail;
