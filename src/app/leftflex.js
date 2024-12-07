"use client";

import Image from "next/image";

import React, { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import InfiniteTextRotation from "./scrolltrigger";
import mediumZoom from "medium-zoom";

function Section({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref}>
      <span
        style={{
          transform: isInView ? "translateX(0)" : "translateY(100px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
        }}
      >
        {children}
      </span>
    </section>
  );
}
function Paragraph({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref}>
      <p
        style={{
          transform: isInView ? "translateX(0)" : "translateX(100px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
        }}
      >
        {children}
      </p>
    </section>
  );
}
function Paragraphneg({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref}>
      <p
        style={{
          transform: isInView ? "translateX(0)" : "translateX(100px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
        }}
      >
        {children}
      </p>
    </section>
  );
}

export default function Leftflex() {
  const [showText, setShowText] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isTab, setIsTab] = useState(false);

  const sectionRefs = {
    proj1: useRef(null),
    proj2: useRef(null),
    proj3: useRef(null),
    profile: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    contact: useRef(null),
  };
  const scrollToSection = (section) => {
    sectionRefs[section].current.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };
  useEffect(() => {
    // Initialize medium-zoom once on all images with the "zoomable" class
    const zoom = mediumZoom(".zoomable");

    // Optional: Add event listeners, e.g., detaching zoom on close
    zoom.on("closed", () => {
      console.log("Zoom closed");
    });

    return () => {
      // Clean up zoom instance when the component unmounts
      zoom.detach();
    };
  }, [isMobile]);

  const containerVariants = {};

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(window.innerWidth <= 768);
        setIsTab(false);
      } else setIsMobile(false);
      setIsTab(window.innerWidth <= 1024);
      console.log(isTab);
    };

    // Check initially
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    console.log("button clicked");
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="flex justify-evenly text-black text-lg navbar ">
        {isMobile ? (
          <>
            <button className="hamburger" onClick={toggleMenu}>
              <Image
                src="/menus.png" // Update with the path to your image
                alt="Menu Icon"
                width={35} // Specify the width of the image
                height={35} // Specify the height of the image
              />
            </button>
            {isMenuOpen && (
              <div className="mobileham">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="menu-item"
                >
                  <div
                    className="py-2"
                    onClick={() => scrollToSection("profile")}
                  >
                    Profile
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="menu-item"
                >
                  <div
                    className="py-2"
                    onClick={() => scrollToSection("skills")}
                  >
                    {" "}
                    Skills
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="menu-item"
                >
                  <div
                    className="py-2"
                    onClick={() => scrollToSection("projects")}
                  >
                    Projects
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="menu-item"
                >
                  <div
                    className="py-2"
                    onClick={() => scrollToSection("contact")}
                  >
                    Contact
                  </div>
                </motion.div>
              </div>
            )}
          </>
        ) : (
          <>
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              initial={{ opacity: 0, y: 50 }} // Start with opacity 0 and translate -100px on the x-axis
              animate={{ opacity: 1, y: 0 }} // End with opacity 1 and translate to 0 on the x-axis
              transition={{ duration: 0.5, delay: 0 }}
            >
              <div
                className="navbar-button"
                onClick={() => scrollToSection("profile")}
              >
                Profile
              </div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              initial={{ opacity: 0, y: 50 }} // Start with opacity 0 and translate -100px on the x-axis
              animate={{ opacity: 1, y: 0 }} // End with opacity 1 and translate to 0 on the x-axis
              transition={{ duration: 0.5, delay: 0 }}
            >
              <div
                className="navbar-button"
                onClick={() => scrollToSection("skills")}
              >
                {" "}
                Skills
              </div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              initial={{ opacity: 0, y: 50 }} // Start with opacity 0 and translate -100px on the x-axis
              animate={{ opacity: 1, y: 0 }} // End with opacity 1 and translate to 0 on the x-axis
              transition={{ duration: 0.5, delay: 0 }}
            >
              <div
                className="navbar-button"
                onClick={() => scrollToSection("projects")}
              >
                Projects
              </div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              initial={{ opacity: 0, y: 50 }} // Start with opacity 0 and translate -100px on the x-axis
              animate={{ opacity: 1, y: 0 }} // End with opacity 1 and translate to 0 on the x-axis
              transition={{ duration: 0.5, delay: 0 }}
            >
              <div
                className="navbar-button"
                onClick={() => scrollToSection("contact")}
              >
                Contact
              </div>
            </motion.div>
          </>
        )}
      </div>

      <div className="landing">
        {isMobile || isTab ? (
          <>
            <Image
              src="/final4.png" // Update with the path to your image
              alt="Description"
              width={700} // Specify the width of the image
              height={300} // Specify the height of the image
              className="centeredImage"
            />

            <InfiniteTextRotation />
            <motion.div
              initial={{ opacity: 0, y: -100 }} // Start with opacity 0 and translate -100px on the x-axis
              animate={{ opacity: 1, y: 0 }} // End with opacity 1 and translate to 0 on the x-axis
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <h4 className="job">
                <Image
                  src="/down-right.png" // Update with the path to your image
                  alt="Description"
                  width={20} // Specify the width of the image
                  height={20} // Specify the height of the image
                  className="arrow"
                />
                Software <br></br>
                Designer & Developer
              </h4>
            </motion.div>
            <motion.div
              className="globe"
              variants={containerVariants}
              initial="initial"
              whileHover="hover"

              // onMouseLeave={() => setShowText(false)}
            >
              <motion.div
                initial={{ opacity: 1 }}
                variants={{
                  hover: { rotate: 180, opacity: 0.5 }, // Rotate 360° when parent is hovered
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <Image
                  src="/global.png" // Update with the path to your image
                  alt="Description"
                  width={isMobile ? 35 : 60} // Specify the width of the image
                  height={isMobile ? 35 : 60} // Specify the height of the image
                  // className="arrow"
                />
              </motion.div>
              {showText && (
                <p
                  style={{
                    margin: "0.5em",
                    color: "#707070",
                  }}
                >
                  Based in <br></br>
                  Hyderabad
                </p>
              )}
            </motion.div>
          </>
        ) : (
          <>
            <Image
              src="/final3.png" // Update with the path to your image
              alt="Description"
              width={550} // Specify the width of the image
              height={300} // Specify the height of the image
              className="centeredImage"
            />

            <InfiniteTextRotation />
            <motion.div
              initial={{ opacity: 0, y: -100 }} // Start with opacity 0 and translate -100px on the x-axis
              animate={{ opacity: 1, y: 0 }} // End with opacity 1 and translate to 0 on the x-axis
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <h4 className="job">
                <Image
                  src="/down-right.png" // Update with the path to your image
                  alt="Description"
                  width={20} // Specify the width of the image
                  height={20} // Specify the height of the image
                  className="arrow"
                />
                Software <br></br>
                Designer & Developer
              </h4>
            </motion.div>
            <motion.div
              className="globe"
              variants={containerVariants}
              initial="initial"
              whileHover="hover"
            >
              <motion.div
                initial={{ opacity: 1 }}
                variants={{
                  hover: { rotate: 180, opacity: 0.5 }, // Rotate 360° when parent is hovered
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <Image
                  src="/global.png" // Update with the path to your image
                  alt="Description"
                  width={50} // Specify the width of the image
                  height={50} // Specify the height of the image
                  // className="arrow"
                />
              </motion.div>
              {showText && (
                <p
                  style={{
                    margin: "0.5em",
                    color: "#707070",
                  }}
                >
                  Based in <br></br>
                  Hyderabad
                </p>
              )}
            </motion.div>
          </>
        )}
      </div>

      <div ref={sectionRefs.profile} className="aboutme">
        <h1 className="h1heading">Profile</h1>
        <div className="profile">
          <div className="profilediv">
            <div className="profiledivdiv">
              <Image
                src="/me2.png" // Update with the path to your image
                alt="Description"
                width={244} // Specify the width of the image
                height={364} // Specify the height of the image
                className="meimage"
              />
              <p className="profilep2">Jatin Dahiya</p>
              <motion.p
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
                className="profilep light"
              >
                I'm a results-oriented software developer who is always eager to
                learn and grow.
              </motion.p>
            </div>
          </div>
          <div className="info">
            <div className="flexit">
              <p className="italics">Education</p>
              <motion.p
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeInOut", delay: 0.3 }}
              >
                <span>
                  The LNM Institute of Information Technology&nbsp;&nbsp;
                </span>
                <span className="small">&nbsp;Jaipur, India</span>
                <br />
                <span className="small">
                  Bachelor of Technology (Computer Science and Technology)
                </span>
              </motion.p>
              <p>
                <span className="small padd">2019 - 2023</span>
              </p>
            </div>
            <Image
              src="/Line 1.png" // Update with the path to your image
              alt="Description"
              width={1000} // Specify the width of the image
              height={2} // Specify the height of the image
              className="line"
            />
            <div className="flexit">
              <p className="italics">Language</p>
              <motion.p
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeInOut", delay: 0.3 }}
              >
                <span>Hindi&nbsp;&nbsp;</span>
                <span className="small">
                  Native&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
                <span>English&nbsp;&nbsp;</span>
                <span className="small">Professional working proficiency</span>
              </motion.p>
            </div>
            <Image
              src="/Line 1.png" // Update with the path to your image
              alt="Description"
              width={1000} // Specify the width of the image
              height={2} // Specify the height of the image
              className="line"
            />
            <div className="flexit">
              <p className="italics">Experience</p>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeInOut", delay: 0.3 }}
                className="full"
              >
                <div className="flexit">
                  <div>
                    <span>• Systems Engineer</span>
                    <span className="small">
                      <br />
                      &nbsp;&nbsp;&nbsp;TCS, Hyderabad, India
                    </span>
                  </div>
                  <div className="small padd">2023.12 - Present</div>
                </div>
                <br />
                <div className="flexit">
                  <div>
                    <span>• Systems Developer Intern</span>
                    <span className="small">
                      <br />
                      &nbsp;&nbsp;&nbsp;Atthah Info Media Pvt. Ltd., Gurugram,
                      India
                    </span>
                  </div>
                  <div className="small padd">2022.06 - 2022.08</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <div ref={sectionRefs.skills} className="Skills">
        <h1 className="h1heading">Skills</h1>
        <div className="skillsimg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }}>
              <div className="cont">
                <Image
                  src="/java.png"
                  alt="Description"
                  width={200}
                  height={200}
                />
                <p>JAVA</p>
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }}>
              <div className="cont">
                <Image
                  src="/js.png"
                  alt="Description"
                  width={200}
                  height={200}
                />
                <p>JAVA SCRIPT</p>
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }}>
              <div className="cont">
                <Image
                  src="/html.png"
                  alt="Description"
                  width={200}
                  height={200}
                />
                <p>HTML</p>
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }}>
              <div className="cont">
                <Image
                  src="/css.png"
                  alt="Description"
                  width={200}
                  height={200}
                />
                <p>CSS</p>
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }}>
              <div className="cont">
                <Image
                  src="/react.png"
                  alt="Description"
                  width={200}
                  height={200}
                />
                <p>REACT JS</p>
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }}>
              <div className="cont">
                <Image
                  src="/next.png"
                  alt="Description"
                  width={200}
                  height={200}
                />
                <p>NEXT JS</p>
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }}>
              <div className="cont">
                <Image
                  src="/unity.webp"
                  alt="Description"
                  width={200}
                  height={200}
                />
                <p>UNITY 3D</p>
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }}>
              <div className="cont">
                <Image
                  src="/python.png"
                  alt="Description"
                  width={200}
                  height={200}
                />
                <p>PYTHON</p>
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }}>
              <div className="cont">
                <Image
                  src="/pytorch.webp"
                  alt="Description"
                  width={200}
                  height={200}
                />
                <p>PYTORCH</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div ref={sectionRefs.projects} className="Projects">
        <h1 className="h1heading">Projects</h1>
        <div className="projectsdiv">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 0.3 }}
            className="projectsdivdiv"
          >
            <p>01</p>
            <Image
              src="/Stag.png" // Update with the path to your image
              alt="Description"
              width={100} // Specify the width of the image
              height={364} // Specify the height of the image
              className="projimage"
              onClick={() => scrollToSection("proj1")}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 0.3 }}
            className="projectsdivdiv1"
          >
            <p>02</p>
            <Image
              src="/mycart.png" // Update with the path to your image
              alt="Description"
              width={100} // Specify the width of the image
              height={100} // Specify the height of the image
              className="projimage"
              onClick={() => scrollToSection("proj2")}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 0.3 }}
            className="projectsdivdiv"
          >
            <p>03</p>
            <Image
              src="/moneypot.png" // Update with the path to your image
              alt="Description"
              width={100} // Specify the width of the image
              height={364} // Specify the height of the image
              className="projimage"
              onClick={() => scrollToSection("proj3")}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 0.3 }}
            className="projectsdivdiv1"
          >
            <p>04</p>
            <Image
              src="/one (4).jpeg" // Update with the path to your image
              alt="Description"
              width={100} // Specify the width of the image
              height={100} // Specify the height of the image
              className="projimage"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 0.3 }}
            className="projectsdivdiv"
          >
            <p>05</p>
            <Image
              src="/one (5).jpeg" // Update with the path to your image
              alt="Description"
              width={100} // Specify the width of the image
              height={364} // Specify the height of the image
              className="projimage"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 0.3 }}
            className="projectsdivdiv1"
          >
            <p>06</p>
            <Image
              src="/one (6).jpeg" // Update with the path to your image
              alt="Description"
              width={100} // Specify the width of the image
              height={100} // Specify the height of the image
              className="projimage"
            />
          </motion.div>
        </div>
      </div>
      <div ref={sectionRefs.proj1} className="Projectheading">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 0.3 }}
          className="projectheadingdiv"
        >
          <p className="number">01</p>
          <p className="name">Stag</p>
        </motion.div>
        <div className="projectheadingdiv2">
          <Image
            src="/icon.png" // Update with the path to your image
            alt="Description"
            width={400} // Specify the width of the image
            height={400} // Specify the height of the image
            className="headimg"
          />
        </div>
      </div>
      <div className="aboutme">
        <h1 className="h1heading">Summary</h1>
        <div className={isMobile || isTab ? "summarydivmobil" : "summarydiv"}>
          {isMobile || isTab ? (
            <>
              <div className="summarydiv summarycenter">
                <div>
                  <Image
                    src="/stagimg (1).png" // Update with the path to your image
                    alt="Description"
                    width={100} // Specify the width of the image
                    height={364} // Specify the height of the image
                    className="summaryimg zoomable"
                    style={{ cursor: "zoom-in" }}
                  />
                  <Image
                    src="/stagimg (4).png" // Update with the path to your image
                    alt="Description"
                    width={100} // Specify the width of the image
                    height={364} // Specify the height of the image
                    className="summaryimg zoomable"
                    style={{ cursor: "zoom-in" }}
                  />
                </div>
                <div className="summarypad">
                  <Image
                    src="/stagimg (2).png" // Update with the path to your image
                    alt="Description"
                    width={100} // Specify the width of the image
                    height={364} // Specify the height of the image
                    className="summaryimg zoomable"
                    style={{ cursor: "zoom-in" }}
                  />
                  <Image
                    src="/stagimg (3).png" // Update with the path to your image
                    alt="Description"
                    width={200} // Specify the width of the image
                    height={364} // Specify the height of the image
                    className="summaryimg zoomable"
                    style={{ cursor: "zoom-in" }}
                  />
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
          <div>
            <p className="profilep light small setmargin">
              Stag is a desktop application built with Electron.js to help you
              organize all your reference images in one place. Whether you are a
              designer, artist, or creative professional, Stag streamlines your
              workflow by combining powerful tools for managing and analyzing
              your images. When paired with the Stag Chrome Extension, the app
              offers enhanced functionality, including the ability to download
              images from the web by simply dragging and dropping them. Stag is
              the ultimate solution for managing visual references efficiently
              and creatively.
              <h2>Features</h2>
              <ul>
                <li>
                  <b>Organized Image Library: </b>
                  Store, view, and manage all your reference images in one
                  centralized location.
                </li>
                <li>
                  <b>Drag & Drop Image Download: </b>
                  Easily download images directly from your browser using the
                  Stag Chrome Extension. Drag and drop images from web pages
                  into the app for seamless importing.
                </li>
                <li>
                  <b>Color Palette Extraction: </b>
                  Automatically generate a color palette for each image, helping
                  you explore and utilize the key colors of your references.
                </li>
                <li>
                  <b>EXIF Data Display: </b>
                  View metadata (EXIF data) for each image, such as camera
                  settings, date taken, and more.
                </li>
              </ul>
            </p>
            <a
              href="https://github.com/jatindahiya027/Stag"
              target="_blank"
              className="setmargin center"
            >
              <Image alt="github" src="/github.png" width={30} height={30} />
              Code
            </a>
            <div className="techstack setmargin">
              <p>Electron js</p>
              <p>JavaScript</p>
              <p>Nodejs</p>
              <p>CSS</p>
              <p>HTML</p>
            </div>
          </div>
          {isMobile || isTab ? (
            <></>
          ) : (
            <>
              <div className="summarydiv summarycenter">
                <div className="zoom">
                  <Image
                    src="/stagimg (1).png" // Update with the path to your image
                    alt="Description"
                    width={100} // Specify the width of the image
                    height={364} // Specify the height of the image
                    className="summaryimg zoomable"
                    style={{ cursor: "zoom-in" }}
                  />
                  <Image
                    src="/stagimg (4).png" // Update with the path to your image
                    alt="Description"
                    width={100} // Specify the width of the image
                    height={364} // Specify the height of the image
                    className="summaryimg zoomable "
                    style={{ cursor: "zoom-in" }}
                  />
                </div>
                <div className="summarypad zoom">
                  <Image
                    src="/stagimg (2).png" // Update with the path to your image
                    alt="Description"
                    width={100} // Specify the width of the image
                    height={364} // Specify the height of the image
                    className="summaryimg zoomable"
                    style={{ cursor: "zoom-in" }}
                  />
                  <Image
                    src="/stagimg (3).png" // Update with the path to your image
                    alt="Description"
                    width={200} // Specify the width of the image
                    height={364} // Specify the height of the image
                    className="summaryimg zoomable "
                    style={{ cursor: "zoom-in" }}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div ref={sectionRefs.proj2} className="Projectheading">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 0.3 }}
          className="projectheadingdiv"
        >
          <p className="number">02</p>
          <p className="name">MyCart</p>
        </motion.div>
        <div className="projectheadingdiv2">
          <Image
            src="/mycart1.png" // Update with the path to your image
            alt="Description"
            width={400} // Specify the width of the image
            height={400} // Specify the height of the image
            className="headimg"
          />
        </div>
      </div>
      <div className="aboutme">
        <h1 className="h1heading">Summary</h1>
        <div className={isMobile || isTab ? "summarydivmobil" : "summarydiv"}>
          {isMobile || isTab ? (
            <>
              <div className="summarydiv summarycenter">
                <div>
                  <Image
                    src="/mycart (1).png" // Update with the path to your image
                    alt="Description"
                    width={100} // Specify the width of the image
                    height={364} // Specify the height of the image
                    className="summaryimg zoomable"
                    style={{ cursor: "zoom-in" }}
                  />
                  <Image
                    src="/mycart (3).png" // Update with the path to your image
                    alt="Description"
                    width={100} // Specify the width of the image
                    height={364} // Specify the height of the image
                    className="summaryimg zoomable"
                    style={{ cursor: "zoom-in" }}
                  />
                </div>
                <div className="summarypad">
                  <Image
                    src="/mycart (4).png" // Update with the path to your image
                    alt="Description"
                    width={100} // Specify the width of the image
                    height={364} // Specify the height of the image
                    className="summaryimg zoomable"
                    style={{ cursor: "zoom-in" }}
                  />
                  <Image
                    src="/mycart (2).png" // Update with the path to your image
                    alt="Description"
                    width={200} // Specify the width of the image
                    height={364} // Specify the height of the image
                    className="summaryimg zoomable"
                    style={{ cursor: "zoom-in" }}
                  />
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
          <div>
            <p className="profilep light small setmargin">
              MyCart is a Next.js application designed to help you keep track of
              pricing data for products across multiple e-commerce platforms. By
              scraping prices from Flipkart, Amazon, Zara, Converse, TataCliq,
              Ajio, Myntra, and Adidas, MyCart enables you to monitor the price
              trends of your favorite items in one place. Get frequent update on
              Mail when the prices are at its lowest.
              <h2>Features</h2>
              <ul>
                <li>
                  <b>Scrape Prices:</b> Fetch the latest pricing data from
                  Flipkart, Amazon, Zara, Converse, TataCliq, Ajio, Myntra, and
                  Adidas.
                </li>
                <li>
                  <b>Track Trends:</b> Compare high and low prices for products
                  over time.
                </li>
                <li>
                  <b>Sort & Filter:</b> Sort items by relevance, price, or date
                  added.
                </li>
              </ul>
            </p>
            <a
              href="https://github.com/jatindahiya027/MyCart"
              target="_blank"
              className="setmargin center"
            >
              <Image alt="github" src="/github.png" width={30} height={30} />
              Code
            </a>
            <div className="techstack setmargin">
              <p>Nextjs</p>
              <p>Reactjs</p>
              <p>javascript</p>
              <p>Shadcn/graph</p>
              <p>CSS</p>
              <p>HTML</p>
              <p>SQLite</p>
            </div>
          </div>
          {isMobile || isTab ? (
            <></>
          ) : (
            <>
              <div className="summarydiv summarycenter">
                <div className="zoom">
                  <Image
                    src="/mycart (1).png" // Update with the path to your image
                    alt="Description"
                    width={100} // Specify the width of the image
                    height={364} // Specify the height of the image
                    className="summaryimg zoomable"
                    style={{ cursor: "zoom-in" }}
                  />
                  <Image
                    src="/mycart (3).png" // Update with the path to your image
                    alt="Description"
                    width={100} // Specify the width of the image
                    height={364} // Specify the height of the image
                    className="summaryimg zoomable "
                    style={{ cursor: "zoom-in" }}
                  />
                </div>
                <div className="summarypad zoom">
                  <Image
                    src="/mycart (4).png" // Update with the path to your image
                    alt="Description"
                    width={100} // Specify the width of the image
                    height={364} // Specify the height of the image
                    className="summaryimg zoomable"
                    style={{ cursor: "zoom-in" }}
                  />
                  <Image
                    src="/mycart (2).png" // Update with the path to your image
                    alt="Description"
                    width={200} // Specify the width of the image
                    height={364} // Specify the height of the image
                    className="summaryimg zoomable "
                    style={{ cursor: "zoom-in" }}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div ref={sectionRefs.proj3} className="Projectheading">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 0.3 }}
          className="projectheadingdiv"
        >
          <p className="number">03</p>
          <p className="name">MoneyPot</p>
        </motion.div>
        <div className="projectheadingdiv2">
          <Image
            src="/moneypot1.png" // Update with the path to your image
            alt="Description"
            width={400} // Specify the width of the image
            height={400} // Specify the height of the image
            className="headimg"
          />
        </div>
      </div>
      <div className="aboutme">
        <h1 className="h1heading">Summary</h1>

        <div className={isMobile || isTab ? "summarydivmobil" : "summarydiv"}>
          {isMobile || isTab ? (
            <>
              <div className="summarydiv summarycenter">
                <div>
                  <Image
                    src="/img (1).png" // Update with the path to your image
                    alt="Description"
                    width={100} // Specify the width of the image
                    height={364} // Specify the height of the image
                    className="summaryimg zoomable"
                    style={{ cursor: "zoom-in" }}
                  />
                  <Image
                    src="/img (3).png" // Update with the path to your image
                    alt="Description"
                    width={100} // Specify the width of the image
                    height={364} // Specify the height of the image
                    className="summaryimg zoomable"
                    style={{ cursor: "zoom-in" }}
                  />
                </div>
                <div className="summarypad">
                  <Image
                    src="/img (4).png" // Update with the path to your image
                    alt="Description"
                    width={100} // Specify the width of the image
                    height={364} // Specify the height of the image
                    className="summaryimg zoomable"
                    style={{ cursor: "zoom-in" }}
                  />
                  <Image
                    src="/img (5).png" // Update with the path to your image
                    alt="Description"
                    width={200} // Specify the width of the image
                    height={364} // Specify the height of the image
                    className="summaryimg zoomable"
                    style={{ cursor: "zoom-in" }}
                  />
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
          <div>
            <p className="profilep light small setmargin">
              MoneyPot is a sleek and user-friendly personal finance tracker
              built with Next.js. It helps you manage your expenses, track
              transactions, and analyze spending patterns efficiently. MoneyPot
              features powerful APIs to summarize your financial data and
              utilizes SQLite as its backend database.
              <h2>Features</h2>
              <ul>
                <li>
                  <b>Dashboard Overview:</b> Get a quick insight into your total
                  credits, debits, and savings.
                </li>
                <li>
                  <b>Transaction Tracking:</b> Record, edit, and delete
                  transactions across multiple categories.
                </li>
                <li>
                  <b>Category Management: </b>Create and organize custom
                  categories for better classification of your finances.
                </li>
                <li>
                  <b>Spending Analysis:</b> Visualize your spending trends
                  through charts and graphs.
                </li>
                <li>
                  <b>AI Insights:</b> Get summarized and actionable insights
                  using GROQ APIs.
                </li>
                <li>
                  <b>Dark Theme:</b> Minimalistic and intuitive dark UI for a
                  great user experience.
                </li>
              </ul>
            </p>

            <a
              href="https://github.com/jatindahiya027/MoneyPot"
              target="_blank"
              className="setmargin center"
            >
              <Image alt="github" src="/github.png" width={30} height={30} />
              Code
            </a>

            <div className="techstack setmargin">
              <p>Nextjs</p>
              <p>Reactjs</p>
              <p>javascript</p>
              <p>Shadcn/graph</p>
              <p>CSS</p>
              <p>HTML</p>
              <p>SQLite</p>
              <p>JWT</p>
            </div>
          </div>
          {isMobile || isTab ? (
            <></>
          ) : (
            <>
              <div className="summarydiv summarycenter">
                <div className="zoom">
                  <Image
                    src="/img (1).png" // Update with the path to your image
                    alt="Description"
                    width={100} // Specify the width of the image
                    height={364} // Specify the height of the image
                    className="summaryimg zoomable"
                    style={{ cursor: "zoom-in" }}
                  />
                  <Image
                    src="/img (3).png" // Update with the path to your image
                    alt="Description"
                    width={100} // Specify the width of the image
                    height={364} // Specify the height of the image
                    className="summaryimg zoomable "
                    style={{ cursor: "zoom-in" }}
                  />
                </div>
                <div className="summarypad zoom">
                  <Image
                    src="/img (4).png" // Update with the path to your image
                    alt="Description"
                    width={100} // Specify the width of the image
                    height={364} // Specify the height of the image
                    className="summaryimg zoomable"
                    style={{ cursor: "zoom-in" }}
                  />
                  <Image
                    src="/img (5).png" // Update with the path to your image
                    alt="Description"
                    width={200} // Specify the width of the image
                    height={364} // Specify the height of the image
                    className="summaryimg zoomable "
                    style={{ cursor: "zoom-in" }}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div ref={sectionRefs.contact} className="contacts">
        <h1 className="h1heading">Let's Work Together</h1>
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSc5mwlcNWzN1yNWksNeEmVcl6bReCRBx_vx6oyicGOywJMt2w/viewform?embedded=true"
          width="764"
          height="600"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
          className="frame"
        >
          Loading…
        </iframe>
      </div>
    </>
  );
}
