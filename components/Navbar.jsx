import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { css } from "@emotion/css";

function Navbar() {
	const [isAboutActive, setIsAboutActive] = useState(false);
	const [isHomeActive, setIsHomeActive] = useState(false);

	const router = useRouter();

	console.log("router", router.pathname);

	const activeHome = () => {
		setIsAboutActive(false);
		setIsHomeActive(true);
	};
	const activeAbout = () => {
		setIsAboutActive(true);
		setIsHomeActive(false);
	};

	const spinAndMove =
		router.pathname == "/about" && `translate(290px) rotate(360deg)`;

	return (
		<div className={styles.container}>
			<Link href="/" onClick={activeHome}>
				<div className={styles.vinylCase}>
					<Image
						className={styles.vinylCoverHome}
						src="/cover4.webp"
						height={90}
						width={90}
						alt="cover1"
					/>

					<div
						className={css`
							position: absolute;
							z-index: 1;
							bottom: 5px;
							left: 5px;

							width: 80px;
							height: 80px;
							transform: ${spinAndMove};
							transition: all 1s ease-in-out;
						`}
					>
						<Image
							src="/disc.png"
							height={80}
							width={80}
							alt="vinyl"
							// className={styles.vinyl}
						/>
					</div>
					<div className={styles.vinylCaseTxt}>
						<span>HOME</span>
					</div>
				</div>
			</Link>

			<Link href="/about" onClick={activeAbout}>
				<div className={styles.vinylCase}>
					<Image
						className={styles.vinylCoverAbout}
						src="/cover5.webp"
						height={90}
						width={90}
						alt="cover2"
					/>

					<div className={styles.vinyl}>
						<Image
							src="/disc.png"
							height={80}
							width={80}
							alt="vinyl"
						/>
					</div>
					<div className={styles.vinylCaseTxt}>
						<span>ABOUT</span>
					</div>
				</div>
			</Link>
		</div>
	);
}

export default Navbar;
