const Images = [
    { image: require("./../src/Assets/Images/place1.png") },
    { image: require("./../src/Assets/Images/place2.png") },
    { image: require("./../src/Assets/Images/place3.png") },
    { image: require("./../src/Assets/Images/place1.png") },
];

const Drinks = [
  { image: require("./../src/Assets/Images/1.png"), name: 'French 75', price: '$ 18' },
  { image: require("./../src/Assets/Images/2.png"), name: 'Moscow Mule', price: '$ 34' },
  { image: require("./../src/Assets/Images/3.png"), name: 'Negroni', price: '$ 20' },
  { image: require("./../src/Assets/Images/4.png"), name: 'Peeepsiii', price: '$ 40' },
  { image: require("./../src/Assets/Images/5.png"), name: 'Jam e Sheri', price: '$ 50' },
]

export const markers = [
    {
      name: 'Ahsan Muneer',
      profileImage: require('./../src/Assets/Images/pic5.png'),
      coordinate: {
        latitude: 24.7931192,
        longitude: 67.0665601,
      },
      title: "Amazing Food Place",
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque est metus, gravida vel ex volutpat, posuere euismod tortor. Pellentesque tincidunt, mi ac varius blandit, quam orci dignissim risus, vitae rutrum orci urna ut neque.
      
      Pellentesque condimentum ut libero id blandit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.`,
      image: Images[0].image,
      rating: 1,
      reviews: 99,
      distance: '0.5 mi',
      items: Drinks, 
      Address: '2464 Royal Ln. Mesa, New Jersy 454663'
    },
    {
      name: 'Mohsin',
      profileImage: require('./../src/Assets/Images/pic4.png'),
      coordinate: {
        latitude: 24.7955933,
        longitude: 67.063902,
      },
      title: "Second Amazing Food Place",
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque est metus, gravida vel ex volutpat, posuere euismod tortor. Pellentesque tincidunt, mi ac varius blandit, quam orci dignissim risus, vitae rutrum orci urna ut neque.
      
      Pellentesque condimentum ut libero id blandit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.`,
      image: Images[1].image,
      rating: 5,
      reviews: 102,
      distance: '0.1 mi',
      items: Drinks,
      Address: '2464 Royal Ln. Mesa, New Jersy 454663'
    },
    {
      name: 'Hammad',
      profileImage: require('./../src/Assets/Images/pic3.png'),
      coordinate: {
        latitude: 24.795038,
        longitude: 67.0646289,
      },
      title: "Third Amazing Food Place",
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque est metus, gravida vel ex volutpat, posuere euismod tortor. Pellentesque tincidunt, mi ac varius blandit, quam orci dignissim risus, vitae rutrum orci urna ut neque.
      
      Pellentesque condimentum ut libero id blandit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.`,
      image: Images[2].image,
      rating: 2,
      reviews: 220,
      distance: '0.8 mi',
      items: Drinks,
      Address: '2464 Royal Ln. Mesa, New Jersy 454663'
    },
    {
      name: 'Da',
      profileImage: require('./../src/Assets/Images/pic2.png'),
      coordinate: {
        latitude: 24.7936581,
        longitude: 67.0623128,
      },
      title: "Fourth Amazing Food Place",
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque est metus, gravida vel ex volutpat, posuere euismod tortor. Pellentesque tincidunt, mi ac varius blandit, quam orci dignissim risus, vitae rutrum orci urna ut neque.
      
      Pellentesque condimentum ut libero id blandit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.`,
      image: Images[3].image,
      rating: 4,
      reviews: 48,
      distance: '0.9 mi',
      items: Drinks,
      Address: '2464 Royal Ln. Mesa, New Jersy 454663'
    },
    {
      name: 'Ahsan Muneer',
      profileImage: require('./../src/Assets/Images/pic1.png'),
      coordinate: {
        latitude: 24.795038,
        longitude: 67.0633052,
      },
      title: "Fifth Amazing Food Place",
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque est metus, gravida vel ex volutpat, posuere euismod tortor. Pellentesque tincidunt, mi ac varius blandit, quam orci dignissim risus, vitae rutrum orci urna ut neque.
      
      Pellentesque condimentum ut libero id blandit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.`,
      image: Images[3].image,
      rating: 4,
      reviews: 178,
      distance: '0.5 mi',
      items: Drinks,
    },
];

export const mapDarkStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#181818"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1b1b1b"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#2c2c2c"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8a8a8a"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#373737"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#3c3c3c"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#4e4e4e"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#3d3d3d"
        }
      ]
    }
  ];

  export const mapStandardStyle = [
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
  ];

