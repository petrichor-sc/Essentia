import { useEffect, useRef, useState, useCallback } from 'react'
import HeroSection from './HeroSection'
import logoMark from '@/imports/Essentia_Logo_2.png'
import signatureSvg from '@/imports/layer1_3.svg'
import workshopTalk from '@/imports/09242025_Perfume_067.jpg'
import workshopStanding from '@/imports/09242025_Perfume_088_1.jpg'
import workshopWriting from '@/imports/09242025_Perfume_091_1.jpg'
import portraitCouple from '@/imports/JUL_2063_copy_1_.jpg'
import sarthakLab from '@/imports/DSC_1892.jpg'
import coupleScent from '@/imports/image.png'
import kidsOlfaction from '@/imports/DSC_0072_web.webp'
import sarthakGlass from '@/imports/a.png'
import labExtraction from '@/imports/IMG_5350.jpg'
import memoryMoment from '@/imports/Hofefestival_014_memory_cropped.jpg'
import WorldMap from './WorldMap'

// Current navigation prioritises the three public service pathways.
// The hash links keep the current single-page site functional; the matching
// future routes are /bespoke-perfume, /workshops and /olfactory-experiences.
// Philosophy remains a storytelling destination rather than the first thing
// a new visitor has to decode.
const PRIMARY_NAV_ITEMS = [
  { label: 'Bespoke Perfume', href: '#bespoke-perfume' },
  { label: 'Workshops', href: '#workshops' },
  { label: 'Experiences', href: '#olfactory-experiences' },
  { label: 'Philosophy', href: '#philosophy' },
] as const


/* ── Botanical SVG elements ───────────────────────────────────────────── */
const LeafSvg = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M40 110 C40 110 5 70 8 35 C11 10 40 5 40 5 C40 5 69 10 72 35 C75 70 40 110 40 110Z"
      fill="rgba(201,164,101,0.12)" stroke="rgba(201,164,101,0.35)" strokeWidth="0.8"/>
    <path d="M40 110 L40 5" stroke="rgba(201,164,101,0.25)" strokeWidth="0.6" strokeDasharray="3 4"/>
    <path d="M40 70 C25 55 15 45 20 30" stroke="rgba(201,164,101,0.2)" strokeWidth="0.5"/>
    <path d="M40 70 C55 55 65 45 60 30" stroke="rgba(201,164,101,0.2)" strokeWidth="0.5"/>
  </svg>
)

const PetalSvg = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="30" cy="40" rx="18" ry="35" fill="rgba(201,164,101,0.1)" stroke="rgba(201,164,101,0.3)" strokeWidth="0.7" transform="rotate(-15 30 40)"/>
    <ellipse cx="30" cy="40" rx="18" ry="35" fill="rgba(201,164,101,0.07)" stroke="rgba(201,164,101,0.2)" strokeWidth="0.5" transform="rotate(15 30 40)"/>
  </svg>
)

const SprigSvg = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 40 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="20" y1="95" x2="20" y2="5" stroke="rgba(201,164,101,0.4)" strokeWidth="1"/>
    {[20, 35, 50, 65, 80].map((y, i) => (
      <g key={i}>
        <ellipse cx="12" cy={y} rx="9" ry="5" fill="rgba(201,164,101,0.12)" stroke="rgba(201,164,101,0.3)" strokeWidth="0.6" transform={`rotate(-30 12 ${y})`}/>
        <ellipse cx="28" cy={y - 8} rx="9" ry="5" fill="rgba(201,164,101,0.1)" stroke="rgba(201,164,101,0.25)" strokeWidth="0.6" transform={`rotate(30 28 ${y - 8})`}/>
      </g>
    ))}
  </svg>
)

const CircleOrb = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" stroke="rgba(201,164,101,0.2)" strokeWidth="0.8"/>
    <circle cx="50" cy="50" r="35" stroke="rgba(201,164,101,0.12)" strokeWidth="0.5"/>
    <circle cx="50" cy="50" r="20" fill="rgba(201,164,101,0.05)" stroke="rgba(201,164,101,0.15)" strokeWidth="0.5"/>
    <line x1="5" y1="50" x2="95" y2="50" stroke="rgba(201,164,101,0.1)" strokeWidth="0.5"/>
    <line x1="50" y1="5" x2="50" y2="95" stroke="rgba(201,164,101,0.1)" strokeWidth="0.5"/>
  </svg>
)


