export const COLORS = {
  neutrals: [
    "#FAF9F7", // neutral-00
    "#E8E6E1", // neutral-01
    "#D3CEC4", // neutral-02
    "#B8B2A7", // neutral-03
    "#A39E93", // neutral-04
    "#857F72", // neutral-05
    "#625D52", // neutral-06
    "#504A40", // neutral-07
    "#423D33", // neutral-08
    "#27241D" // neutral-09
  ],
  primaryGreen: [
    "#E3F9E5", // primary-00
    "#C1F2C7", // primary-01
    "#91E697", // primary-02
    "#51CA58", // primary-03
    "#31B237", // primary-04
    "#18981D", // primary-05
    "#16831F", // primary-06
    "#0E7817", // primary-07
    "#07600E", // primary-08
    "#014807" // primary-09
  ],
  secondaryRed: [
    "#FFEEEE", // secondary-red-00
    "#FACDCD", // secondary-red-01
    "#F29B9B", // secondary-red-02
    "#E66A6A", // secondary-red-03
    "#D64545", // secondary-red-04
    "#BA2525", // secondary-red-05
    "#A61B1B", // secondary-red-06
    "#911111", // secondary-red-07
    "#780A0A", // secondary-red-08
    "#610404" // secondary-red-09
  ],
  secondaryYellow: [
    "#FFFAEB", // secondary-yellow-00
    "#FCEFC7", // secondary-yellow-01
    "#F8E3A3", // secondary-yellow-02
    "#F9DA8B", // secondary-yellow-03
    "#F7D070", // secondary-yellow-04
    "#E9B949", // secondary-yellow-05
    "#C99A2E", // secondary-yellow-06
    "#AC831B", // secondary-yellow-07
    "#8B6913", // secondary-yellow-08
    "#513C06" // secondary-yellow-09
  ],
  secondaryPurple: [
    "#EAE2F8", // secondary-purple-00
    "#CFBCF2", // secondary-purple-01
    "#A081D9", // secondary-purple-02
    "#8662C7", // secondary-purple-03
    "#724BB7", // secondary-purple-04
    "#653CAD", // secondary-purple-05
    "#51279B", // secondary-purple-06
    "#421987", // secondary-purple-07
    "#34126F", // secondary-purple-08
    "#240754" // secondary-purple-09
  ]
};

export const LIGHT_COLORS = [
  ...COLORS.primaryGreen.slice(0, 5),
  ...COLORS.secondaryRed.slice(0, 5),
  ...COLORS.secondaryYellow.slice(0, 5),
  ...COLORS.secondaryPurple.slice(0, 5)
];
