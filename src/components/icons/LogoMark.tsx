type LogoMarkProps = {
  size?: number;
  className?: string;
};

/** The Nesture Labs mark, geometry from public/brand/logo-dark.svg. Do not redraw or recolour. */
export function LogoMark({ size = 30, className }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="280 95 1440 1440"
      aria-hidden="true"
      className={className}
      style={{ overflow: "visible", flex: "0 0 auto" }}
    >
      <g fill="none" stroke="#FF2323" strokeWidth="40" strokeLinejoin="miter">
        <path d="M925 545H1075V650H925Z" />
        <path d="M905 650H1095L1185 740V990L1095 1080H905L815 990V740Z" />
        <path d="M915 730H1085L1115 760V970L1085 1000H915L885 970V760Z" />
        <path d="M940 775H1060V955H940Z" />
        <g>
          <path d="M815 740H460L360 640V290" />
          <path d="M865 690L790 615H450V290" />
          <path d="M815 830H490L360 960V1300" />
          <path d="M815 935H500L450 985V1300" />
        </g>
        <g transform="translate(2000 0) scale(-1 1)">
          <path d="M815 740H460L360 640V290" />
          <path d="M865 690L790 615H450V290" />
          <path d="M815 830H490L360 960V1300" />
          <path d="M815 935H500L450 985V1300" />
        </g>
      </g>
    </svg>
  );
}
