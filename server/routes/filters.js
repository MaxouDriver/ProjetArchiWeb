exports.getFilters = function(req, res){
    res.json({success: true, data: 
        [
            {
              id: 0,
              display_name: 'Shops',
              name: 'Shops',
              children: [
                {
                  name: 'Restaurant',
                  display_name: 'Restaurant',
                  children: [
                      {
                        id: 5,
                        name: 'Chinese',
                        display_name: 'Chinese Restaurant'
                    },
                    {
                      id: 6,
                        name: 'Italian',
                        display_name: 'Italian Restaurant'
                    }
                ]
                },
                {
                  id: 3,
                  name: 'Food',
                  display_name: 'Food Shops'
                },
                {
                  id: 4,
                  name: 'Clothes',
                  display_name: 'Clothes Shops'
                }
              ]
            },
            {
              id: 1,
              name: 'Touristiques area',
              display_name: 'Touristiques area'
            },
            {
              id: 7,
              name: 'Museums',
              display_name: 'Museums'
            },
            {
              id: 2,
              name: 'Toilets',
              display_name: 'Toilets'
            }
          ]
    });
}