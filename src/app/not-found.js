import { Header } from "./components/SiteChrome";
import { TransitionLink } from "./components/MotionProvider";
import Icon from "./components/Icons";
export default function NotFound() {
  return (
    <div id="top">
      <Header />
      <main className="not-found" id="main-content">
        <span>404</span>
        <h1>A page out of place.</h1>
        <p>This page doesn’t exist. There’s still plenty to explore.</p>
        <TransitionLink className="text-link" href="/">
          Back to the portfolio
          <Icon name="arrow-right" />
        </TransitionLink>
      </main>
    </div>
  );
}
