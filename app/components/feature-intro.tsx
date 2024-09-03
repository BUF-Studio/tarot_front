"use client";

import React from "react";
import styles from "@/app/landing.module.scss";
import Image from "next/image";
import Mockup from "@/public/mockup.png";

export default function FeatureIntro() {
  return (
    <section className={styles.featureSection}>
      <h2
        className={`${styles.tarotMateTitle} display-small`}
        style={{ marginTop: "4rem" }}
      >
        Reading On-The-Go
      </h2>
      <div className={styles.featureContainer}>
        <div className={styles.feature}>
          <h3 className="title-large">Chat from WhatsApp</h3>
          <p className="body-large">
            Request tarot readings directly through WhatsApp. No additional
            application is required.
          </p>
        </div>
        <div className={styles.feature}>
          <h3 className="title-large">AI Model Selection</h3>
          <p className="body-large">
            Choose various AI models for your readings and observe how they
            interpret your cards differently!
          </p>
        </div>
      </div>
      <Image
        src={Mockup}
        alt="Chat with Tarotmate in Whastapp iphone"
        width={window.innerWidth > 768 ? 800 : 400}
      />
    </section>
  );
}
