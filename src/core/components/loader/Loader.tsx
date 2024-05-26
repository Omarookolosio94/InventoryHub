function Loader({ message = "Loading" }: { message?: string }) {
  return (
    <div
      className={`no-scrollbar overlay fixed left-0 top-0 z-40 h-screen w-screen overflow-auto bg-navy-500 bg-opacity-10 backdrop-blur-sm backdrop-filter`}
      style={{
        minHeight: "calc(100vh - 72px)",
        zIndex: 1000,
      }}
    >
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            style={{
              margin: "auto",
              background: "transparent",
              display: "block",
            }}
            width="100px"
            height="100px"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
          >
            <defs>
              <path
                id="path"
                d="M50 15A15 35 0 0 1 50 85A15 35 0 0 1 50 15"
                fill="none"
              ></path>
              <path
                id="patha"
                d="M0 0A15 35 0 0 1 0 70A15 35 0 0 1 0 0"
                fill="none"
              ></path>
            </defs>
            <g transform="rotate(0 50 50)">
              <use xlinkHref="#path" stroke="#f1f2f3" stroke-width="3"></use>
            </g>
            <g transform="rotate(60 50 50)">
              <use xlinkHref="#path" stroke="#f1f2f3" stroke-width="3"></use>
            </g>
            <g transform="rotate(120 50 50)">
              <use xlinkHref="#path" stroke="#f1f2f3" stroke-width="3"></use>
            </g>
            <g transform="rotate(0 50 50)">
              <circle cx="50" cy="15" r="9" fill="#e15b64">
                <animateMotion dur="1s" repeatCount="indefinite" begin="0s">
                  <mpath xlinkHref="#patha"></mpath>
                </animateMotion>
              </circle>
            </g>
            <g transform="rotate(60 50 50)">
              <circle cx="50" cy="15" r="9" fill="#f8b26a">
                <animateMotion
                  dur="1s"
                  repeatCount="indefinite"
                  begin="-0.16666666666666666s"
                >
                  <mpath xlinkHref="#patha"></mpath>
                </animateMotion>
              </circle>
            </g>
            <g transform="rotate(120 50 50)">
              <circle cx="50" cy="15" r="9" fill="#abbd81">
                <animateMotion
                  dur="1s"
                  repeatCount="indefinite"
                  begin="-0.3333333333333333s"
                >
                  <mpath xlinkHref="#patha"></mpath>
                </animateMotion>
              </circle>
            </g>
          </svg>
        </div>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Loader;
