var condition = {
  "belle" : [
    "ensoleille",
    "nuit-claire",
    "nuit-legerement-voilee",
    "faibles-passages-nuageux",
    "nuit-bien-degagee",
    "nuit-claire-et-stratus",
    "eclaircies",
    "faiblement-nuageux"
  ],
  "mitigee": [
    "ciel-voile",
    "brouillard",
    "stratus",
    "stratus-se-dissipant",
    "nuit-nuageuse",
    "fortement-nuageux",
    "averses-de-pluie-faible",
    "pluie-faible",
    "developpement-nuageux",
    "nuit-avec-developpement-nuageux",
    "averses-de-neige-faible",
    "nuit-avec-averses-de-neige-faible",
    "neige-faible"
  ],
  "mauvaise": [
    "nuit-avec-averses",
    "averses-de-pluie-moderee",
    "averses-de-pluie-forte",
    "couvert-avec-averses",
    "pluie-forte",
    "pluie-moderee",
    "faiblement-orageux",
    "nuit-faiblement-orageuse",
    "orage-modere",
    "fortement-orageux",
    "neige-moderee",
    "neige-forte",
    "pluie-et-neige-mêlée-faible",
    "pluie-et-neige-mêlée-modérée",
    "pluie-et-neige-mêlée-forte"
  ]
};


