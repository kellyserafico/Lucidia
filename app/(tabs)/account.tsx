import React from "react";

const AccountPage: React.FC = () => {
	return (
		<div style={{ padding: 24 }}>
			<h1>Account</h1>
			<section>
				<h2>Profile</h2>
				<p>Name: John Doe</p>
				<p>Email: johndoe@email.com</p>
			</section>
			<section>
				<h2>Settings</h2>
				<button>Change Password</button>
				<button>Logout</button>
			</section>
		</div>
	);
};

export default AccountPage;
