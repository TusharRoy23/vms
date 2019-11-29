export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'primary'
      }
    },
    {
      name: 'Settings',
      url: '/settings',
      icon: 'icon-settings',
      children: [
        {
          name: 'User List',
          url: '/settings/user-list',
          icon: 'icon-people'
        },
        {
          name: 'Item List',
          url: '/settings/item-list',
          icon: 'fa fa-cubes'
        },
        {
          name: 'Item Unit List',
          url: '/settings/item-unit-list',
          icon: 'fa fa-calculator'
        },
        {
          name: 'Vehicle Category',
          url: '/settings/vehicle-category',
          icon: 'fa fa-cube'
        }
      ]
    },
    {
      name: 'Vehicle',
      url: '/vehicle',
      icon:'fa fa-car',
      children: [
        {
          name: 'List',
          url: '/vehicle/list',
          icon: 'fa fa-cubes'
        },
        {
          name: 'Fuel',
          url: '/vehicle/fuel',
          icon: 'fa fa-battery-4'
        },
        {
          name: 'Type',
          url: '/vehicle/type',
          icon: 'fa fa-motorcycle'
        }
      ]
    },
    {
      name: 'Reports',
      url: '/report',
      icon:'fa fa-area-chart',
      children: [
        {
          name: 'Inventory',
          url: '/report/inventory',
          icon: 'fa fa-bar-chart'
        },
        {
          name: 'Fuel',
          url: '/report/fuel',
          icon: 'fa fa-battery-2'
        },
        {
          name: 'Vehicle',
          url: '/report/vehicle',
          icon: 'fa fa-dashboard'
        },
        {
          name: 'Stock Book',
          url: '/report/stock-book',
          icon: 'fa fa-line-chart'
        },
        {
          name: 'Vehicle History',
          url: '/report/vehicle-history',
          icon: 'fa fa-pie-chart'
        },
        {
          name: 'Vehicle Cat. Trans.',
          url: '/report/vehicle-category-transaction',
          icon: 'fa fa-map-signs'
        }
      ]
    },
    {
      name: 'Logout',
      url: '/logout',
      icon:'fa fa-sign-out',
    }
  ]
};
