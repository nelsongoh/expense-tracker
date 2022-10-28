const Styles = () => ({
  mobile: {
    parentGrid: {
      marginTop: 5,
      marginLeft: 1,
      marginRight: 1,
      marginBottom: 1,
    }
  },
  card: (cardIdx) => {
    const colorArr = [
      "#F5BFD2",  // Azalea (Pink) 
      "#5784BA",  // Steel Blue
      "#BEB4C5",  // Chatelle (Purple)
      "#CCD4Bf",  // Pale Leaf (Green) 
      "#E6A57E",  // Tony's Pink (Orange)
      "#EEBAB2",  // Zinnwaldite (Red) 
      "#FEC8D8", 
      "#FFDFD3",
      "#A1CDCE",  // Jungle Mist (Cyan),
      "#DBBC8E",  // Brandy (Yellow)
    ];

    return {
      fontSize: 120,
      color: colorArr[cardIdx % colorArr.length]
    };
  },
  defaultCard: {
    fontSize: 100,
  }
});

export default Styles;