const ResonanceLogoSvg = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 553 861" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
    <path className="memory-interlude-logo-path memory-interlude-logo-path--outer" d="M267.199 15.3913C286.406 14.3882 339.952 13.806 396.432 43.0836C425.959 58.3897 444.556 75.7726 472.165 101.584C496.969 124.774 511.157 138.044 522.63 158.805C533.165 177.867 537.395 195.964 540.451 260.329C545.528 367.283 538.506 415.248 535.524 433.494C527.092 485.078 517.549 503.34 503.602 517.078C482.458 537.904 455.873 543.698 442.801 546.544C423.237 550.802 395.083 556.907 371.653 541.679C357.961 532.78 351.821 520.465 341.614 499.946C336.174 489.01 327.509 471.173 325.015 445.858C323.839 433.916 321.815 413.329 330.534 390.59C333.915 381.772 337.132 377.271 340.216 372.593C343.318 367.89 346.268 363.033 349.045 353.555C355.004 333.225 352.846 316.643 352.143 312.026C350.38 300.441 348.18 285.887 337.823 275.37C328.029 265.425 313.004 261.166 297.415 261.735C281.819 262.304 265.583 267.704 253.301 277.174C232.816 292.971 227.829 316.625 226.946 321.257C225.947 326.494 224.189 336.235 226.95 347.979C229.263 357.821 233.878 365.363 237.647 370.698C238.589 372.031 239.48 373.228 240.266 374.286C241.055 375.346 241.735 376.261 242.266 377.042C242.802 377.829 243.161 378.444 243.332 378.909C243.508 379.391 243.423 379.537 243.375 379.588C243.308 379.66 243.125 379.761 242.708 379.773C242.306 379.785 241.769 379.71 241.108 379.536C239.79 379.188 238.071 378.468 236.141 377.4C232.284 375.267 227.65 371.786 223.772 367.271C210.233 351.509 212.032 330.278 212.792 321.393C213.416 314.093 215.515 289.645 235.449 271.155C248.518 259.032 262.67 255.574 271.607 253.392C282.324 250.776 308.929 244.295 334.125 259.501C338.496 262.138 352.7 271.389 361.061 289.496C369.386 307.523 367.226 324.159 365.336 337.311C363.442 350.495 360.287 357.638 356.876 364.676C353.452 371.742 349.756 378.728 346.845 391.534C340.711 418.523 344.971 440.973 347.458 453.404C352.703 479.612 357.606 504.246 378.507 517.853C391.727 526.46 406.712 527.643 419.333 526.329C431.955 525.015 442.263 521.197 446.165 519.753C490.179 503.456 506.655 459.281 509.971 450.398C515.119 436.609 516.019 427.022 515.725 414.621C515.431 402.224 513.952 387.095 514.319 362.054C514.961 318.242 520.528 294.385 524.541 275.375C528.561 256.327 531.03 242.103 525.405 217.647C515.149 173.056 489.203 143.176 476.583 128.638C444.584 91.7806 409.929 74.7465 387.012 63.7711C358.415 50.075 319.5 31.4326 267.159 32.8913C194.036 34.9292 143.508 74.8331 124.418 90.3483C106.279 105.092 59.227 144.408 41.0083 212.08C31.4791 247.476 34.87 275.688 41.6118 331.892C48.6335 390.43 55.2442 440.44 91.0532 483.224C92.6598 485.144 100.308 494.085 112.161 503.258C124.009 512.429 140.093 521.859 158.572 524.712C171.792 526.752 178.687 524.258 183.002 520.913C189.542 515.844 193.868 505.961 192.444 485.952C191.012 465.834 184.795 449.864 177.184 435.015C173.382 427.597 169.225 420.448 165.15 413.214C161.071 405.973 157.069 398.639 153.554 390.823C150.51 384.051 123.622 321.941 145.555 258.619C149.826 246.289 168.576 197.469 218.059 173.814C249.834 158.625 279.573 160.837 305.366 162.762C331.719 164.729 358.419 166.729 385.283 184.876C421.45 209.307 433.281 246.37 439.348 265.39C443.558 278.588 456.755 320.013 439.988 356.288C438.296 359.949 435.394 366.225 430.771 372.198C426.149 378.17 419.832 383.808 411.324 386.231C410.354 386.507 408.1 386.929 405.971 386.947C404.906 386.956 403.906 386.863 403.125 386.62C402.338 386.375 401.867 386.009 401.685 385.538C401.551 385.19 401.653 384.673 402.123 383.95C402.576 383.251 403.292 382.485 404.112 381.717C404.928 380.954 405.824 380.209 406.624 379.548C407.411 378.898 408.128 378.31 408.548 377.882C414.064 372.266 418.359 364.909 422.402 358.242C427.929 349.126 430.438 335.899 431.051 325.442C431.309 321.042 430.89 316.582 430.412 312.152C429.932 307.709 429.395 303.301 429.395 298.944C429.395 295.649 429.498 292.294 428.482 289.041C427.99 287.466 427.115 286.027 426.31 284.654C425.492 283.259 424.742 281.926 424.395 280.482C424.134 279.398 424.101 278.297 424.07 277.128C424.039 275.974 424.011 274.755 423.733 273.523C422.24 266.927 419.144 260.354 416.156 254.399C409.914 241.962 401.664 230.566 392.091 220.498C370.454 197.74 346.408 189.523 333.306 185.219C316.998 179.862 278.647 167.252 239.217 185.24C232.872 188.135 211.956 197.983 197.081 219.945C193.602 225.081 192.04 228.541 189.73 235.714C188.578 239.289 187.237 243.799 185.378 249.903C183.519 256.01 181.137 263.723 177.904 273.717C174.703 283.609 172.133 291.206 170.079 297.222C168.025 303.236 166.485 307.681 165.349 311.257C163.07 318.432 162.405 322.156 162.464 328.138C162.519 333.604 163.14 337.065 165.527 343.78C167.901 350.459 172.045 360.425 179.146 378.876C189.977 407.02 193.418 417.826 195.818 425.664C198.225 433.524 199.595 438.424 206.282 454.729C214.372 474.457 217.673 480.272 217.343 491.522C216.585 517.406 197.625 534.027 196.555 534.935C181.557 547.668 164.71 548.672 157.393 548.999C133.837 550.05 116.543 539.038 108.36 533.665C89.3246 521.164 78.2752 505.029 62.2817 474.655C33.7927 420.55 19.5982 393.582 13.6196 358.88C6.312 316.462 11.6145 283.751 16.7036 252.37C23.5828 209.951 29.574 173.035 54.8608 133.552C93.7252 72.8696 151.515 47.7519 177.339 36.9352C193.019 30.3676 224.181 17.6378 267.199 15.3913Z" pathLength={1} />
    <path className="memory-interlude-logo-path memory-interlude-logo-path--figure" d="M377.233 327.54C377.953 319.66 378.613 312.41 377.233 302.93C376.553 298.24 373.913 283.01 363.003 267.03C357.533 259 349.073 246.61 333.313 239.93C322.333 235.28 312.543 235.81 292.963 236.88C275.403 237.84 266.613 238.32 255.973 243.32C243.943 248.96 236.593 256.96 226.613 267.82C218.793 276.33 214.203 281.32 210.473 289.83C205.863 300.33 205.443 309.6 204.943 320.66C204.583 328.41 204.233 336.22 206.523 346.4C207.063 348.8 209.423 358.77 216.233 370.45C221.203 378.98 227.023 388.95 238.923 395.85C243.323 398.41 251.173 402.82 261.733 402.29C271.303 401.8 278.013 397.51 282.743 394.4C297.713 384.55 303.853 370.19 305.733 365.62C310.053 355.13 310.413 346.22 311.143 328.41C311.463 320.48 311.753 313.48 310.463 304.05C308.303 288.19 303.783 280.87 305.733 279.7C308.403 278.08 321.663 289.01 326.703 304.73C327.713 307.87 328.533 311.65 327.383 336.53C326.533 354.77 326.083 363.98 324.673 368.33C319.233 385.14 307.433 395.21 301.673 400.13C298.803 402.59 295.083 405.76 290.353 408.77C291.983 416.01 289.733 429.1 288.133 445.29C286.683 460.01 286.553 474.63 286.283 503.87C285.993 537.2 288.353 530.73 288.133 564.3C288.003 585.63 287.023 591.65 291.223 601.29C292.093 603.3 301.993 625.16 322.673 630.3C333.383 632.96 337.673 628.82 362.133 624.73C364.383 624.35 381.153 621.59 400.363 621.03C419.993 620.45 434.003 622.49 462.023 626.58C493.883 631.22 495.313 633.61 495.323 634.59C495.343 636.94 487.273 639.42 480.523 640.14C462.533 642.05 451.633 631.69 446.273 636.44C444.693 637.84 444.653 639.62 444.753 648.77C445.033 672.12 445.483 675.63 444.753 681.45C443.223 693.71 437.813 705.28 435.443 704.89C432.633 704.41 432.863 686.86 433.043 673.44C433.313 652.85 435.193 644.94 429.963 640.76C427.133 638.5 424.813 639.39 413.923 639.52C390.383 639.81 384.003 635.85 380.013 640.14C375.873 644.59 379.613 652.2 383.093 666.04C384.733 672.55 392.393 703.01 386.183 728.93C380.873 751.08 366.113 767.18 363.363 765.93C361.023 764.86 368.643 751.72 368.913 729.55C369.023 720.64 366.523 711.51 364.853 702.85C363.993 698.33 363.003 694 362.733 689.43C362.423 684.42 361.573 679.47 360.343 674.6C358.723 668.15 357.173 661.67 355.533 655.23C354.823 652.46 354.533 652.29 351.783 651.79C349.243 651.32 346.723 651.06 344.163 650.93C339.543 650.71 335.783 649.06 331.053 649.6C326.053 650.16 321.163 651.93 317.123 654.94C305.233 663.8 305.783 679.7 306.023 686.39C306.413 697.63 310.203 701.94 320.203 724C331.123 748.1 336.583 760.15 336.853 770.86C337.043 778.85 334.333 785.33 331.803 792.73C330.443 796.72 329.703 800.85 328.493 804.87C327.313 808.8 325.193 812.31 324.083 816.3C323.313 819.09 321.983 822.08 321.743 824.95C321.333 830.06 322.473 834.96 323.473 839.91C323.833 841.73 323.943 843.58 324.063 845.44C324.133 846.54 324.733 848.37 323.973 849.33C322.423 851.29 319.983 849.25 319.033 847.9C315.323 842.7 312.923 836.27 311.573 830.06C309.143 818.89 311.953 813.22 314.033 797.38C315.833 783.7 317.863 768.3 314.033 751.75C311.553 741.02 307.243 733.09 298.623 717.22C287.973 697.62 281.063 690.94 282.743 679.6C283.243 676.26 284.453 672.96 285.303 669.69C285.713 668.1 286.603 666.89 287.553 665.56C288.133 664.74 290.163 660.63 290.993 660.41C286.863 661.49 282.563 661.01 278.383 660.86C274.693 660.74 270.873 661.55 267.173 661.72C260.863 662.02 254.573 661.67 248.343 660.67C243.983 659.97 239.263 659.81 235.053 658.69C234.053 658.43 233.093 657.72 231.973 657.94C231.503 661.35 233.373 664.29 233.553 667.61C233.693 670.02 233.463 672.21 233.893 674.63C234.963 680.6 235.353 686.53 234.493 692.55C232.433 707 226.383 707.09 222.773 724C221.823 728.48 219.133 741.76 222.773 757.3C226.423 772.84 234.603 782.97 232.643 784.43C231.253 785.46 226.323 780.99 224.013 778.88C219.143 774.46 206.813 763.25 203.663 744.35C202.463 737.17 203.063 731.67 203.663 726.47C205.793 707.98 212.463 705.08 215.373 687C216.533 679.81 217.743 672.86 214.743 666.06C212.553 661.09 214.683 651.34 208.493 649.08C205.693 648.05 202.783 648.61 199.883 648.61C197.103 648.61 195.033 648.41 192.393 647.71C189.853 647.04 187.413 647.38 184.813 647.22C179.523 646.88 174.173 645.98 168.873 645.81C166.823 645.74 164.263 645.23 162.483 646.53C161.053 647.57 159.573 649.63 158.483 651.07C155.293 655.28 154.583 660.98 153.713 666.04C151.793 677.3 152.973 686.14 153.103 687C154.273 695.29 157.143 702.57 161.153 709.83C162.683 712.62 165.683 715.84 166.173 719C166.973 724.12 163.613 728.71 162.253 733.43C160.973 737.83 161.773 742.64 159.863 746.91C159.193 748.41 158.463 749.98 157.593 751.37C156.693 752.82 155.683 756.57 153.493 756.44C151.083 756.31 151.943 752.75 151.613 751.15C151.243 749.38 150.733 747.76 151.163 745.93C151.633 743.86 151.303 742.17 150.693 740.1C149.933 737.55 149.393 735.01 149.083 732.36C148.183 724.78 147.073 717.2 145.083 709.82C139.123 687.74 130.763 688.25 128.433 671.59C127.593 665.58 128.163 659.76 129.463 653.88C130.903 647.34 130.813 641.03 136.173 636.17C129.673 633.2 123.203 632.19 116.253 630.98C113.203 630.45 110.253 628.94 107.183 628.23C104.123 627.54 101.003 627.1 97.8832 626.94C96.5632 626.87 95.2432 626.86 93.9332 626.74C91.7933 626.55 88.4232 624.68 88.1432 627.58C87.8632 630.43 88.4232 633.09 87.5632 635.92C87.2933 636.82 86.9332 637.68 86.6732 638.58C86.0332 640.78 86.1732 643.05 85.4632 645.22C84.6432 647.76 84.4732 650.45 84.0332 653.09C83.4032 656.96 82.6132 661.92 82.8032 668.51C82.8533 670.12 83.0332 673.76 85.8832 687.62C88.7032 701.29 89.5932 702.88 89.2432 707.55C88.6632 715.47 85.1832 723.59 82.8032 723.38C80.6432 723.2 80.2632 716.23 77.3032 701.19C74.1432 685.15 73.5032 687.6 71.0932 674.67C67.5332 655.59 65.7532 646.04 67.3732 636.2C68.4232 629.86 69.9332 626.7 67.9932 622.7C65.3732 617.29 59.2432 616.11 47.6532 612.39C32.0632 607.39 19.2232 603.27 19.2933 599.44C19.3832 594.32 42.4532 595.56 46.9032 584.08C50.6532 574.38 38.7732 561.65 40.2632 560.6C41.5632 559.67 50.0032 570.06 55.6732 576.01C69.7832 590.83 84.7432 596.54 106.853 604.99C140.003 617.66 156.573 624 178.993 621.03C187.793 619.86 218.323 614.54 239.703 588.42C254.583 570.25 258.363 550.14 259.403 544.22C260.763 536.52 260.773 530.94 260.803 523.12C260.903 488.77 251.943 486.82 253.353 462.32C254.533 441.83 261.493 431.05 253.973 418.73C253.953 418.7 253.933 418.67 253.923 418.64C246.243 418.38 236.653 416.63 227.433 410.96C219.253 405.93 214.963 400.04 208.243 390.81C203.223 383.92 194.733 372.03 190.033 354.12C184.653 333.61 187.303 316.87 188.683 308.79C189.543 303.69 192.183 290.18 200.183 274.5C206.143 262.79 218.053 239.44 245.513 224.89C274.933 209.31 303.273 213.88 311.143 215.42C343.603 221.78 362.413 242.26 368.653 249.25C370.563 251.39 399.843 285.16 396.633 327.63C395.503 342.49 390.003 363.71 389.213 366.72C383.543 388.37 379.603 393.05 380.833 404.87C382.693 422.75 394.083 434.81 397.743 438.7C404.213 445.54 411.953 453.75 422.103 453.58C429.353 453.46 436.933 449.09 448.493 433.28C469.353 404.76 475.893 375.96 476.913 372.39C490.723 323.73 482.643 282.95 476.913 251.28C471.263 220.12 466.383 193.17 445.783 164.67C415.743 123.11 374.033 108.34 362.563 104.46C333.143 94.4895 308.443 95.1396 293.553 95.6596C284.843 95.9696 254.613 97.5595 218.453 111.9C206.013 116.83 187.853 124.16 167.703 139.64C155.383 149.11 128.373 172.33 112.473 208.88C108.313 218.44 105.623 227.26 104.563 230.78C102.833 236.55 98.6732 251.21 95.6432 280.24C93.7933 298.04 92.7132 317.81 93.0532 340.08C93.4833 368.68 93.7032 382.98 98.4732 399.69C104.943 422.39 115.133 437.79 118.793 443.05C129.213 458.02 139.563 466.69 149.613 475.11C159.573 483.45 164.703 487.66 172.533 489.34C176.083 490.1 181.843 490.72 181.903 492.16C181.963 493.3 178.353 494.34 177.273 494.64C170.843 496.48 152.503 495.52 129.973 476.8C110.373 460.53 101.293 442.2 92.8232 425.09C79.9932 399.19 75.7532 377.3 74.3132 368.53C73.8432 365.74 73.6432 364.11 71.6033 337.71C67.3332 282.63 67.3632 278.53 67.9833 272.33C70.1332 250.77 76.3032 234.67 80.7432 223.11C88.2832 203.45 96.6332 189.86 103.553 178.74C110.993 166.76 121.063 150.77 138.213 133.12C146.343 124.76 157.143 113.78 173.553 103.54C178.243 100.62 194.493 90.8196 226.053 82.5396C253.103 75.4396 289.183 65.9796 334.103 74.8595C362.013 80.3896 382.333 90.8196 393.943 96.8796C405.453 102.89 422.533 111.97 440.793 129.17C443.973 132.16 456.433 144.11 469.023 162.82C478.033 176.2 485.993 188.03 490.473 205.27C492.453 212.89 491.723 213.72 494.083 245.69C496.503 278.36 497.103 275.09 497.583 288.7C497.763 293.6 498.433 314.95 495.893 343.12C494.943 353.67 493.923 360.89 492.053 374.17C488.443 399.8 486.643 412.61 483.363 421.37C480.043 430.22 473.803 446.29 458.183 459.53C450.733 465.84 439.683 475.21 423.863 475.45C406.493 475.71 394.173 464.81 387.053 458.51C374.403 447.32 368.813 434.46 366.503 427.92C360.703 411.45 362.383 397.28 363.453 389.08C364.193 383.4 364.443 385.52 370.003 363C376.063 338.48 376.863 331.55 377.233 327.54Z" pathLength={1} />
    <path className="memory-interlude-logo-path memory-interlude-logo-path--core" d="M257.537 310.693C265.862 306.283 274.65 310.121 275.929 310.706C285.861 315.253 291.536 327.101 289.496 337.906C289.295 338.971 286.888 350.575 275.934 355.424C274.216 356.184 265.643 359.712 257.536 355.439C251.987 352.513 249.263 347.307 247.934 342.524C246.605 337.744 246.688 333.453 246.708 332.459C246.733 331.199 246.813 327.136 248.212 322.689C249.611 318.241 252.31 313.463 257.537 310.693Z" pathLength={1} />
  </svg>
)

