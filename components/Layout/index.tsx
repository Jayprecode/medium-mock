/* -------------------------------------------------------------------------- */
/*                            External Dependencies                            */
/* -------------------------------------------------------------------------- */
import React from "react";
import styled from "styled-components";
import Head from "next/head";

import Header from "../Header";

const Main = styled.main`
	min-height: 100vh;
`;


interface layoutProps {
	title?: string;
	children?: JSX.Element | JSX.Element[];
}

const Layout: React.FC<layoutProps> = ({ children, title = "Home" }) => {
	return (
		<Main>
			<Head>
				<title>{`Medium – Where good ideas find you. ${title}`}</title>
				<meta name="msapplication-TileColor" content="#FFFFFF" />
				<meta name="theme-color" content="#FFFFFF" />
			</Head>
			<Header />
			{children}
		</Main>
	);
};

export default Layout;
