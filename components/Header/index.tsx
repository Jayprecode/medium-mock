import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { Logo } from "../Icons";

const Header = () => {
	return (
		<HeaderContainer>
			<div className="sbs">
				<div className="logo">
					<Link href="/">
						<a>
							<Logo />
						</a>
					</Link>
				</div>
				<div className="nav-links">
					<h3>Our Story</h3>
					<h3>Membership</h3>
					<h3>Write</h3>
					<h3>Sign In</h3>
					<h3 className="btn">Get started</h3>
				</div>
			</div>
		</HeaderContainer>
	);
};

const HeaderContainer = styled.div`
	width: 100%;
	border-bottom: solid 1px rgba(41, 41, 41, 1);
	background: #ffc017;
	display: flex;
	justify-content: center;
	align-items: center;
	position: sticky;
	z-index: 10;
	top: 0;
	.sbs {
		display: flex;
		justify-content: space-between;
		align-items: center;
		min-width: 0;
		max-width: 1192px;
		width: 100%;
		height: 75px;
		padding: 25px 0;
		@media (min-width: 1080px) {
			margin: 0 64px;
		}
		@media (max-width: 1080px) {
			margin: 0 24px;
		}
		.logo {
			cursor: pointer;
			.bo {
				height: 25px;
			}
		}
		.nav-links {
			display: flex;
			align-items: center;
			gap: 1.5rem;
			h3 {
				color: rgba(41, 41, 41, 1);
				line-height: 20px;
				font-size: 14px;
				font-family: sohne, "Helvetica Neue", Helvetica, Arial,
					sans-serif;
				font-weight: 400;
				margin: 0;
				cursor: pointer;
				@media (max-width: 768px) {
					&:nth-child(1),
					&:nth-child(2),
					&:nth-child(3) {
						display: none;
					}
				}
				@media (max-width: 580px) {
					&:nth-child(4) {
						display: none;
					}
				}
			}
			.btn {
				background: rgba(25, 25, 25, 1);
				border: 1px solid rgba(25, 25, 25, 1);
				padding: 7px 16px 9px;
				color: rgba(255, 255, 255, 1);
				line-height: 20px;
				font-size: 14px;
				overflow: visible;
				border-radius: 99em;
			}
		}
	}
`;

export default Header;