/* ── Reveal hook ──────────────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .gold-line')
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

/* ── Cursor hook ──────────────────────────────────────────────────────── */
function useCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let rx = 0, ry = 0

    const onMove = (e: MouseEvent) => {
      dot.style.left = e.clientX + 'px'
      dot.style.top = e.clientY + 'px'
      rx += (e.clientX - rx) * 0.12
      ry += (e.clientY - ry) * 0.12
      ring.style.left = rx + 'px'
      ring.style.top = ry + 'px'
    }

    const raf = () => {
      if (ring) {
        const cx = parseFloat(ring.style.left || '0')
        const cy = parseFloat(ring.style.top || '0')
        const tx = parseFloat(dot.style.left || '0')
        const ty = parseFloat(dot.style.top || '0')
        ring.style.left = (cx + (tx - cx) * 0.1) + 'px'
        ring.style.top = (cy + (ty - cy) * 0.1) + 'px'
      }
      requestAnimationFrame(raf)
    }
    const id = requestAnimationFrame(raf)

    const onHoverIn = () => setHovering(true)
    const onHoverOut = () => setHovering(false)

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, .scent-card, .cta-btn, .ingredient-tag').forEach(el => {
      el.addEventListener('mouseenter', onHoverIn)
      el.addEventListener('mouseleave', onHoverOut)
    })

    return () => {
      cancelAnimationFrame(id)
      document.removeEventListener('mousemove', onMove)
    }
  }, [])

  return { dotRef, ringRef, hovering }
}

/* ── Parallax hook ────────────────────────────────────────────────────── */
function useParallax() {
  const scrollY = useRef(0)
  const ticking = useRef(false)

  const update = useCallback(() => {
    const y = window.scrollY
    scrollY.current = y

    // Hero parallax layers
    const hero = document.getElementById('hero-bg')
    if (hero) hero.style.transform = `translateY(${y * 0.35}px)`

    const heroContent = document.getElementById('hero-content')
    if (heroContent) heroContent.style.transform = `translateY(${y * 0.15}px)`

    const heroBotanicals = document.getElementById('hero-botanicals')
    if (heroBotanicals) heroBotanicals.style.transform = `translateY(${y * 0.5}px)`

    ticking.current = false
  }, [])

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(update)
        ticking.current = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [update])
}

