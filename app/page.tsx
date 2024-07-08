'use client';
import styles from "./landing.module.scss";
import { BsFillTelephoneFill, BsMailbox2 } from "react-icons/bs";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import { useSpring, animated } from "@react-spring/web";
import { useState, useEffect } from "react";
import Link from "next/link";

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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const inertia = 2;

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX / inertia, y: e.clientY / inertia });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const username = "Kwan Yang";

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
    },
  ];

  return (
    <>
      <div className={styles.main}>
        <section className={styles.welcomeSection}>
          <Marquee>
            {picturePathData.map((path, index) => (
              <PictureCard key={index} path={path} mousePos={mousePos} />
            ))}
          </Marquee>
          <h1 className={`display-large`}>Welcome {username}!</h1>
          <p className={styles.contactInfo}>
            <span className="title-large">
              <BsMailbox2 size={24} className={styles.icon} />
              kwanyang@gmail.com
            </span>
            <span className="title-large">
              <BsFillTelephoneFill size={24} className={styles.icon} />
              6014 1234 3243
            </span>
          </p>
          <div className={styles.planInfo}>
            <div className={styles.planDetails}>
              <span className={`${styles.plan} headline-large`}>Free Plan</span>
              <span className="body-large">Tarotmate subscription plan</span>
            </div>
            <div className={styles.progressBar}>
              <div className={styles.textRow}>
                <span className="title-large">Reading Left</span>
                <span className="title-small">1/2</span>
              </div>
              <LinearProgress variant="determinate" value={0.5} />
              <Button variant="contained" className={styles.button}>
                Upgrade Plan
              </Button>
            </div>
          </div>
          <Button variant="text" className={styles.logout}>
            <Link
              href="/signin"
              style={{ textDecoration: "none", color: "black" }}
            >
              Logout
            </Link>
          </Button>
        </section>
      </div>

      <section className={styles.tarotMateSection}>
        <h2 className={`${styles.tarotMateTitle} display-large`}>TarotMate</h2>
        <p className={`${styles.tarotMateSubtitle} headline-medium`}>
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
              <Button variant="contained" className={styles.planButton}>
                {plan.btnText}
              </Button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
const PictureCard = ({ path, mousePos }) => {
  const calcTransform = (x, y) => [
    (x / window.innerWidth - 0.5) * 30,
    (y / window.innerHeight - 0.5) * 30,
  ];

  const springProps = useSpring({
    transform: `perspective(600px) rotateX(${
      calcTransform(mousePos.x, mousePos.y)[1]
    }deg) rotateY(${calcTransform(mousePos.x, mousePos.y)[0]}deg)`,
    config: { mass: 5, tension: 350, friction: 40 },
  });

  return (
    <div className={styles.pictureCard}>
      <animated.div style={springProps}>
        <Image src={path} alt={path} width={320} height={320} />
      </animated.div>
    </div>
  );
};
