import MailchimpSubscribe from "react-mailchimp-subscribe";
import SimpleForm from "./SimpleForm";
const url =
  "https://cinemadraft.us14.list-manage.com/subscribe/post?u=fcd503faf1285a57eea370664&amp;id=e3718094a2";

const CustomForm = () => (
  <MailchimpSubscribe
    url={url}
    render={({ subscribe, status, message }) => (
      <SimpleForm
        status={status}
        message={message}
        onSubmitted={(formData) => subscribe(formData)}
      />
    )}
  />
);

export default CustomForm;