/* ── Main App ─────────────────────────────────────────────────────────── */
export default function App() {
  useReveal()
  useParallax()
  const { dotRef, ringRef, hovering } = useCursor()
  const [menuOpen, setMenuOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [introVisible, setIntroVisible] = useState(true)
  const [introLeaving, setIntroLeaving] = useState(false)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const leaveTimer = window.setTimeout(() => setIntroLeaving(true), reducedMotion ? 500 : 7600)
    const removeTimer = window.setTimeout(() => setIntroVisible(false), reducedMotion ? 900 : 8550)
    return () => {
      window.clearTimeout(leaveTimer)
      window.clearTimeout(removeTimer)
    }
  }, [])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    if (introVisible) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = previousOverflow || ''
    return () => { document.body.style.overflow = previousOverflow }
  }, [introVisible])

  const skipIntro = useCallback(() => {
    if (!introVisible || introLeaving) return
    setIntroLeaving(true)
    window.setTimeout(() => setIntroVisible(false), 850)
  }, [introVisible, introLeaving])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={introVisible ? 'intro-active' : ''} style={{ background: '#130f0a', minHeight: '100vh', overflowX: 'hidden' }}>
      {introVisible && (
        <div
          className={`site-intro ${introLeaving ? 'is-leaving' : ''}`}
          aria-label="Essentia Resonance introduction"
          onClick={skipIntro}
        >
          <div className="site-intro-ambient site-intro-ambient--one" aria-hidden="true" />
          <div className="site-intro-ambient site-intro-ambient--two" aria-hidden="true" />
          <div className="site-intro-stage" aria-hidden="true">
            <span className="site-intro-node" />
            <span className="site-intro-ripple site-intro-ripple--one" />
            <span className="site-intro-ripple site-intro-ripple--two" />
            <ResonanceLogoSvg className="site-intro-logo site-intro-logo--base" />
            <ResonanceLogoSvg className="site-intro-logo site-intro-logo--glow" />
          </div>
          <div className="site-intro-wordmark">
            <span className="site-intro-wordmark-primary">Essentia</span>
            <span className="site-intro-wordmark-script">Resonance</span>
          </div>
          <span className="site-intro-skip">Click to enter</span>
        </div>
      )}

      {/* Custom cursor */}
      <div ref={dotRef} className="cursor-dot" style={{ opacity: 0.9 }} />
      <div ref={ringRef} className={`cursor-ring ${hovering ? 'hovering' : ''}`} />

      {/* ── Navigation ───────────────────────────────────── */}
      <nav className="site-nav" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 clamp(20px,4vw,48px)',
        height: '68px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled
          ? 'rgba(14,8,30,0.92)'
          : 'rgba(14,8,30,0.52)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: scrolled
          ? '1px solid rgba(192,172,232,0.14)'
          : '1px solid rgba(192,172,232,0.06)',
        transition: 'background 0.5s ease, border-color 0.5s ease',
      }}>
        {/* Logo mark + wordmark */}
        <div className="site-brand" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="site-brand-mark-wrap" aria-hidden="true">
            <img src={logoMark} alt="" className="site-brand-mark-img" />
          </span>
          <div className="site-brand-wordmark" style={{ display: 'flex', flexDirection: 'column', gap: '0px', lineHeight: 1 }}>
            <span className="site-brand-primary" style={{
              fontFamily: "'Aboreto', system-ui, sans-serif",
              fontSize: '0.88rem',
              letterSpacing: '0.22em',
              color: 'rgba(232,224,248,0.92)',
              textTransform: 'uppercase',
              fontWeight: 400,
            }}>Essentia</span>
            <span className="site-brand-script" style={{
              fontFamily: "'Pinyon Script', Georgia, serif",
              fontSize: '1.5rem',
              letterSpacing: '0.04em',
              color: 'rgba(192,172,232,0.8)',
              lineHeight: 1.1,
              display: 'block',
            }}>Resonance</span>
          </div>
        </div>

        {/* Desktop nav links — services first, philosophy second */}
        <div style={{ display: 'flex', gap: 'clamp(18px,2.2vw,34px)', alignItems: 'center' }}
          className="hidden-mobile">
          {PRIMARY_NAV_ITEMS.map(({ label, href }) => (
            <a key={label} href={href} className="nav-link" style={{ color: 'rgba(216,208,240,0.65)' }}>{label}</a>
          ))}
        </div>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <a href="#enquire" className="nav-link hidden-mobile"
            style={{ color: 'rgba(201,164,101,0.8)', borderColor: 'rgba(201,164,101,0.4)' }}>
            Enquire
          </a>
          <button onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', flexDirection: 'column', gap: '5px' }}
            className="show-mobile" aria-label="Menu">
            <span style={{ display: 'block', width: '22px', height: '1px', background: 'rgba(232,224,248,0.8)', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }}/>
            <span style={{ display: 'block', width: '22px', height: '1px', background: 'rgba(232,224,248,0.8)', transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }}/>
            <span style={{ display: 'block', width: '22px', height: '1px', background: 'rgba(232,224,248,0.8)', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }}/>
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99,
          background: 'rgba(10,5,22,0.97)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: '40px',
        }}>
          {/* Logo in mobile menu */}
          <img src={logoMark} alt="" style={{ width: '52px', filter: 'invert(1) brightness(0.85) sepia(0.3) hue-rotate(220deg) saturate(1.5)', opacity: 0.7, marginBottom: '8px' }} />
          {[...PRIMARY_NAV_ITEMS, { label: 'Enquire', href: '#enquire' }].map(({ label, href }) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)} style={{
              fontFamily: "'Aboreto', system-ui, sans-serif",
              fontSize: '1.4rem',
              color: 'rgba(232,224,248,0.85)',
              textDecoration: 'none',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              transition: 'color 0.3s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#c9a465')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(232,224,248,0.85)')}>
              {label}
            </a>
          ))}
        </div>
      )}

      {/* ── Hero (redesigned) ─────────────────────────────── */}
      <HeroSection />

      {/* ── Service pathways — immediate orientation ───────── */}
      <section id="services" className="service-pathways" aria-label="Essentia Resonance services">
        <div className="service-pathways-inner">
          {[
            {
              n: '01',
              title: 'Bespoke Perfume',
              body: 'A one-to-one perfume created around your preferences, memories and individuality.',
              href: '#bespoke-perfume',
              futureRoute: '/bespoke-perfume',
            },
            {
              n: '02',
              title: 'Perfume Workshops',
              body: 'Guided sessions where you explore aromatic materials and compose your own fragrance.',
              href: '#workshops',
              futureRoute: '/workshops',
            },
            {
              n: '03',
              title: 'Olfactory Art & Experiences',
              body: 'Scent-led installations, collaborations and sensory experiences for groups, brands and cultural contexts.',
              href: '#olfactory-experiences',
              futureRoute: '/olfactory-experiences',
            },
          ].map((service, i) => (
            <a
              key={service.title}
              href={service.href}
              data-future-route={service.futureRoute}
              className={`service-pathway reveal reveal-delay-${i + 1 as 1 | 2 | 3}`}
            >
              <span className="service-pathway-number">{service.n}</span>
              <h2>{service.title}</h2>
              <p>{service.body}</p>
              <span className="service-pathway-link">Explore <span aria-hidden="true">→</span></span>
            </a>
          ))}
        </div>
      </section>

      {/* ── Philosophy — Between Material and Memory / The Ancient Art of Scent ── */}
      <section id="philosophy" className="philosophy-section">

        {/* Background logo contour — outer arch family at ~3% opacity */}
        <svg
          viewBox="0 0 100 60"
          aria-hidden="true"
          className="philosophy-watermark"
        >
          {[0.38, 0.60, 0.90, 1.35].map((scale, i) => {
            const fx = 4 + scale * 88, fy = 2.5 + scale * 55
            const ix = 4 - scale * 88, cy = 2.5 - scale * 111
            return (
              <path key={i}
                d={`M ${ix.toFixed(2)},${fy.toFixed(2)} C ${ix.toFixed(2)},${cy.toFixed(2)} ${fx.toFixed(2)},${cy.toFixed(2)} ${fx.toFixed(2)},${fy.toFixed(2)}`}
                fill="none" stroke="#2a2117" strokeWidth={0.45 - i * 0.04}
              />
            )
          })}
          <line x1="4" y1="4.98" x2="4" y2="9.14" stroke="#2a2117" strokeWidth="0.38" strokeLinecap="round" />
          <line x1="4" y1="9.14" x2="3.04" y2="10.5" stroke="#2a2117" strokeWidth="0.32" strokeLinecap="round" />
          <line x1="4" y1="9.14" x2="4.96" y2="10.5" stroke="#2a2117" strokeWidth="0.32" strokeLinecap="round" />
          <line x1="4" y1="9.14" x2="1.76" y2="11.14" stroke="#2a2117" strokeWidth="0.26" strokeLinecap="round" />
          <line x1="4" y1="9.14" x2="6.24" y2="11.14" stroke="#2a2117" strokeWidth="0.26" strokeLinecap="round" />
        </svg>

        <div className="philosophy-inner">
          <div className="philosophy-story-prelude">
            <span className="reveal philosophy-story-label">Philosophy</span>
            <h2 className="reveal reveal-delay-1 philosophy-story-title">
              <span>Between Material</span>
              <span className="philosophy-story-script">and Memory</span>
            </h2>
            <p className="reveal reveal-delay-2 philosophy-story-copy">
              From the moment a scent leaves its material and enters the air to the moment it becomes emotion or memory, a whole story exists in between. That space is where I create — between what a material is, and what it can awaken in us.
            </p>
          </div>

          <div className="reveal philosophy-kicker">
            <span>01 — The Ancient Art of Scent</span>
            <span className="gold-line philosophy-kicker-line" />
          </div>

          {/* Keep the founder's words, but use the width of the page more efficiently. */}
          <div className="philosophy-intro-grid">
            <p className="reveal philosophy-title">
              Before the bottle, before the formula — there is the material.
            </p>
            <p className="reveal reveal-delay-1 philosophy-intro-copy">
              Flowers picked in Grasse and Kannauj. Resins from the Boswellia forests of Ethiopia and the
              frankincense valleys of Oman. Roots from the Himalayas. Peels from Calabrian citrus. Bark and
              wood from old-growth forests across three continents. Long before modern perfumery abstracted
              scent into chemistry, these materials were traded across continents, used in ritual, medicine
              and adornment. At Essentia Resonance we return to that material reality — not as nostalgia,
              but as a richer way of knowing what you are wearing.
            </p>
          </div>

          <div className="philosophy-steps">
            <div aria-hidden="true" className="philosophy-steps-line" />

            {[
              {
                n: '01', title: 'Raw Material',
                body: 'We begin with flowers, resins, roots, peels, woods and spices gathered across different growing regions. Each material carries its own geography, history and character. Natural materials unfold in layers, changing as they are smelled, combined and allowed to develop into something more expressive than any single note alone.',
              },
              {
                n: '02', title: 'Memory',
                body: 'Scent often arrives before language. A material can return us to a person, a place or a moment we had almost forgotten. We work with these associations carefully, tracing the memories certain materials awaken and understanding how olfactory memory begins to shape what feels recognisably your own.',
              },
              {
                n: '03', title: 'Emotion',
                body: 'Fragrance is not only something we perceive; it can change the way a moment feels. Materials carry warmth, tension, familiarity, distance or comfort. Through composition, these impressions begin to form an emotional language — one that can feel intimate, precise and expressive without needing to explain itself in words.',
              },
              {
                n: '04', title: 'Formulation',
                body: 'Formulation is where these discoveries take physical form. Materials are selected, balanced and adjusted until they begin to speak together as one composition. The result is not simply a pleasant scent, but a structure shaped by material, memory, emotion and intention — distilled into something you can finally wear.',
              },
            ].map((step, i) => (
              <div key={step.n} className={`reveal reveal-delay-${i + 1 as 1 | 2 | 3 | 4} philosophy-step`}>
                <div className="philosophy-step-number">
                  <span>{step.n}</span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            ))}
          </div>

          <div className="reveal philosophy-closing">
            <blockquote className="philosophy-quote">
              <span className="philosophy-quote-line">“The scents we love — and the scents we don't —</span>
              <span className="philosophy-quote-line">tell more than the story of our own memories.</span>
              <span className="philosophy-quote-accent">They carry the stories of those who came before us.”</span>
            </blockquote>
            <div className="philosophy-founder">
              <img src={signatureSvg} alt="Signature of Sarthak Chadha" />
              <div>
                <div className="philosophy-founder-role">Founder &amp; Perfumer</div>
                <div className="philosophy-founder-name">Sarthak Chadha</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Memory Interlude — founder philosophy in a real scent moment ── */}
      <section className="memory-interlude" aria-label="Scent and memory">
        <img
          src={memoryMoment}
          alt="A participant closely examining an aromatic material during an Essentia Resonance olfactory session"
          className="memory-interlude-photo"
        />
        <div className="memory-interlude-overlay" aria-hidden="true" />
        <div className="memory-interlude-vignette" aria-hidden="true" />

        <div className="memory-interlude-shell">
          <div className="memory-interlude-logo-backdrop" aria-hidden="true">
            <span className="memory-interlude-logo-node" />
            <span className="memory-interlude-logo-ripple memory-interlude-logo-ripple--one" />
            <span className="memory-interlude-logo-ripple memory-interlude-logo-ripple--two" />
            <span className="memory-interlude-logo-sweep memory-interlude-logo-sweep--one" />
            <span className="memory-interlude-logo-sweep memory-interlude-logo-sweep--two" />
            <ResonanceLogoSvg className="memory-interlude-logo-backdrop-mark memory-interlude-logo-backdrop-mark--base" />
            <ResonanceLogoSvg className="memory-interlude-logo-backdrop-mark memory-interlude-logo-backdrop-mark--glow" />
          </div>
          <div className="memory-interlude-content reveal">
            <div className="memory-interlude-glass" aria-hidden="true" />
            <blockquote className="memory-interlude-quote memory-interlude-quote--tailored">
              <span className="memory-interlude-shimmer">Tailored</span>
              <span className="memory-interlude-bridge">to your</span>
              <span className="memory-interlude-shimmer">individuality.</span>
            </blockquote>
            <p className="memory-interlude-copy">
              What feels comforting to one person may feel distant, electric, or strangely familiar to another. Memory shapes part of that response; another part lies deeper, in the subtle inherited ways our bodies receive aroma. The same material unfolds differently in different people — which is why we compose not for an abstract wearer, but for you.
            </p>
            <p className="memory-interlude-copy-accent">We listen for those nuances — shaping each fragrance into a more intimate expression, tailored to your individuality.</p>
          </div>
        </div>

        <div className="memory-interlude-index" aria-hidden="true">
          <span>Material</span><i /> <span>Memory</span>
        </div>
      </section>

      {/* ── Botanical Notes — World Map ────────────────────── */}
      <section style={{ background: '#07050f', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ padding: 'clamp(64px,8vw,100px) clamp(24px,6vw,80px) 0' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px', marginBottom: '48px' }}>
            <div>
              <span className="reveal" style={{ fontFamily: "'DM Sans'", fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(201,164,101,0.6)' }}>
                02 — The Material World
              </span>
              <h2 className="reveal reveal-delay-1" style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontWeight: 100, fontStyle: 'italic',
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                color: '#f4ede0', margin: '16px 0 0 0',
                lineHeight: 1, letterSpacing: '-0.02em',
                fontVariationSettings: '"opsz" 144',
              }}>
                Botanical Origins
              </h2>
            </div>
            <p className="reveal reveal-delay-2" style={{
              fontFamily: "'DM Sans'", fontWeight: 300, fontSize: '0.88rem',
              color: 'rgba(244,237,224,0.38)', maxWidth: '320px',
              lineHeight: 1.85, textAlign: 'right',
            }}>
              Every material carries the culture, climate and history of its origin.
              Hover the map to explore where our palette comes from.
            </p>
          </div>
        </div>

        {/* Interactive World Map */}
        <div className="reveal" style={{ width: '100%' }}>
          <WorldMap />
        </div>

        {/* Origin legend strip */}
        <div style={{ padding: '32px clamp(24px,6vw,80px) clamp(48px,6vw,80px)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {[
              'Rose de Mai · Grasse', 'Bergamot · Calabria', 'Moroccan Rose · Atlas Mtns',
              'Frankincense · Oman', 'Jasmine Sambac · Kannauj', 'Boswellia · Ethiopia',
              'Ylang-Ylang · Madagascar', 'Patchouli · Sumatra', 'Vetiver · Haiti',
            ].map(tag => (
              <span key={tag} style={{
                fontFamily: "'DM Sans'", fontSize: '0.64rem', letterSpacing: '0.18em',
                color: 'rgba(201,164,101,0.45)', textTransform: 'uppercase',
                border: '1px solid rgba(201,164,101,0.12)', padding: '5px 12px',
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Atelier ──────────────────────────────────────── */}
      <section id="olfactory-experiences" style={{ background: '#130f0a', overflow: 'hidden' }}>

        {/* ── Research pillars: 3-panel horizontal strip ─────── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }} className="grid-collapse-3">

          {/* Panel 1 — Digital Olfaction */}
          <div style={{ position: 'relative', overflow: 'hidden', height: 'clamp(380px,52vw,580px)' }}>
            <img
              src={kidsOlfaction}
              alt="Child interacting with a colorful digital olfactory misting device"
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                objectPosition: 'center 55%',
                display: 'block', filter: 'brightness(0.72) saturate(0.75)',
              }}
            />
            {/* Strong gradient bottom-up so text is always legible */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(19,15,10,0.10) 0%, rgba(19,15,10,0.08) 38%, rgba(19,15,10,0.82) 68%, rgba(19,15,10,0.97) 100%)' }} />
            {/* Number tag */}
            <div style={{ position: 'absolute', top: '28px', left: '28px', fontFamily: "'DM Sans'", fontSize: '0.52rem', letterSpacing: '0.38em', textTransform: 'uppercase', color: 'rgba(201,164,101,0.65)' }}>01</div>
            {/* Text block */}
            <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', padding: '28px 28px 36px' }}>
              <h3 style={{
                fontFamily: "'Aboreto', system-ui, sans-serif",
                fontSize: '0.80rem', letterSpacing: '0.13em', fontWeight: 400,
                textTransform: 'uppercase', color: '#f0ebf8',
                margin: '0 0 14px 0',
              }}>Digital Olfaction</h3>
              <p style={{
                fontFamily: "'DM Sans'", fontWeight: 300,
                fontSize: '0.80rem', lineHeight: 1.80,
                color: 'rgba(244,237,224,0.82)', margin: 0,
              }}>
                Digital olfaction makes it possible to bring scent into spaces where it has never existed as
                a teachable sense. We see art rooms, music rooms, sports halls — but rarely a library of
                scents. We are building that.
              </p>
            </div>
          </div>

          {/* Panel 2 — Sensory Evaluation & Biometrics */}
          <div style={{ position: 'relative', overflow: 'hidden', height: 'clamp(380px,52vw,580px)', borderLeft: '1px solid rgba(19,15,10,0.9)', borderRight: '1px solid rgba(19,15,10,0.9)' }}>
            <img
              src={sarthakGlass}
              alt="Sarthak Chadha — sensory evaluation research, Kamp-Lintfort atelier"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 25%', display: 'block', filter: 'brightness(0.68) saturate(0.58)' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(19,15,10,0.10) 0%, transparent 28%, rgba(19,15,10,0.88) 100%)' }} />
            <div style={{ position: 'absolute', top: '28px', left: '28px', fontFamily: "'DM Sans'", fontSize: '0.52rem', letterSpacing: '0.38em', textTransform: 'uppercase', color: 'rgba(201,164,101,0.65)' }}>02</div>
            <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', padding: '28px 28px 36px' }}>
              <h3 style={{
                fontFamily: "'Aboreto', system-ui, sans-serif",
                fontSize: '0.80rem', letterSpacing: '0.13em', fontWeight: 400,
                textTransform: 'uppercase', color: '#f0ebf8',
                margin: '0 0 14px 0',
              }}>Sensory Evaluation</h3>
              <p style={{
                fontFamily: "'DM Sans'", fontWeight: 300,
                fontSize: '0.80rem', lineHeight: 1.80,
                color: 'rgba(244,237,224,0.55)', margin: '0 0 14px 0',
              }}>
                We research not only aromatic plant materials but their direct interaction with the human body.
                Using biometric feedback, we measure what scent does to your heart, your mind and your nervous system.
              </p>
              {/* ECG/EEG/EDA badge strip */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['ECG', 'EEG', 'EDA'].map(tag => (
                  <span key={tag} style={{
                    fontFamily: "'DM Sans'", fontSize: '0.54rem', letterSpacing: '0.22em',
                    border: '1px solid rgba(192,172,232,0.32)', padding: '3px 10px',
                    color: 'rgba(192,172,232,0.72)', textTransform: 'uppercase',
                  }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Panel 3 — Material Research */}
          <div style={{ position: 'relative', overflow: 'hidden', height: 'clamp(380px,52vw,580px)' }}>
            <img
              src={labExtraction}
              alt="Botanical material extraction — Essentia Resonance research lab"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 35%', display: 'block', filter: 'brightness(0.58) saturate(0.55)' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(19,15,10,0.18) 0%, transparent 28%, rgba(19,15,10,0.88) 100%)' }} />
            <div style={{ position: 'absolute', top: '28px', left: '28px', fontFamily: "'DM Sans'", fontSize: '0.52rem', letterSpacing: '0.38em', textTransform: 'uppercase', color: 'rgba(201,164,101,0.65)' }}>03</div>
            {/* Location badge top-right of panel 3 */}
            <div style={{
              position: 'absolute', top: '22px', right: '22px',
              border: '1px solid rgba(201,164,101,0.25)',
              padding: '7px 12px',
              backdropFilter: 'blur(6px)',
              background: 'rgba(10,7,20,0.50)',
            }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: '0.48rem', letterSpacing: '0.32em', color: 'rgba(201,164,101,0.62)', textTransform: 'uppercase' }}>Kamp-Lintfort · NRW</div>
            </div>
            <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', padding: '28px 28px 36px' }}>
              <h3 style={{
                fontFamily: "'Aboreto', system-ui, sans-serif",
                fontSize: '0.80rem', letterSpacing: '0.13em', fontWeight: 400,
                textTransform: 'uppercase', color: '#f0ebf8',
                margin: '0 0 14px 0',
              }}>Material Research</h3>
              <p style={{
                fontFamily: "'DM Sans'", fontWeight: 300,
                fontSize: '0.80rem', lineHeight: 1.80,
                color: 'rgba(244,237,224,0.55)', margin: 0,
              }}>
                At our lab in Germany we extract, fractionate and analyse botanical materials — understanding
                their chemistry, their complexity, and the therapeutic potential that no synthetic molecule can replicate.
              </p>
            </div>
          </div>
        </div>

        <div id="workshops" style={{ position: 'relative', top: '-68px' }} aria-hidden="true" />

        {/* Two-column text + secondary photos */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '560px' }} className="grid-collapse">

          {/* Text side */}
          <div style={{ padding: 'clamp(52px,7vw,100px) clamp(32px,6vw,80px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span className="reveal" style={{ fontFamily: "'DM Sans'", fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(201,164,101,0.6)', marginBottom: '32px', display: 'block' }}>
              03 — Perfume Workshops
            </span>
            <h2 className="reveal reveal-delay-1" style={{
              fontFamily: "'Fraunces', Georgia, serif", fontWeight: 100, fontStyle: 'italic',
              fontSize: 'clamp(2rem, 4.2vw, 3.8rem)', color: '#f4ede0',
              lineHeight: 1.1, margin: '0 0 28px 0', letterSpacing: '-0.02em',
            }}>
              A Day in the<br />Atelier
            </h2>
            <p className="reveal reveal-delay-2" style={{ fontFamily: "'DM Sans'", fontWeight: 300, fontSize: '0.93rem', color: 'rgba(244,237,224,0.60)', lineHeight: 1.92, marginBottom: '18px' }}>
              The Essentia Atelier in Kamp-Lintfort, NRW is where our practice lives — at the intersection
              of traditional perfumery and research into digital olfaction and human sensory experience.
              You will learn the fundamentals of how a perfume is structured, how to work safely with
              raw materials, and how to listen to your own instincts as a creative. This is not a
              demonstration — you are the one making the fragrance.
            </p>
            <p className="reveal reveal-delay-3" style={{ fontFamily: "'DM Sans'", fontWeight: 300, fontSize: '0.93rem', color: 'rgba(244,237,224,0.60)', lineHeight: 1.92, marginBottom: '44px' }}>
              Guided by our master perfumer through olfactive analysis, material exploration and accord
              construction, you compose something that could only come from you — an expression of your
              individuality in scent. Every participant leaves with their fragrance and a handwritten
              formula card that is theirs to keep.
            </p>

            {/* Session details */}
            <div className="reveal reveal-delay-4" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '44px' }}>
              {[
                { label: 'Duration',      value: '2 – 5 hours'    },
                { label: 'Group size',    value: 'Up to 15'        },
                { label: 'You create',    value: 'Your fragrance'  },
                { label: 'Formula card',  value: 'Yours to keep'   },
              ].map(d => (
                <div key={d.label} style={{ borderTop: '1px solid rgba(201,164,101,0.15)', paddingTop: '14px' }}>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: '0.58rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(244,237,224,0.32)', marginBottom: '6px' }}>{d.label}</div>
                  <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: 'italic', fontWeight: 300, fontSize: '1.18rem', color: '#f4ede0' }}>{d.value}</div>
                </div>
              ))}
            </div>

            <div className="reveal reveal-delay-4" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <a href="#enquire" className="cta-btn"><span>Enquire About a Workshop</span></a>
              <a href="#" style={{
                display: 'inline-flex', alignItems: 'center',
                fontFamily: "'DM Sans'", fontSize: '0.7rem', letterSpacing: '0.22em',
                textTransform: 'uppercase', color: 'rgba(244,237,224,0.42)',
                textDecoration: 'none', paddingBottom: '2px',
                borderBottom: '1px solid rgba(244,237,224,0.18)',
                transition: 'color 0.3s, border-color 0.3s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#c9a465'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(201,164,101,0.5)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(244,237,224,0.42)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(244,237,224,0.18)' }}>
                Workshop Enquiry
              </a>
            </div>
          </div>

          {/* Photo strip: two stacked real workshop images */}
          <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', minHeight: '560px', overflow: 'hidden' }}>
            <div style={{ overflow: 'hidden', position: 'relative' }}>
              <img
                src={workshopTalk}
                alt="Atelier group session — round table discussion"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 35%', display: 'block', filter: 'brightness(0.72) saturate(0.80)' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(19,15,10,0.14) 0%, transparent 60%)' }} />
            </div>
            <div style={{ overflow: 'hidden', position: 'relative', borderTop: '2px solid #130f0a' }}>
              <img
                src={workshopStanding}
                alt="Workshop participants in conversation with the perfumer"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 28%', display: 'block', filter: 'brightness(0.68) saturate(0.78)' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(19,15,10,0.14) 0%, transparent 60%)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Bespoke Perfume — Fragrance Portraits / Number Series ── */}
      <section id="bespoke-perfume" style={{ background: '#0e0b18', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '760px' }} className="grid-collapse">

          {/* Portrait image — image.png, full, unzoomed */}
          <div className="reveal-left" style={{ position: 'relative', overflow: 'hidden', minHeight: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0e0b18' }}>
            <img
              src={coupleScent}
              alt="Bespoke perfume consultation — Essentia Resonance"
              style={{
                width: '100%', height: '100%',
                objectFit: 'contain',
                objectPosition: 'center center',
                display: 'block',
                filter: 'brightness(0.88) saturate(0.80)',
              }}
            />
            {/* Portrait series badge */}
            <div style={{
              position: 'absolute', top: '32px', left: '32px',
              border: '1px solid rgba(201,164,101,0.36)',
              padding: '9px 16px',
              backdropFilter: 'blur(6px)',
              background: 'rgba(10,7,20,0.45)',
            }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: '0.52rem', letterSpacing: '0.40em', textTransform: 'uppercase', color: 'rgba(201,164,101,0.78)' }}>Fragrance Portraits · The Number Series</div>
            </div>
            {/* Number watermark */}
            <div style={{
              position: 'absolute', bottom: '24px', right: '32px',
              fontFamily: "'Fraunces', Georgia, serif", fontStyle: 'italic', fontWeight: 100,
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              color: 'rgba(201,164,101,0.08)', lineHeight: 1, userSelect: 'none',
            }}>N°—</div>
          </div>

          {/* Text side */}
          <div style={{ padding: 'clamp(60px,8vw,110px) clamp(32px,6vw,80px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#0e0b18' }}>
            <span className="reveal" style={{
              fontFamily: "'DM Sans'", fontSize: '0.62rem', letterSpacing: '0.40em',
              textTransform: 'uppercase', color: 'rgba(201,164,101,0.58)',
              marginBottom: '36px', display: 'block',
            }}>
              04 — Bespoke Perfume
            </span>

            <h2 className="reveal reveal-delay-1" style={{
              fontFamily: "'Fraunces', Georgia, serif", fontWeight: 100, fontStyle: 'italic',
              fontSize: 'clamp(2rem, 4.2vw, 3.8rem)', color: '#f4ede0',
              lineHeight: 1.1, margin: '0 0 12px 0', letterSpacing: '-0.02em',
            }}>
              Bespoke Perfume
            </h2>
            <div className="reveal reveal-delay-1" style={{
              fontFamily: "'Pinyon Script', Georgia, serif",
              fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)',
              color: 'rgba(201,164,101,0.70)', marginBottom: '32px', letterSpacing: '0.02em',
            }}>
              Fragrance Portraits · The Number Series · No. 46
            </div>

            <p className="reveal reveal-delay-2" style={{ fontFamily: "'DM Sans'", fontWeight: 300, fontSize: '0.93rem', color: 'rgba(244,237,224,0.58)', lineHeight: 1.92, marginBottom: '20px' }}>
              A bespoke perfume begins with a one-to-one consultation — an unhurried exploration of materials,
              preferences, memories and olfactive language. Together we move through the palette, uncovering what
              resonates: the notes, structures, concentrations and character your fragrance should take.
            </p>
            <p className="reveal reveal-delay-3" style={{ fontFamily: "'DM Sans'", fontWeight: 300, fontSize: '0.93rem', color: 'rgba(244,237,224,0.58)', lineHeight: 1.92, marginBottom: '44px' }}>
              After the session Sarthak develops the composition over several weeks. The final perfume — in a
              quantity and concentration decided together — is delivered to you and archived within Fragrance
              Portraits, the artistic Number Series. The current work is No. 46. The fragrance itself is yours.
            </p>

            {/* Portrait series stats */}
            <div className="reveal reveal-delay-4" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '48px', borderTop: '1px solid rgba(201,164,101,0.10)', paddingTop: '32px' }}>
              {[
                { label: 'Format',     value: 'One-to-one'   },
                { label: 'Duration',   value: '3 – 5 hours'  },
                { label: 'Delivery',   value: 'A few weeks'   },
                { label: 'Current series', value: 'No. 46'     },
              ].map(d => (
                <div key={d.label}>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: '0.56rem', letterSpacing: '0.30em', textTransform: 'uppercase', color: 'rgba(244,237,224,0.28)', marginBottom: '6px' }}>{d.label}</div>
                  <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: 'italic', fontWeight: 300, fontSize: '1.15rem', color: '#f4ede0' }}>{d.value}</div>
                </div>
              ))}
            </div>

            <div className="reveal reveal-delay-4" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <a href="#enquire" className="cta-btn"><span>Create Your Perfume</span></a>
              <a href="#" style={{
                display: 'inline-flex', alignItems: 'center',
                fontFamily: "'DM Sans'", fontSize: '0.68rem', letterSpacing: '0.22em',
                textTransform: 'uppercase', color: 'rgba(244,237,224,0.38)',
                textDecoration: 'none', paddingBottom: '2px',
                borderBottom: '1px solid rgba(244,237,224,0.15)',
                transition: 'color 0.3s, border-color 0.3s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#c9a465'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(201,164,101,0.5)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(244,237,224,0.38)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(244,237,224,0.15)' }}>
                About the Number Series →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Enquire ──────────────────────────────────────── */}
      <div id="formulation" style={{ position: 'relative', top: '-68px' }} aria-hidden="true" />
      <section id="enquire" style={{ background: '#f4ede0', padding: 'clamp(80px,10vw,140px) clamp(24px,8vw,120px)', position: 'relative', overflow: 'hidden' }}>
        {/* Faint contour watermark */}
        <svg aria-hidden="true" viewBox="0 0 100 60" style={{ position: 'absolute', top: '-5%', right: '-8%', width: '55%', height: 'auto', pointerEvents: 'none', opacity: 0.025 }}>
          {[0.55, 0.90, 1.35].map((s, i) => {
            const fx = 4 + s * 88, fy = 2.5 + s * 55
            const ix = 4 - s * 88, cy = 2.5 - s * 111
            return <path key={i} d={`M ${ix.toFixed(2)},${fy.toFixed(2)} C ${ix.toFixed(2)},${cy.toFixed(2)} ${fx.toFixed(2)},${cy.toFixed(2)} ${fx.toFixed(2)},${fy.toFixed(2)}`} fill="none" stroke="#2a2117" strokeWidth={0.42 - i * 0.06} />
          })}
        </svg>

        <div style={{ maxWidth: '960px', margin: '0 auto', position: 'relative' }}>
          <div className="reveal" style={{ marginBottom: '52px' }}>
            <span style={{ fontFamily: "'DM Sans'", fontSize: '0.62rem', letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(42,33,23,0.40)' }}>
              Enquire
            </span>
            <span className="gold-line" style={{ display: 'block', marginTop: '20px', maxWidth: '40px' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 'clamp(40px,6vw,100px)', alignItems: 'start' }} className="grid-collapse">
            {/* Left: copy */}
            <div>
              <h2 className="reveal reveal-delay-1" style={{
                fontFamily: "'Fraunces', Georgia, serif", fontWeight: 300, fontStyle: 'italic',
                fontSize: 'clamp(1.8rem, 3.5vw, 3.0rem)', color: '#2a2117',
                lineHeight: 1.18, margin: '0 0 28px 0', letterSpacing: '-0.01em',
                fontVariationSettings: '"opsz" 72, "SOFT" 30',
              }}>
                Begin your conversation with scent
              </h2>
              <p className="reveal reveal-delay-2" style={{ fontFamily: "'DM Sans'", fontWeight: 300, fontSize: '0.90rem', lineHeight: 1.90, color: 'rgba(42,33,23,0.62)', marginBottom: '32px' }}>
                Whether you are looking for a bespoke personalised perfume, a formulation for a perfume, cosmetic or
                aromatherapy product, a group atelier session or another olfactory collaboration, we respond personally to every enquiry.
              </p>
              <div className="reveal reveal-delay-3">
                {[
                  { label: 'Brand & Product Formulation', sub: 'Perfume, cosmetic & aromatherapy applications' },
                  { label: 'Bespoke Perfume', sub: 'Personalised perfume · Fragrance Portraits Number Series' },
                  { label: 'Workshop Atelier', sub: 'Groups of 2–15, Kamp-Lintfort' },
                  { label: 'Corporate & Events', sub: 'Bespoke group experiences' },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '18px' }}>
                    <span style={{ color: 'rgba(196,158,88,0.70)', marginTop: '2px', flexShrink: 0 }}>—</span>
                    <div>
                      <div style={{ fontFamily: "'Aboreto', system-ui, sans-serif", fontSize: '0.72rem', letterSpacing: '0.12em', color: '#2a2117', marginBottom: '2px' }}>{item.label}</div>
                      <div style={{ fontFamily: "'DM Sans'", fontSize: '0.72rem', color: 'rgba(42,33,23,0.48)', letterSpacing: '0.04em' }}>{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: form */}
            <form
              className="reveal reveal-delay-2"
              action="https://formspree.io/f/xoeqvywn"
              method="POST"
              style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
            >
                <input
                  type="hidden"
                  name="_subject"
                  value="New Essentia Resonance Website Enquiry"
                />

                {/* Honeypot field for basic bot filtering */}
                <input
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
                />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="grid-collapse">
                  <div>
                    <label
                      htmlFor="enquiry-name"
                      style={{ display: 'block', fontFamily: "'DM Sans'", fontSize: '0.58rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(42,33,23,0.40)', marginBottom: '10px' }}
                    >
                      Your Name
                    </label>
                    <input
                      id="enquiry-name"
                      type="text"
                      name="name"
                      placeholder="Full name"
                      autoComplete="name"
                      required
                      style={{
                        width: '100%', background: 'transparent',
                        border: 'none', borderBottom: '1px solid rgba(42,33,23,0.22)',
                        color: '#2a2117', fontFamily: "'DM Sans'", fontSize: '0.88rem',
                        padding: '10px 0', outline: 'none',
                        transition: 'border-color 0.3s',
                      }}
                      onFocus={e => (e.currentTarget.style.borderBottomColor = '#c9a465')}
                      onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(42,33,23,0.22)')}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="enquiry-email"
                      style={{ display: 'block', fontFamily: "'DM Sans'", fontSize: '0.58rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(42,33,23,0.40)', marginBottom: '10px' }}
                    >
                      Email Address
                    </label>
                    <input
                      id="enquiry-email"
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                      style={{
                        width: '100%', background: 'transparent',
                        border: 'none', borderBottom: '1px solid rgba(42,33,23,0.22)',
                        color: '#2a2117', fontFamily: "'DM Sans'", fontSize: '0.88rem',
                        padding: '10px 0', outline: 'none',
                        transition: 'border-color 0.3s',
                      }}
                      onFocus={e => (e.currentTarget.style.borderBottomColor = '#c9a465')}
                      onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(42,33,23,0.22)')}
                    />
                  </div>
                </div>

                {/* Enquiry type */}
                <div>
                  <label
                    htmlFor="enquiry-type"
                    style={{ display: 'block', fontFamily: "'DM Sans'", fontSize: '0.58rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(42,33,23,0.40)', marginBottom: '10px' }}
                  >
                    Type of Enquiry
                  </label>
                  <select
                    id="enquiry-type"
                    name="enquiryType"
                    required
                    defaultValue=""
                    style={{
                      width: '100%', background: 'transparent',
                      border: 'none', borderBottom: '1px solid rgba(42,33,23,0.22)',
                      color: 'rgba(42,33,23,0.72)', fontFamily: "'DM Sans'", fontSize: '0.88rem',
                      padding: '10px 0', outline: 'none', appearance: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="">Select an enquiry type…</option>
                    <option value="Brand or Product Formulation">Brand or Product Formulation</option>
                    <option value="Bespoke / Personalised Perfume">Bespoke / Personalised Perfume</option>
                    <option value="Perfume Workshop">Perfume Workshop</option>
                    <option value="Olfactory Art & Experiences">Olfactory Art &amp; Experiences</option>
                    <option value="Olfactory Consultation">Olfactory Consultation</option>
                    <option value="Something else">Something else</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="enquiry-message"
                    style={{ display: 'block', fontFamily: "'DM Sans'", fontSize: '0.58rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(42,33,23,0.40)', marginBottom: '10px' }}
                  >
                    Your Message
                  </label>
                  <textarea
                    id="enquiry-message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Tell us a little about what you are looking for…"
                    style={{
                      width: '100%', background: 'transparent',
                      border: 'none', borderBottom: '1px solid rgba(42,33,23,0.22)',
                      color: '#2a2117', fontFamily: "'DM Sans'", fontSize: '0.88rem',
                      padding: '10px 0', outline: 'none', resize: 'none',
                      lineHeight: 1.8,
                      transition: 'border-color 0.3s',
                    }}
                    onFocus={e => (e.currentTarget.style.borderBottomColor = '#c9a465')}
                    onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(42,33,23,0.22)')}
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="hero-btn-secondary"
                    style={{
                      color: '#2a2117',
                      borderColor: 'rgba(42,33,23,0.30)',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = '#c9a465'
                      e.currentTarget.style.background = 'rgba(201,164,101,0.06)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(42,33,23,0.30)'
                      e.currentTarget.style.background = 'transparent'
                    }}
                  >
                    <span style={{ fontFamily: "'DM Sans'", fontSize: '0.70rem', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
                      Send Enquiry
                    </span>
                  </button>

                  <p style={{ fontFamily: "'DM Sans'", fontSize: '0.68rem', color: 'rgba(42,33,23,0.38)', marginTop: '14px', lineHeight: 1.7 }}>
                    We respond personally to every message. Usually within 48 hours.
                  </p>
                </div>
              </form>
          </div>
        </div>
      </section>

      {/* ── Sensory Language ─────────────────────────────── */}
      <section style={{
        background: `url('https://images.unsplash.com/photo-1586875401592-64f1d5cb43e4?w=1800&h=900&fit=crop&auto=format') center/cover no-repeat`,
        position: 'relative', padding: 'clamp(100px,14vw,180px) clamp(24px,6vw,80px)',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(19,15,10,0.88)' }}/>
        <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <div className="quote-mark reveal" style={{ marginBottom: '0px' }}>"</div>
          <blockquote className="reveal reveal-delay-1" style={{
            fontFamily: "'Fraunces', Georgia, serif", fontWeight: 100, fontStyle: 'italic',
            fontSize: 'clamp(1.5rem, 4vw, 3rem)', color: '#f4ede0',
            lineHeight: 1.35, margin: '0 0 48px 0', letterSpacing: '-0.01em',
          }}>
            The first breath of a new fragrance is one of the last genuinely
            untranslatable human experiences. Nothing can prepare you for it.
          </blockquote>
          <div className="gold-line reveal reveal-delay-2" style={{ maxWidth: '200px', margin: '0 auto 32px' }}/>
          <div className="reveal reveal-delay-3" style={{ fontFamily: "'DM Sans'", fontSize: '0.72rem', letterSpacing: '0.3em', color: 'rgba(201,164,101,0.7)', textTransform: 'uppercase' }}>
            Mara Selin — Workshop Guest, 2024
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────── */}
      <section style={{ background: '#1e1810', padding: 'clamp(80px,10vw,140px) clamp(24px,6vw,80px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '80px' }}>
            <span className="reveal" style={{ fontFamily: "'DM Sans'", fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(201,164,101,0.6)' }}>05 — Voices</span>
            <h2 className="reveal reveal-delay-1" style={{
              fontFamily: "'Fraunces', Georgia, serif", fontWeight: 100, fontStyle: 'italic',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: '#f4ede0',
              lineHeight: 1, margin: '16px 0 0 0', letterSpacing: '-0.02em',
            }}>
              From the Atelier
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px' }}>
            {[
              { text: "I've attended perfume masterclasses across Paris and Tokyo. Nothing comes close to the intimacy and depth of an Essentia session. My fragrance still makes people stop me on the street to ask what I'm wearing.", name: 'Chiara B.', role: 'Art Curator, Milan' },
              { text: "The workshop changed how I understand smell entirely. Our master perfumer speaks about notes the way a wine sommelier speaks about terroir. It's a completely new sensory vocabulary.", name: 'Thomas R.', role: 'Architect, Berlin' },
              { text: "I gave this as a gift to my partner for our anniversary. She still describes it as the most meaningful gift she's received. The fragrance she created captures something I don't have words for.", name: 'Priya M.', role: 'Writer, London' },
            ].map((t, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1}`}
                style={{ borderTop: '1px solid rgba(201,164,101,0.15)', paddingTop: '32px' }}>
                <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 300, fontStyle: 'italic', fontSize: '1.05rem', color: 'rgba(244,237,224,0.75)', lineHeight: 1.75, margin: '0 0 28px 0' }}>"{t.text}"</p>
                <div style={{ fontFamily: "'DM Sans'", fontSize: '0.72rem', letterSpacing: '0.15em', color: '#c9a465', textTransform: 'uppercase', marginBottom: '4px' }}>{t.name}</div>
                <div style={{ fontFamily: "'DM Sans'", fontSize: '0.7rem', color: 'rgba(244,237,224,0.3)', letterSpacing: '0.1em' }}>{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process Timeline ─────────────────────────────── */}
      <section style={{ background: '#f4ede0', padding: 'clamp(80px,10vw,140px) clamp(24px,6vw,80px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '80px' }}>
            <span className="reveal" style={{ fontFamily: "'DM Sans'", fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(42,33,23,0.4)' }}>06 — The Process</span>
            <h2 className="reveal reveal-delay-1" style={{
              fontFamily: "'Fraunces', Georgia, serif", fontWeight: 100, fontStyle: 'italic',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: '#2a2117',
              lineHeight: 1, margin: '16px 0 0 0', letterSpacing: '-0.02em',
            }}>
              How It Unfolds
            </h2>
          </div>
          <div style={{ position: 'relative' }}>
            {/* Vertical line */}
            <div className="gold-line reveal" style={{
              position: 'absolute', left: '19px', top: '12px', bottom: '12px',
              width: '1px', height: 'auto', maxWidth: 'none',
              background: 'linear-gradient(180deg, #c9a465 0%, rgba(201,164,101,0.1) 100%)',
            }}/>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
              {[
                { step: '01', title: 'The Consultation', desc: 'A one-hour sensory interview. We map your olfactory memory — the landscapes, people, and moments that have shaped your relationship with scent.' },
                { step: '02', title: 'The Exploration', desc: 'You encounter over 80 curated raw materials. Not to identify them, but to feel them. To notice what each one awakens in you.' },
                { step: '03', title: 'The Composition', desc: 'Guided by our perfumer, you construct your accord on a digital blending scale with sub-milligram precision. Three hours of iterative craft.' },
                { step: '04', title: 'The Maturation', desc: 'Your formula rests for four weeks as the molecules harmonise. We call you when it is ready. Your fragrance arrives by courier in hand-finished packaging.' },
              ].map((p, i) => (
                <div key={i} className={`reveal reveal-delay-${i % 2 + 1}`}
                  style={{ display: 'flex', gap: '48px', alignItems: 'flex-start', paddingLeft: '60px', position: 'relative' }}>
                  <div style={{
                    position: 'absolute', left: '0', top: '0',
                    width: '40px', height: '40px', borderRadius: '50%',
                    border: '1px solid rgba(201,164,101,0.5)',
                    background: '#f4ede0',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ fontFamily: "'DM Sans'", fontSize: '0.6rem', letterSpacing: '0.1em', color: '#c9a465' }}>{p.step}</span>
                  </div>
                  <div style={{ maxWidth: '600px' }}>
                    <h3 style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 300, fontStyle: 'italic', fontSize: '1.6rem', color: '#2a2117', margin: '0 0 16px 0' }}>{p.title}</h3>
                    <p style={{ fontFamily: "'DM Sans'", fontWeight: 300, fontSize: '0.95rem', color: 'rgba(42,33,23,0.65)', lineHeight: 1.85, margin: 0 }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer / Newsletter ───────────────────────────── */}
      <footer style={{ background: '#130f0a', padding: 'clamp(80px,10vw,140px) clamp(24px,6vw,80px) 48px', position: 'relative', overflow: 'hidden' }}>
        <CircleOrb style={{ position: 'absolute', top: '-60px', right: '-60px', width: '400px', opacity: 0.06, pointerEvents: 'none' }}/>
        <LeafSvg style={{ position: 'absolute', bottom: '10%', left: '-20px', width: '200px', opacity: 0.08, pointerEvents: 'none' }}/>

        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Newsletter */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', marginBottom: '100px', alignItems: 'start' }} className="grid-collapse">
            <div>
              <h2 className="reveal" style={{
                fontFamily: "'Fraunces', Georgia, serif", fontWeight: 100, fontStyle: 'italic',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#f4ede0',
                lineHeight: 1.1, margin: '0 0 24px 0', letterSpacing: '-0.02em',
              }}>
                Notes from the<br/>Studio
              </h2>
              <p className="reveal reveal-delay-1" style={{ fontFamily: "'DM Sans'", fontWeight: 300, fontSize: '0.9rem', color: 'rgba(244,237,224,0.45)', lineHeight: 1.8, margin: 0 }}>
                Irregular dispatches — new ingredient arrivals, seasonal compositions,
                workshop openings, and meditations on the nature of smell.
              </p>
            </div>
            <div className="reveal reveal-delay-2" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              {subscribed ? (
                <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: 'italic', fontWeight: 300, fontSize: '1.4rem', color: '#c9a465' }}>
                  You are on the list.
                </div>
              ) : (
                <>
                  <label style={{ fontFamily: "'DM Sans'", fontSize: '0.62rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(244,237,224,0.35)', marginBottom: '12px', display: 'block' }}>Your correspondence address</label>
                  <div style={{ display: 'flex', gap: '0', alignItems: 'flex-end' }}>
                    <input
                      type="email" className="email-input"
                      placeholder="you@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && setSubscribed(true)}
                    />
                    <button onClick={() => setSubscribed(true)} style={{
                      background: 'none', border: 'none', borderBottom: '1px solid rgba(201,164,101,0.5)',
                      color: '#c9a465', cursor: 'pointer', padding: '10px 16px',
                      fontFamily: "'DM Sans'", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                      transition: 'color 0.3s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#ddbf87')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#c9a465')}>
                      Subscribe
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Footer nav */}
          <div style={{ borderTop: '1px solid rgba(201,164,101,0.1)', paddingTop: '48px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '40px' }} className="grid-collapse-4">
            <div>
              <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: 'italic', fontWeight: 300, fontSize: '1.1rem', color: '#f4ede0', marginBottom: '4px' }}>Essentia</div>
              <div style={{ fontFamily: "'DM Sans'", fontSize: '0.55rem', letterSpacing: '0.4em', color: 'rgba(201,164,101,0.6)', textTransform: 'uppercase' }}>Resonance</div>
            </div>
            {[
              { title: 'Explore', links: ['Philosophy', 'Collections', 'Ingredients', 'The Process'] },
              { title: 'Experience', links: ['Workshop Sessions', 'Bespoke Commission', 'Corporate Events', 'Gift Vouchers'] },
              { title: 'Studio', links: ['London Atelier', 'Contact', 'Press', 'Stockists'] },
            ].map(col => (
              <div key={col.title}>
                <div style={{ fontFamily: "'DM Sans'", fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,164,101,0.5)', marginBottom: '20px' }}>{col.title}</div>
                {col.links.map(l => (
                  <a key={l} href="#" style={{
                    display: 'block', fontFamily: "'DM Sans'", fontWeight: 300, fontSize: '0.82rem',
                    color: 'rgba(244,237,224,0.45)', textDecoration: 'none', marginBottom: '12px',
                    transition: 'color 0.3s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#f4ede0')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(244,237,224,0.45)')}>
                    {l}
                  </a>
                ))}
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: '1px solid rgba(201,164,101,0.08)', paddingTop: '32px', marginTop: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <span style={{ fontFamily: "'DM Sans'", fontSize: '0.65rem', color: 'rgba(244,237,224,0.25)', letterSpacing: '0.1em' }}>
              © 2026 Essentia Resonance Ltd. All rights reserved.
            </span>
            <span style={{ fontFamily: "'DM Sans'", fontSize: '0.65rem', color: 'rgba(244,237,224,0.2)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              London · Paris · Kyoto
            </span>
          </div>
        </div>
      </footer>

      {/* ── Responsive styles ────────────────────────────── */}
      <style>{`
        @media (max-width: 900px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
          .grid-collapse { grid-template-columns: 1fr !important; }
          .grid-collapse-3 { grid-template-columns: 1fr !important; }
          .grid-collapse-4 { grid-template-columns: 1fr 1fr !important; }
          .cursor-dot, .cursor-ring { display: none !important; }
        }
        @media (min-width: 901px) {
          .show-mobile { display: none !important; }
        }
        @media (max-width: 600px) {
          .grid-collapse-4 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
