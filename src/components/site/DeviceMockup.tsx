import Image from "next/image";

type DeviceMockupProps = {
  title: string;
  desktop: string;
  tablet: string;
  mobile: string;
  variant?: "tech" | "design";
};

export function DeviceMockup({
  title,
  desktop,
  tablet,
  mobile,
  variant = "tech",
}: DeviceMockupProps) {
  return (
    <div className={`device-showcase device-showcase-${variant}`} aria-label={`Vistas adaptables de ${title}`}>
      <div className="device-glow" aria-hidden="true" />
      <div className="device-frame device-desktop">
        <div className="device-browser-bar" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <Image
          src={desktop}
          alt={`${title} en computadora`}
          width={1440}
          height={900}
          sizes="(max-width: 720px) 92vw, 54vw"
          className="device-screen"
        />
        <i aria-hidden="true" />
      </div>

      <div className="device-frame device-tablet">
        <span className="device-camera" aria-hidden="true" />
        <Image
          src={tablet}
          alt={`${title} en tableta`}
          width={820}
          height={1000}
          sizes="(max-width: 720px) 34vw, 19vw"
          className="device-screen"
        />
      </div>

      <div className="device-frame device-mobile">
        <span className="device-notch" aria-hidden="true" />
        <Image
          src={mobile}
          alt={`${title} en celular`}
          width={390}
          height={844}
          sizes="(max-width: 720px) 24vw, 12vw"
          className="device-screen"
        />
      </div>
    </div>
  );
}
