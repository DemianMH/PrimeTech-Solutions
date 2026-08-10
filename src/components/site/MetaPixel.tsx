"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID || "1634168091092411";

function trackMetaEvent(eventName: string, params?: Record<string, unknown>) {
  if (!pixelId || typeof window === "undefined" || typeof window.fbq !== "function") {
    return;
  }

  if (params) {
    window.fbq("track", eventName, params);
    return;
  }

  window.fbq("track", eventName);
}

function MetaPixelEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const skippedInitialPageView = useRef(false);

  useEffect(() => {
    if (!skippedInitialPageView.current) {
      skippedInitialPageView.current = true;
      return;
    }

    trackMetaEvent("PageView");
  }, [pathname, searchParams]);

  useEffect(() => {
    if (!pixelId || typeof document === "undefined") {
      return;
    }

    const handleContactClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const link = target.closest<HTMLAnchorElement>("a[href]");
      const href = link?.href || "";
      const isContactLink = href.includes("wa.me/") || href.startsWith("mailto:");

      if (!isContactLink) {
        return;
      }

      trackMetaEvent("Contact", {
        content_name: href.includes("wa.me/") ? "WhatsApp" : "Email",
      });
    };

    document.addEventListener("click", handleContactClick, true);
    return () => document.removeEventListener("click", handleContactClick, true);
  }, []);

  if (!pixelId) {
    return null;
  }

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${pixelId}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}

export function MetaPixel() {
  return (
    <Suspense fallback={null}>
      <MetaPixelEvents />
    </Suspense>
  );
}

