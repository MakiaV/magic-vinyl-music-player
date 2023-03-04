import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { useRouter } from "next/router";

function Navbar() {
	const router = useRouter();

	const spinAndMove =
		router.pathname == "/about" && `translate(290px) rotate(360deg)`;

	return (
		<div className={styles.container}>
			<Link href="/">
				<div className={styles.vinylCase}>
					<Image
						className={styles.vinylCoverHome}
						src="/home.webp"
						height={90}
						width={90}
						alt="home"
					/>

					<div
						className={styles.vinyl}
						style={{ transform: spinAndMove }}
					>
						<Image
							src="/disc.png"
							height={80}
							width={80}
							alt="vinyl"
						/>
					</div>
					<div className={styles.vinylCaseTxt}>
						<span>VINYL</span>
					</div>
				</div>
			</Link>

			<Link href="/about">
				<div className={styles.vinylCase}>
					<Image
						className={styles.vinylCoverAbout}
						src="/about.webp"
						height={90}
						width={90}
						alt="about"
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
