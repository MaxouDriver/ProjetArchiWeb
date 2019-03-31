exports.getFilters = function(req, res){
    res.json({success: true, data: 
        [
            {
              id: 0,
              display_name: 'Shops',
              name: 'Shops',
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
              display_name: 'Touristiques area'
            },
            {
              id: 2,
              name: 'Museums',
              display_name: 'Museums'
            },
            {
              id: 3,
              name: 'Toilets',
              display_name: 'Toilets'
            }
          ]
    });
}