exports.getFilters = function(req, res){
    res.json({success: true, data: 
        [
            {
              id: 0,
              name: 'Shops',
              children: [
                {
                  name: 'Restaurant',
                  children: [
                      {
                        id: 5,
                        name: 'Chinese'
                    },
                    {
                      id: 6,
                        name: 'Italian'
                    }
                ]
                },
                {
                  id: 3,
                  name: 'Food'
                },
                {
                  id: 4,
                  name: 'Clothes'
                }
              ]
            },
            {
              id: 1,
              name: 'Touristiques area'
            },
            {
              id: 2,
              name: 'Toilettes'
            }
          ]
    });
}