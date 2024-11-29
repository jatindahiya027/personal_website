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
  };
  const scrollToSection = (section) => {
    sectionRefs[section].current.scrollIntoView({ behavior: "smooth" });
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
      if(window.innerWidth <= 768){
      setIsMobile(window.innerWidth <= 768);
      setIsTab(false);
    }
    else
      setIsMobile(false)
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
                  <div className="py-2">Profile</div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="menu-item"
                >
                  <div className="py-2">Technology</div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="menu-item"
                >
                  <div className="py-2">Projects</div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="menu-item"
                >
                  <div className="py-2">Contact</div>
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
              <div className="navbar-button">Profile</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              initial={{ opacity: 0, y: 50 }} // Start with opacity 0 and translate -100px on the x-axis
              animate={{ opacity: 1, y: 0 }} // End with opacity 1 and translate to 0 on the x-axis
              transition={{ duration: 0.5, delay: 0 }}
            >
              <div className="navbar-button">Technology</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              initial={{ opacity: 0, y: 50 }} // Start with opacity 0 and translate -100px on the x-axis
              animate={{ opacity: 1, y: 0 }} // End with opacity 1 and translate to 0 on the x-axis
              transition={{ duration: 0.5, delay: 0 }}
            >
              <div className="navbar-button">Projects</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              initial={{ opacity: 0, y: 50 }} // Start with opacity 0 and translate -100px on the x-axis
              animate={{ opacity: 1, y: 0 }} // End with opacity 1 and translate to 0 on the x-axis
              transition={{ duration: 0.5, delay: 0 }}
            >
              <div className="navbar-button">Contact</div>
            </motion.div>
          </>
        )}
      </div>

      <div className="landing">
        {isMobile||isTab ? (
          <>
            <Image
              src="/final2.png" // Update with the path to your image
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
                  width={isMobile?35:60} // Specify the width of the image
                  height={isMobile?35:60} // Specify the height of the image
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
                  Hyderabad
                </p>
              )}
            </motion.div>
          </>
        ) :  (
          <>
            <Image
              src="/final.png" // Update with the path to your image
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
                  Hyderabad
                </p>
              )}
            </motion.div>
          </>
        )
        }
      </div>

      <div className="aboutme">
        <h1 className="h1heading">Profile</h1>
        <div className="profile">
          <div className="profilediv">
            <div className="profiledivdiv">
              <Image
                src="/me.png" // Update with the path to your image
                alt="Description"
                width={244} // Specify the width of the image
                height={364} // Specify the height of the image
                className="meimage"
              />
              <p className="profilep2">Jatin Dahiya</p>
              <p className="profilep light">
                I'm a results-oriented software developer who is always eager to
                learn and grow.
              </p>
            </div>
          </div>
          <div className="info">
            <div className="flexit">
              <p className="italics">Education</p>
              <p>
                <span>
                  The LNM Institute of Information Technology&nbsp;&nbsp;
                </span>
                <span className="small">&nbsp;Jaipur, India</span>
                <br />
                <span className="small">
                  Bachelor of Technology (Computer Science and Technology)
                </span>
              </p>
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
              <p>
                <span>Hindi&nbsp;&nbsp;</span>
                <span className="small">
                  Native&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
                <span>English&nbsp;&nbsp;</span>
                <span className="small">Professional working proficiency</span>
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
              <p className="italics">Experience</p>
              <div className="full">
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Skills">
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

      <div className="Projects">
        <h1 className="h1heading">Projects</h1>
        <div className="projectsdiv">
          <div className="projectsdivdiv">
            <p>01</p>
            <Image
              src="/Stag.png" // Update with the path to your image
              alt="Description"
              width={100} // Specify the width of the image
              height={364} // Specify the height of the image
              className="projimage"
              onClick={() => scrollToSection("proj1")}
            />
          </div>
          <div className="projectsdivdiv1">
            <p>02</p>
            <Image
              src="/mycart.png" // Update with the path to your image
              alt="Description"
              width={100} // Specify the width of the image
              height={100} // Specify the height of the image
              className="projimage"
              onClick={() => scrollToSection("proj2")}
            />
          </div>
          <div className="projectsdivdiv">
            <p>03</p>
            <Image
              src="/moneypot.png" // Update with the path to your image
              alt="Description"
              width={100} // Specify the width of the image
              height={364} // Specify the height of the image
              className="projimage"
              onClick={() => scrollToSection("proj3")}
            />
          </div>
          <div className="projectsdivdiv1">
            <p>04</p>
            <Image
              src="/one (4).jpeg" // Update with the path to your image
              alt="Description"
              width={100} // Specify the width of the image
              height={100} // Specify the height of the image
              className="projimage"
            />
          </div>
          <div className="projectsdivdiv">
            <p>05</p>
            <Image
              src="/one (5).jpeg" // Update with the path to your image
              alt="Description"
              width={100} // Specify the width of the image
              height={364} // Specify the height of the image
              className="projimage"
            />
          </div>
          <div className="projectsdivdiv1">
            <p>06</p>
            <Image
              src="/one (6).jpeg" // Update with the path to your image
              alt="Description"
              width={100} // Specify the width of the image
              height={100} // Specify the height of the image
              className="projimage"
            />
          </div>
        </div>
      </div>
      <div ref={sectionRefs.proj1} className="Projectheading">
        <div className="projectheadingdiv">
          <p className="number">01</p>
          <p className="name">Stag</p>
        </div>
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
        <div className={isMobile || isTab? "summarydivmobil" : "summarydiv"}>
          {isMobile|| isTab ? (
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
              Electron.js is an open-source framework that enables developers to
              build cross-platform desktop applications using web technologies
              like HTML, CSS, and JavaScript. It combines Chromium and Node.js,
              allowing apps to run as standalone desktop programs with access to
              native system features. Created by GitHub, Electron powers popular
              apps like Slack, VS Code, and Discord. Its versatility comes from
              leveraging web development skills while supporting OS-specific
              integrations such as notifications and file system access.
              Electron simplifies deployment by packaging apps with all
              dependencies, ensuring consistency across Windows, macOS, and
              Linux. However, its resource-heavy nature demands careful
              optimization for performance efficiency.
            </p>
            <div className="techstack setmargin">
              <p>electron js</p>
              <p>javascript</p>
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
      <div ref={sectionRefs.proj2} className="Projectheading">
        <div className="projectheadingdiv">
          <p className="number">02</p>
          <p className="name">MyCart</p>
        </div>
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
              Electron.js is an open-source framework that enables developers to
              build cross-platform desktop applications using web technologies
              like HTML, CSS, and JavaScript. It combines Chromium and Node.js,
              allowing apps to run as standalone desktop programs with access to
              native system features. Created by GitHub, Electron powers popular
              apps like Slack, VS Code, and Discord. Its versatility comes from
              leveraging web development skills while supporting OS-specific
              integrations such as notifications and file system access.
              Electron simplifies deployment by packaging apps with all
              dependencies, ensuring consistency across Windows, macOS, and
              Linux. However, its resource-heavy nature demands careful
              optimization for performance efficiency.
            </p>
            <div className="techstack setmargin">
              <p>electron js</p>
              <p>javascript</p>
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
      <div ref={sectionRefs.proj3} className="Projectheading">
        <div className="projectheadingdiv">
          <p className="number">03</p>
          <p className="name">MoneyPot</p>
        </div>
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
        
        <div className={isMobile || isTab ? "summarydivmobil" :"summarydiv"}>
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
              Electron.js is an open-source framework that enables developers to
              build cross-platform desktop applications using web technologies
              like HTML, CSS, and JavaScript. It combines Chromium and Node.js,
              allowing apps to run as standalone desktop programs with access to
              native system features. Created by GitHub, Electron powers popular
              apps like Slack, VS Code, and Discord. Its versatility comes from
              leveraging web development skills while supporting OS-specific
              integrations such as notifications and file system access.
              Electron simplifies deployment by packaging apps with all
              dependencies, ensuring consistency across Windows, macOS, and
              Linux. However, its resource-heavy nature demands careful
              optimization for performance efficiency.
            </p>
            <div className="techstack setmargin">
              <p>electron js</p>
              <p>javascript</p>
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
      {/* <div className="contacts">
        <h1 className="h1heading">Let's Work Together</h1>
      </div> */}
    </>
  );
}
