"use client";
import { useSpring, animated } from "@react-spring/web";
import { useState, useEffect } from "react";
import { BsFillTelephoneFill, BsMailbox2 } from "react-icons/bs";
import { MdUpgrade } from "react-icons/md";
import { handleSignOut } from "./lib/aws/cognito";
import { useAuthUser } from "./_hooks/use-auth-user";
import { useRouter } from "next/navigation";
import { toTitleCase } from "./_utils/text-formatter";

import styles from "./landing.module.scss";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const picturePathData = [
  "/balance.png",
  "/candle.png",
  "/eye.png",
  "/hand.png",
  "/hour.png",
  "/logo.png",
  "/moon.png",
  "/snake.png",
  "/sun.png",
  "/sword.png",
  "/tree.png",
  "/wine.png",
];

export default function Home() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();
  const user = useAuthUser();

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const inertia = 2;

  useEffect(() => {
    const handleMouseMove = (e: MousePosition) => {
      setMousePos({ x: e.x / inertia, y: e.y / inertia });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const plan = [
    {
      plan: "Free Plan",
      desc: "Perfect for beginners exploring the world of tarot",
      price: "RM 0 / month",
      features: [
        "1 free reading per week",
        "Access basic card history",
        "Daily card of the day",
        "Limited chat history",
      ],
      btnText: "Start Free",
      btnAction: () => navigateToPayment("free"),
    },
    {
      plan: "Standard Plan",
      desc: "For enthusiasts seeking deeper insights",
      price: "RM 19 / month",
      features: [
        "10 AI-powered readings per month",
        "Full access to card interpretation",
        "Personalized weekly horoscope",
        "Priority WhatsApp support",
      ],
      btnText: "Choose Standard",
      btnAction: () => navigateToPayment("standard"),
    },
    {
      plan: "Pro Plan",
      desc: "For serious tarot practitioners and professionals",
      price: "RM 39 / month",
      features: [
        "Unlimited AI-powered readings",
        "Advanced card interpretation",
        "Custom spread analysis",
        "Monthly live group reading session",
      ],
      btnText: "Go Pro",
      btnAction: () => navigateToPayment("pro"),
    },
  ];

  const handleUserSignOut = async () => {
    await handleSignOut();
    router.push("/signin");
  };

  const navigateToPayment = (plan: string) => {
    router.push(`/payment?plan=${plan}`);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.modalContainer}>
          <MdUpgrade size={48} />
          <span className="headline-medium">Upgrade Plan</span>
          <span className="body-large">Choose a plan that suits you best</span>
          <div className={styles.buttonGroup}>
            <Button
              variant="outlined"
              className={styles.planButton}
              onClick={() => navigateToPayment("standard")}
            >
              Standard Plan
            </Button>
            <Button
              variant="contained"
              className={styles.planButton}
              onClick={() => navigateToPayment("pro")}
            >
              Pro Plan
            </Button>
          </div>
        </Box>
      </Modal>
      <div className={styles.main}>
        <section className={styles.welcomeSection}>
          <Marquee>
            {picturePathData.map((path, index) => (
              <PictureCard key={index} path={path} mousePos={mousePos} />
            ))}
          </Marquee>
          <h1 className={`display-medium`}>
            Welcome {toTitleCase(user?.preferred_username)}!
          </h1>
          <div className={styles.contactInfo}>
            <span className="title-medium">
              <BsMailbox2 size={24} className={styles.icon} />
              {user?.email}
            </span>
            <span className="title-medium">
              <BsFillTelephoneFill size={24} className={styles.icon} />
              {user?.phone_number}
            </span>
          </div>
          <div className={styles.planInfoContainer}>
            <div className={styles.planInfo}>
              <div className={styles.planDetails}>
                <span className={`${styles.plan} headline-medium`}>
                  Free Plan
                </span>
                <span className="body-large">Tarotmate subscription plan</span>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.textRow}>
                  <span className="title-medium">Reading Left</span>
                  <span className="title-medium">1/2</span>
                </div>
                <LinearProgress variant="determinate" value={0.5} />
                <Button
                  variant="contained"
                  className={styles.button}
                  onClick={handleOpen}
                >
                  Upgrade Plan
                </Button>
              </div>
            </div>
          </div>
          <Button
            variant="text"
            className={styles.logout}
            onClick={handleUserSignOut}
          >
            Logout
          </Button>
        </section>
      </div>

      <section className={styles.tarotMateSection}>
        <h2 className={`${styles.tarotMateTitle} display-medium`}>TarotMate</h2>
        <p className={`${styles.tarotMateSubtitle} title-medium`}>
          Your personal AI-Powered Tarot Reading Companion
        </p>
        <div className={styles.plansContainer}>
          {plan.map((plan, index) => (
            <div key={index} className={styles.planCard}>
              <h3 className={`${styles.planTitle} title-large`}>{plan.plan}</h3>
              <h4 className={`${styles.planDesc} title-medium`}>{plan.desc}</h4>
              <ul className={styles.planFeatures}>
                {plan.features.map((feature, index) => (
                  <li key={index} className="body-large">
                    ✨ {feature}
                  </li>
                ))}
              </ul>
              <p className={`${styles.planPrice} headline-small`}>
                {plan.price}
              </p>
              <Button
                variant="contained"
                className={styles.planButton}
                onClick={plan.btnAction}
              >
                {plan.btnText}
              </Button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

type MousePosition = {
  x: number;
  y: number;
};

interface PictureCardProps {
  path: string;
  mousePos: MousePosition;
}

const PictureCard: React.FC<PictureCardProps> = ({ path, mousePos }) => {
  const calcTransform = (x: number, y: number): [number, number] => [
    (x / window.innerWidth - 0.5) * 30,
    (y / window.innerHeight - 0.5) * 30,
  ];

  const springProps = useSpring({
    transform: `perspective(300px) rotateX(${
      calcTransform(mousePos.x, mousePos.y)[1]
    }deg) rotateY(${calcTransform(mousePos.x, mousePos.y)[0]}deg)`,
    config: { mass: 5, tension: 350, friction: 40 },
  });

  return (
    <div className={styles.pictureCard}>
      <animated.div style={springProps}>
        <Image
          src={path}
          alt={path}
          width={window.innerHeight * 0.3}
          height={window.innerHeight * 0.3}
        />
      </animated.div>
    </div>
  );
};
