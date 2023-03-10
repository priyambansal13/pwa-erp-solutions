import cx from "classnames";
import { useBooleanState, usePrevious } from "webrix/hooks";
import { useEffect } from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
// import { ReactComponent as OfflineLogo } from '../../../assets/images/logo-offline-icon.svg';
// import Text from "../Text";
// import "./_offline.scss";
import { Helmet } from "react-helmet";

export default function Offline({ children }) {
  const {
    value: online,
    setFalse: setOffline,
    setTrue: setOnline,
  } = useBooleanState(navigator.onLine);
  const previousOnline = usePrevious(online);

  useEffect(() => {
    if (!online) {
      return void disableBodyScroll(document.body);
    }

    enableBodyScroll(document.body);
  }, [online]);

  useEffect(() => {
    console.log("dashbaord");
    window.addEventListener("online", setOnline);
    window.addEventListener("offline", setOffline);

    return () => {
      window.removeEventListener("online", setOnline);
      window.removeEventListener("offline", setOffline);
    };
  });

  return (
    <>
      <div
        className={cx(
          "offline",
          "animate__animated",
          "animate__faster",
          `animate__${online ? "slideOutUp" : "slideInDown"}`
        )}
        style={
          previousOnline === online && online ? { display: "none" } : void 0
        }
      >
        {!online && (
          <Helmet>
            <meta name="theme-color" content="#000000" />
          </Helmet>
        )}
        <div className="offline__content">
          {/* <OfflineLogo /> */}
          <div className="offline__text">
            <span subHeading className="mt-0 mb-5">
              You're not online
            </span>
            <span className="mt-0 mb-0">Check your internet connection.</span>
          </div>
        </div>
      </div>
      <div
        className={cx("offline__overlay", {
          "offline__overlay--visible": !online,
        })}
      />
      {children}
    </>
  );
}
