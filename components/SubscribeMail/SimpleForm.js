import MailchimpSubscribe from "react-mailchimp-subscribe";
import { useState } from "react";
import { InputBase, Button } from "@mui/material";
import styles from "../../styles/simpleForm.module.css";
const url =
	"https://cinemadraft.us14.list-manage.com/subscribe/post?u=fcd503faf1285a57eea370664&amp;id=e3718094a2";

// simplest form (only email)
// const SimpleForm = () => <MailchimpSubscribe url={url} />;
const SimpleForm = ({ status, message, onSubmitted }) => {
	const [email, setEmail] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		email &&
			email.indexOf("@") > -1 &&
			onSubmitted({
				EMAIL: email,
			});
	};
	return (
		<form onSubmit={handleSubmit}>
			<div className={styles.formContainer}>
				{status === "sending" && (
					<div style={{ color: "blue", margin: 0, width: "200px" }}>
						sending...
					</div>
				)}
				{status === "error" && (
					<div
						style={{ color: "red", margin: 0 }}
						dangerouslySetInnerHTML={{ __html: message }}
					/>
				)}
				{status === "success" && (
					<div style={{ color: "green", margin: 0, width: "200px" }}>
						Subscribed !
					</div>
				)}
				<InputBase
					label="Email"
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					value={email}
					placeholder="Enter email for CD3D updates from CinemaDraft"
				/>

				<Button
					className={styles.formButton}
					type={"submit"}
					variant="contained">
					Subscribe
				</Button>
			</div>
		</form>
	);
};

export default SimpleForm;