exports.getFilters = function(req, res){
    res.json({success: true, data: 
        [
            {
              id: 0,
              display_name: 'Shops',
              name: 'Shops',
              condition: condition.mitigee.concat(condition.mauvaise),
              children: [
                {
                  id: 4,
                  name: 'Restaurant',
                  display_name: 'Restaurant',
                  children: [
                    {
                      id: 9,
                      name: 'French Traditional',
                      display_name: 'French Traditional Restaurant'
                    },
                    {
                      id: 10,
                      name: 'Fast Food',
                      display_name: 'Fast Food Restaurant',
                      children: [
                          {
                            id: 13,
                            name: 'Sat',
                            display_name: 'Sat Fast Food Restaurant'
                        },
                        {
                          id: 14,
                            name: 'Standing',
                            display_name: 'Standing Fast Food Restaurant'
                        }
                      ]
                    }
                  ]
                },
                {
                  id: 5,
                  name: 'Beverage',
                  display_name: 'Beverage',
                  children: [
                    {
                      id: 11,
                      name: 'Bar/Coffee',
                      display_name: 'Bar/Coffee Beverage'
                    },
                    {
                      id: 12,
                      name: 'Tea',
                      display_name: 'Tea Beverage'
                    }
                  ]
                },
                {
                  id: 6,
                  name: 'Art Gallery',
                  display_name: 'Art Gallery'
                },
                {
                  id: 7,
                  name: 'Local Product',
                  display_name: 'Local Product'
                },
                {
                  id: 8,
                  name: 'Souvenir',
                  display_name: 'Souvenir'
                }
              ]
            },
            {
              id: 1,
              name: 'Touristiques area',
              display_name: 'Touristiques area',
              condition: condition.belle
            },
            {
              id: 2,
              name: 'Museums',
              display_name: 'Museums',
              condition: condition.mauvaise
            },
            {
              id: 3,
              name: 'Toilets',
              display_name: 'Toilets'
            },
            {
              id: 15,
              name: 'Events',
              display_name: 'Events',
              condition: condition.belle.concat(condition.mitigee),
              children: [
                {
                  id: 16,
                  name: 'Animations',
                  display_name: 'Animations Event',
                  children: [
                    {
                      id: 17,
                      name: 'Walk',
                      display_name: 'Walk Animation Event'
                    },
                    {
                      id: 18,
                      name: 'Workshop, Course',
                      display_name: 'Workshop, Course Animation Event'
                    },
                    {
                      id: 19,
                      name: 'Conference / Debate',
                      display_name: 'Conference / Debate Animation Event'
                    },
                    {
                      id: 20,
                      name: 'Reading / Meeting',
                      display_name: 'Reading / Meeting Animation Event'
                    },
                    {
                      id: 21,
                      name: 'Traineeship',
                      display_name: 'Traineeship Animation Event'
                    },
                    {
                      id: 22,
                      name: 'Guided tour',
                      display_name: 'Guided tour Animation Event'
                    },
                    {
                      id: 23,
                      name: 'Hobbies / Games',
                      display_name: 'Hobbies / Games Animation Event'
                    },
                    {
                      id: 24,
                      name: 'Other animation',
                      display_name: 'Other animation Animation Event'
                    }
                  ]
                },
                {
                  id: 25,
                  name: 'Shows',
                  display_name: 'Shows Event',
                  children: [
                    {
                      id: 26,
                      name: 'Humor',
                      display_name: 'Humor Shows Event'
                    },
                    {
                      id: 27,
                      name: 'Dance',
                      display_name: 'Dance Shows Event'
                    },
                    {
                      id: 28,
                      name: 'Theater',
                      display_name: 'Theater Shows Event'
                    },
                    {
                      id: 29,
                      name: 'Projection',
                      display_name: 'Projection Shows Event'
                    },
                    {
                      id: 30,
                      name: 'Circus / Street Art',
                      display_name: 'Circus / Street Art Shows Event'
                    },
                    {
                      id: 31,
                      name: 'Young audience',
                      display_name: 'Young audience Shows Event'
                    },
                    {
                      id: 32,
                      name: 'Opera / Musical',
                      display_name: 'Opera / Musical Shows Event'
                    },
                    {
                      id: 33,
                      name: 'Other show',
                      display_name: 'Other show Event'
                    }
                  ]
                },
                {
                  id: 34,
                  name: 'Expositions',
                  display_name: 'Expositions Event',
                  children: [
                    {
                      id: 35,
                      name: 'Photography',
                      display_name: 'Photography Expositions Event'
                    },
                    {
                      id: 36,
                      name: 'Beaux-Arts',
                      display_name: 'Beaux-Arts Expositions Event'
                    },
                    {
                      id: 37,
                      name: 'Contemporary art',
                      display_name: 'Contemporary art Expositions Event'
                    },
                    {
                      id: 38,
                      name: 'Street-art',
                      display_name: 'Street-art Expositions Event'
                    },
                    {
                      id: 39,
                      name: 'History / Civilizations',
                      display_name: 'History / Civilizations Expositions Event'
                    },
                    {
                      id: 40,
                      name: 'Illustration / comic',
                      display_name: 'Illustration / comic Expositions Event'
                    },
                    {
                      id: 41,
                      name: 'Other expositions',
                      display_name: 'Other expositions Event'
                    }
                  ]
                },
                {
                  id: 41,
                  name: 'Concerts',
                  display_name: 'Concerts Event',
                  children: [
                    {
                      id: 42,
                      name: 'Classical',
                      display_name: 'Classical Concerts Event'
                    },
                    {
                      id: 43,
                      name: 'French song',
                      display_name: 'French song Concerts Event'
                    },
                    {
                      id: 44,
                      name: 'Pop / Variety',
                      display_name: 'Pop / Variety Concerts Event'
                    },
                    {
                      id: 45,
                      name: 'Rock',
                      display_name: 'Rock Concerts Event'
                    },
                    {
                      id: 46,
                      name: 'Jazz',
                      display_name: 'Jazz Concerts Event'
                    },
                    {
                      id: 47,
                      name: 'World music',
                      display_name: 'World music Concerts Event'
                    },
                    {
                      id: 48,
                      name: 'Electronic',
                      display_name: 'Electronic Concerts Event'
                    },
                    {
                      id: 49,
                      name: 'Folk',
                      display_name: 'Folk Concerts Event'
                    },
                    {
                      id: 50,
                      name: 'Hip-Hop',
                      display_name: 'Hip-Hop Concerts Event'
                    },
                    {
                      id: 51,
                      name: 'Reggae',
                      display_name: 'Reggae Concerts Event'
                    },
                    {
                      id: 52,
                      name: 'Other concert',
                      display_name: 'Other Concerts Event'
                    }
                  ]
                },
                {
                  id: 53,
                  name: 'Brocante / Market',
                  display_name: 'Brocante / Market Event'
                },
                {
                  id: 54,
                  name: 'Sport',
                  display_name: 'Sport Event'
                },
                {
                  id: 55,
                  name: 'Festival / Cycle',
                  display_name: 'Festival / Cycle Event'
                },
                {
                  id: 56,
                  name: 'Party / Parade',
                  display_name: 'Party / Parade Event'
                },
                {
                  id: 57,
                  name: 'Salon',
                  display_name: 'Salon Event'
                },
                {
                  id: 58,
                  name: 'Other',
                  display_name: 'Other Event'
                }
              ]
            }
          ]
    });
}